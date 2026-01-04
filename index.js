// ------------------ REQUIRES ------------------
const Discord = require("discord.js");
const { ActivityType, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config.json");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// ------------------ CONSTANTS ------------------
const TRACKING_API_KEY = config.apiKey;
const TRACKING_FILE = path.join(__dirname, "tracking.json");

// Ensure tracking.json exists and is valid
if (!fs.existsSync(TRACKING_FILE)) {
    fs.writeFileSync(TRACKING_FILE, "{}");
} else {
    try {
        const data = fs.readFileSync(TRACKING_FILE, "utf-8").trim();
        if (!data) fs.writeFileSync(TRACKING_FILE, "{}");
        else JSON.parse(data); // throws if corrupted
    } catch (err) {
        console.error("tracking.json corrupted, resetting:", err);
        fs.writeFileSync(TRACKING_FILE, "{}");
    }
}

// ------------------ DISCORD CLIENT ------------------
const bot = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel]
});

// ------------------ STORAGE FUNCTIONS ------------------

// Load all tracking numbers
function loadTracking() {
    try {
        const data = fs.readFileSync(TRACKING_FILE, "utf-8").trim();
        if (!data) return {};
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading tracking.json:", err);
        return {};
    }
}

// Save all tracking numbers
function saveTracking(data) {
    try {
        fs.writeFileSync(TRACKING_FILE, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing tracking.json:", err);
    }
}

// Add tracking number for user
function addTracking(userId, trackingNumber, carrier) {
    const allTracking = loadTracking();
    if (!allTracking[userId]) allTracking[userId] = [];

    // Prevent duplicates
    const exists = allTracking[userId].some(t => t.trackingNumber === trackingNumber);
    if (!exists) {
        allTracking[userId].push({ trackingNumber, carrier });
        saveTracking(allTracking);
        return true;
    }
    return false;
}

// Get all tracking numbers for a user
function getUserTracking(userId) {
    const allTracking = loadTracking();
    return allTracking[userId] || [];
}

// ------------------ TRACKINGMORE FUNCTIONS ------------------

// Register tracking (POST)
async function createTracking(trackingNumber, carrier) {
    try {
        await axios.post(
            "https://api.trackingmore.com/v2/trackings/post",
            { tracking_number: trackingNumber, carrier_code: carrier },
            { headers: { "Content-Type": "application/json", "Trackingmore-Api-Key": TRACKING_API_KEY } }
        );
    } catch (err) {
        if (err.response?.data?.meta?.code !== 400) {
            console.error("Create error:", err.response?.data || err.message);
        }
    }
}

// Resolve location safely
function resolveLocation(item) {
    const last = item.lastEvent;
    const track = item.origin_info?.trackinfo?.[0];
    return (
        last?.location ||
        last?.city ||
        track?.Location ||
        track?.city ||
        track?.Details ||
        track?.StatusDescription ||
        "Unknown"
    );
}

// Get tracking info (GET)
async function getTracking(trackingNumber, carrier) {
    try {
        const res = await axios.get(
            "https://api.trackingmore.com/v2/trackings/get",
            {
                params: { tracking_number: trackingNumber, carrier_code: carrier },
                headers: { "Content-Type": "application/json", "Trackingmore-Api-Key": TRACKING_API_KEY }
            }
        );

        const item = res.data?.data?.items?.[0];
        if (!item) return `❌ No tracking data found for ${trackingNumber}`;

        const status =
            item.status ||
            item.substatus ||
            item.lastEvent?.status ||
            item.origin_info?.trackinfo?.[0]?.StatusDescription ||
            "Unknown";

        const location = resolveLocation(item);

        const time =
            item.last_update_time ||
            item.origin_info?.trackinfo?.[0]?.Date ||
            "Unknown";

        return `📦 **Tracking Update**
**Carrier:** ${carrier}
**Tracking #:** ${trackingNumber}
**Status:** ${status}
**Location:** ${location}
**Updated:** ${time}`;
    } catch (err) {
        console.error(err.response?.data || err.message);
        return `⚠️ Failed to fetch tracking info for ${trackingNumber}`;
    }
}

// ------------------ DISCORD EVENTS ------------------
bot.once("ready", () => {
    console.log("Bot online");
    bot.user.setActivity("Package Locations", { type: ActivityType.Watching });
});

bot.on("messageCreate", async message => {
    if (message.author.bot) return;

    const prefix = config.prefix;
    const args = message.content.trim().split(/\s+/);
    const cmd = args.shift();

  // ---------- DM REGISTER ----------
if (cmd === `${prefix}register`) {
    const user = message.author;
    const dm = await user.createDM();
    await dm.send("📦 Let's register a new tracking number. What is your **tracking number**?");

    const state = { step: 1, tracking: null };
    const collector = dm.createMessageCollector({ filter: m => m.author.id === user.id, time: 120_000 });

    collector.on("collect", async m => {
        try {
            if (state.step === 1) {
                state.tracking = m.content.trim();
                state.step = 2;

                let carrierPrompt = state.tracking.startsWith("1Z")
                    ? "That looks like **UPS** 📦 — confirm carrier or type another:"
                    : "What is the **carrier**? (UPS, FedEx, USPS, DHL)";

                await dm.send(carrierPrompt);
                return;
            }

            if (state.step === 2) {
                const carrierInput = m.content.trim().toLowerCase();
                await createTracking(state.tracking, carrierInput);
                addTracking(user.id, state.tracking, carrierInput);
                const result = await getTracking(state.tracking, carrierInput);

                await dm.send("✅ Tracking number registered successfully!");
                await dm.send(result);

                collector.stop();
            }
        } catch (err) {
            console.error("DM register error:", err);
            await dm.send("❌ Something went wrong. Please try again.");
            collector.stop();
        }
    });

    collector.on("end", (_, reason) => {
        if (reason === "time") dm.send("⏰ Timed out. Please run `!register` again.");
    });

    if (message.channel.type !== Discord.ChannelType.DM) {
        await message.reply("📬 I've sent you a DM to register your tracking number!");
    }
}

// ---------- DM CHECK ----------
if (cmd === `${prefix}check`) {
    const user = message.author;
    const dm = await user.createDM();

    const userTrackings = getUserTracking(user.id);
    if (userTrackings.length === 0) {
        return dm.send("You have no tracking numbers registered. Use `!register` first.");
    }

    await dm.send(`📦 You have ${userTrackings.length} tracking number(s):`);

    for (const t of userTrackings) {
        const result = await getTracking(t.trackingNumber, t.carrier);
        await dm.send(result);
    }

    if (message.channel.type !== Discord.ChannelType.DM) {
        await message.reply("📬 I've sent your tracking info via DM!");
    }
}
});

// ------------------ LOGIN ------------------
bot.login(config.token);
