/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.sls = (function() {

    /**
     * Namespace sls.
     * @exports sls
     * @namespace
     */
    var sls = {};

    sls.Log = (function() {

        /**
         * Properties of a Log.
         * @memberof sls
         * @interface ILog
         * @property {number} Time Log Time
         * @property {Array.<sls.Log.IContent>|null} [Contents] Log Contents
         */

        /**
         * Constructs a new Log.
         * @memberof sls
         * @classdesc Represents a Log.
         * @implements ILog
         * @constructor
         * @param {sls.ILog=} [properties] Properties to set
         */
        function Log(properties) {
            this.Contents = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Log Time.
         * @member {number} Time
         * @memberof sls.Log
         * @instance
         */
        Log.prototype.Time = 0;

        /**
         * Log Contents.
         * @member {Array.<sls.Log.IContent>} Contents
         * @memberof sls.Log
         * @instance
         */
        Log.prototype.Contents = $util.emptyArray;

        /**
         * Creates a new Log instance using the specified properties.
         * @function create
         * @memberof sls.Log
         * @static
         * @param {sls.ILog=} [properties] Properties to set
         * @returns {sls.Log} Log instance
         */
        Log.create = function create(properties) {
            return new Log(properties);
        };

        /**
         * Encodes the specified Log message. Does not implicitly {@link sls.Log.verify|verify} messages.
         * @function encode
         * @memberof sls.Log
         * @static
         * @param {sls.ILog} message Log message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Log.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.Time);
            if (message.Contents != null && message.Contents.length)
                for (var i = 0; i < message.Contents.length; ++i)
                    $root.sls.Log.Content.encode(message.Contents[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Log message, length delimited. Does not implicitly {@link sls.Log.verify|verify} messages.
         * @function encodeDelimited
         * @memberof sls.Log
         * @static
         * @param {sls.ILog} message Log message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Log.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Log message from the specified reader or buffer.
         * @function decode
         * @memberof sls.Log
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sls.Log} Log
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Log.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sls.Log();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Time = reader.uint32();
                    break;
                case 2:
                    if (!(message.Contents && message.Contents.length))
                        message.Contents = [];
                    message.Contents.push($root.sls.Log.Content.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("Time"))
                throw $util.ProtocolError("missing required 'Time'", { instance: message });
            return message;
        };

        /**
         * Decodes a Log message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof sls.Log
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sls.Log} Log
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Log.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Log message.
         * @function verify
         * @memberof sls.Log
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Log.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.Time))
                return "Time: integer expected";
            if (message.Contents != null && message.hasOwnProperty("Contents")) {
                if (!Array.isArray(message.Contents))
                    return "Contents: array expected";
                for (var i = 0; i < message.Contents.length; ++i) {
                    var error = $root.sls.Log.Content.verify(message.Contents[i]);
                    if (error)
                        return "Contents." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Log message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof sls.Log
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {sls.Log} Log
         */
        Log.fromObject = function fromObject(object) {
            if (object instanceof $root.sls.Log)
                return object;
            var message = new $root.sls.Log();
            if (object.Time != null)
                message.Time = object.Time >>> 0;
            if (object.Contents) {
                if (!Array.isArray(object.Contents))
                    throw TypeError(".sls.Log.Contents: array expected");
                message.Contents = [];
                for (var i = 0; i < object.Contents.length; ++i) {
                    if (typeof object.Contents[i] !== "object")
                        throw TypeError(".sls.Log.Contents: object expected");
                    message.Contents[i] = $root.sls.Log.Content.fromObject(object.Contents[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Log message. Also converts values to other types if specified.
         * @function toObject
         * @memberof sls.Log
         * @static
         * @param {sls.Log} message Log
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Log.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.Contents = [];
            if (options.defaults)
                object.Time = 0;
            if (message.Time != null && message.hasOwnProperty("Time"))
                object.Time = message.Time;
            if (message.Contents && message.Contents.length) {
                object.Contents = [];
                for (var j = 0; j < message.Contents.length; ++j)
                    object.Contents[j] = $root.sls.Log.Content.toObject(message.Contents[j], options);
            }
            return object;
        };

        /**
         * Converts this Log to JSON.
         * @function toJSON
         * @memberof sls.Log
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Log.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        Log.Content = (function() {

            /**
             * Properties of a Content.
             * @memberof sls.Log
             * @interface IContent
             * @property {string} Key Content Key
             * @property {string} Value Content Value
             */

            /**
             * Constructs a new Content.
             * @memberof sls.Log
             * @classdesc Represents a Content.
             * @implements IContent
             * @constructor
             * @param {sls.Log.IContent=} [properties] Properties to set
             */
            function Content(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Content Key.
             * @member {string} Key
             * @memberof sls.Log.Content
             * @instance
             */
            Content.prototype.Key = "";

            /**
             * Content Value.
             * @member {string} Value
             * @memberof sls.Log.Content
             * @instance
             */
            Content.prototype.Value = "";

            /**
             * Creates a new Content instance using the specified properties.
             * @function create
             * @memberof sls.Log.Content
             * @static
             * @param {sls.Log.IContent=} [properties] Properties to set
             * @returns {sls.Log.Content} Content instance
             */
            Content.create = function create(properties) {
                return new Content(properties);
            };

            /**
             * Encodes the specified Content message. Does not implicitly {@link sls.Log.Content.verify|verify} messages.
             * @function encode
             * @memberof sls.Log.Content
             * @static
             * @param {sls.Log.IContent} message Content message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Content.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.Key);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Value);
                return writer;
            };

            /**
             * Encodes the specified Content message, length delimited. Does not implicitly {@link sls.Log.Content.verify|verify} messages.
             * @function encodeDelimited
             * @memberof sls.Log.Content
             * @static
             * @param {sls.Log.IContent} message Content message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Content.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Content message from the specified reader or buffer.
             * @function decode
             * @memberof sls.Log.Content
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {sls.Log.Content} Content
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Content.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sls.Log.Content();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.Key = reader.string();
                        break;
                    case 2:
                        message.Value = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("Key"))
                    throw $util.ProtocolError("missing required 'Key'", { instance: message });
                if (!message.hasOwnProperty("Value"))
                    throw $util.ProtocolError("missing required 'Value'", { instance: message });
                return message;
            };

            /**
             * Decodes a Content message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof sls.Log.Content
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {sls.Log.Content} Content
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Content.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Content message.
             * @function verify
             * @memberof sls.Log.Content
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Content.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.Key))
                    return "Key: string expected";
                if (!$util.isString(message.Value))
                    return "Value: string expected";
                return null;
            };

            /**
             * Creates a Content message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof sls.Log.Content
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {sls.Log.Content} Content
             */
            Content.fromObject = function fromObject(object) {
                if (object instanceof $root.sls.Log.Content)
                    return object;
                var message = new $root.sls.Log.Content();
                if (object.Key != null)
                    message.Key = String(object.Key);
                if (object.Value != null)
                    message.Value = String(object.Value);
                return message;
            };

            /**
             * Creates a plain object from a Content message. Also converts values to other types if specified.
             * @function toObject
             * @memberof sls.Log.Content
             * @static
             * @param {sls.Log.Content} message Content
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Content.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.Key = "";
                    object.Value = "";
                }
                if (message.Key != null && message.hasOwnProperty("Key"))
                    object.Key = message.Key;
                if (message.Value != null && message.hasOwnProperty("Value"))
                    object.Value = message.Value;
                return object;
            };

            /**
             * Converts this Content to JSON.
             * @function toJSON
             * @memberof sls.Log.Content
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Content.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Content;
        })();

        return Log;
    })();

    sls.LogTag = (function() {

        /**
         * Properties of a LogTag.
         * @memberof sls
         * @interface ILogTag
         * @property {string} Key LogTag Key
         * @property {string} Value LogTag Value
         */

        /**
         * Constructs a new LogTag.
         * @memberof sls
         * @classdesc Represents a LogTag.
         * @implements ILogTag
         * @constructor
         * @param {sls.ILogTag=} [properties] Properties to set
         */
        function LogTag(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogTag Key.
         * @member {string} Key
         * @memberof sls.LogTag
         * @instance
         */
        LogTag.prototype.Key = "";

        /**
         * LogTag Value.
         * @member {string} Value
         * @memberof sls.LogTag
         * @instance
         */
        LogTag.prototype.Value = "";

        /**
         * Creates a new LogTag instance using the specified properties.
         * @function create
         * @memberof sls.LogTag
         * @static
         * @param {sls.ILogTag=} [properties] Properties to set
         * @returns {sls.LogTag} LogTag instance
         */
        LogTag.create = function create(properties) {
            return new LogTag(properties);
        };

        /**
         * Encodes the specified LogTag message. Does not implicitly {@link sls.LogTag.verify|verify} messages.
         * @function encode
         * @memberof sls.LogTag
         * @static
         * @param {sls.ILogTag} message LogTag message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogTag.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.Key);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.Value);
            return writer;
        };

        /**
         * Encodes the specified LogTag message, length delimited. Does not implicitly {@link sls.LogTag.verify|verify} messages.
         * @function encodeDelimited
         * @memberof sls.LogTag
         * @static
         * @param {sls.ILogTag} message LogTag message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogTag.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogTag message from the specified reader or buffer.
         * @function decode
         * @memberof sls.LogTag
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sls.LogTag} LogTag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogTag.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sls.LogTag();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Key = reader.string();
                    break;
                case 2:
                    message.Value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("Key"))
                throw $util.ProtocolError("missing required 'Key'", { instance: message });
            if (!message.hasOwnProperty("Value"))
                throw $util.ProtocolError("missing required 'Value'", { instance: message });
            return message;
        };

        /**
         * Decodes a LogTag message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof sls.LogTag
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sls.LogTag} LogTag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogTag.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogTag message.
         * @function verify
         * @memberof sls.LogTag
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogTag.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.Key))
                return "Key: string expected";
            if (!$util.isString(message.Value))
                return "Value: string expected";
            return null;
        };

        /**
         * Creates a LogTag message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof sls.LogTag
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {sls.LogTag} LogTag
         */
        LogTag.fromObject = function fromObject(object) {
            if (object instanceof $root.sls.LogTag)
                return object;
            var message = new $root.sls.LogTag();
            if (object.Key != null)
                message.Key = String(object.Key);
            if (object.Value != null)
                message.Value = String(object.Value);
            return message;
        };

        /**
         * Creates a plain object from a LogTag message. Also converts values to other types if specified.
         * @function toObject
         * @memberof sls.LogTag
         * @static
         * @param {sls.LogTag} message LogTag
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogTag.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Key = "";
                object.Value = "";
            }
            if (message.Key != null && message.hasOwnProperty("Key"))
                object.Key = message.Key;
            if (message.Value != null && message.hasOwnProperty("Value"))
                object.Value = message.Value;
            return object;
        };

        /**
         * Converts this LogTag to JSON.
         * @function toJSON
         * @memberof sls.LogTag
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogTag.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LogTag;
    })();

    sls.LogGroup = (function() {

        /**
         * Properties of a LogGroup.
         * @memberof sls
         * @interface ILogGroup
         * @property {Array.<sls.ILog>|null} [Logs] LogGroup Logs
         * @property {string|null} [Reserved] LogGroup Reserved
         * @property {string|null} [Topic] LogGroup Topic
         * @property {string|null} [Source] LogGroup Source
         * @property {Array.<sls.ILogTag>|null} [LogTags] LogGroup LogTags
         */

        /**
         * Constructs a new LogGroup.
         * @memberof sls
         * @classdesc Represents a LogGroup.
         * @implements ILogGroup
         * @constructor
         * @param {sls.ILogGroup=} [properties] Properties to set
         */
        function LogGroup(properties) {
            this.Logs = [];
            this.LogTags = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogGroup Logs.
         * @member {Array.<sls.ILog>} Logs
         * @memberof sls.LogGroup
         * @instance
         */
        LogGroup.prototype.Logs = $util.emptyArray;

        /**
         * LogGroup Reserved.
         * @member {string} Reserved
         * @memberof sls.LogGroup
         * @instance
         */
        LogGroup.prototype.Reserved = "";

        /**
         * LogGroup Topic.
         * @member {string} Topic
         * @memberof sls.LogGroup
         * @instance
         */
        LogGroup.prototype.Topic = "";

        /**
         * LogGroup Source.
         * @member {string} Source
         * @memberof sls.LogGroup
         * @instance
         */
        LogGroup.prototype.Source = "";

        /**
         * LogGroup LogTags.
         * @member {Array.<sls.ILogTag>} LogTags
         * @memberof sls.LogGroup
         * @instance
         */
        LogGroup.prototype.LogTags = $util.emptyArray;

        /**
         * Creates a new LogGroup instance using the specified properties.
         * @function create
         * @memberof sls.LogGroup
         * @static
         * @param {sls.ILogGroup=} [properties] Properties to set
         * @returns {sls.LogGroup} LogGroup instance
         */
        LogGroup.create = function create(properties) {
            return new LogGroup(properties);
        };

        /**
         * Encodes the specified LogGroup message. Does not implicitly {@link sls.LogGroup.verify|verify} messages.
         * @function encode
         * @memberof sls.LogGroup
         * @static
         * @param {sls.ILogGroup} message LogGroup message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogGroup.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Logs != null && message.Logs.length)
                for (var i = 0; i < message.Logs.length; ++i)
                    $root.sls.Log.encode(message.Logs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.Reserved != null && message.hasOwnProperty("Reserved"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.Reserved);
            if (message.Topic != null && message.hasOwnProperty("Topic"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.Topic);
            if (message.Source != null && message.hasOwnProperty("Source"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.Source);
            if (message.LogTags != null && message.LogTags.length)
                for (var i = 0; i < message.LogTags.length; ++i)
                    $root.sls.LogTag.encode(message.LogTags[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified LogGroup message, length delimited. Does not implicitly {@link sls.LogGroup.verify|verify} messages.
         * @function encodeDelimited
         * @memberof sls.LogGroup
         * @static
         * @param {sls.ILogGroup} message LogGroup message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogGroup.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogGroup message from the specified reader or buffer.
         * @function decode
         * @memberof sls.LogGroup
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sls.LogGroup} LogGroup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogGroup.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sls.LogGroup();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.Logs && message.Logs.length))
                        message.Logs = [];
                    message.Logs.push($root.sls.Log.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.Reserved = reader.string();
                    break;
                case 3:
                    message.Topic = reader.string();
                    break;
                case 4:
                    message.Source = reader.string();
                    break;
                case 6:
                    if (!(message.LogTags && message.LogTags.length))
                        message.LogTags = [];
                    message.LogTags.push($root.sls.LogTag.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LogGroup message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof sls.LogGroup
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sls.LogGroup} LogGroup
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogGroup.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogGroup message.
         * @function verify
         * @memberof sls.LogGroup
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogGroup.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Logs != null && message.hasOwnProperty("Logs")) {
                if (!Array.isArray(message.Logs))
                    return "Logs: array expected";
                for (var i = 0; i < message.Logs.length; ++i) {
                    var error = $root.sls.Log.verify(message.Logs[i]);
                    if (error)
                        return "Logs." + error;
                }
            }
            if (message.Reserved != null && message.hasOwnProperty("Reserved"))
                if (!$util.isString(message.Reserved))
                    return "Reserved: string expected";
            if (message.Topic != null && message.hasOwnProperty("Topic"))
                if (!$util.isString(message.Topic))
                    return "Topic: string expected";
            if (message.Source != null && message.hasOwnProperty("Source"))
                if (!$util.isString(message.Source))
                    return "Source: string expected";
            if (message.LogTags != null && message.hasOwnProperty("LogTags")) {
                if (!Array.isArray(message.LogTags))
                    return "LogTags: array expected";
                for (var i = 0; i < message.LogTags.length; ++i) {
                    var error = $root.sls.LogTag.verify(message.LogTags[i]);
                    if (error)
                        return "LogTags." + error;
                }
            }
            return null;
        };

        /**
         * Creates a LogGroup message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof sls.LogGroup
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {sls.LogGroup} LogGroup
         */
        LogGroup.fromObject = function fromObject(object) {
            if (object instanceof $root.sls.LogGroup)
                return object;
            var message = new $root.sls.LogGroup();
            if (object.Logs) {
                if (!Array.isArray(object.Logs))
                    throw TypeError(".sls.LogGroup.Logs: array expected");
                message.Logs = [];
                for (var i = 0; i < object.Logs.length; ++i) {
                    if (typeof object.Logs[i] !== "object")
                        throw TypeError(".sls.LogGroup.Logs: object expected");
                    message.Logs[i] = $root.sls.Log.fromObject(object.Logs[i]);
                }
            }
            if (object.Reserved != null)
                message.Reserved = String(object.Reserved);
            if (object.Topic != null)
                message.Topic = String(object.Topic);
            if (object.Source != null)
                message.Source = String(object.Source);
            if (object.LogTags) {
                if (!Array.isArray(object.LogTags))
                    throw TypeError(".sls.LogGroup.LogTags: array expected");
                message.LogTags = [];
                for (var i = 0; i < object.LogTags.length; ++i) {
                    if (typeof object.LogTags[i] !== "object")
                        throw TypeError(".sls.LogGroup.LogTags: object expected");
                    message.LogTags[i] = $root.sls.LogTag.fromObject(object.LogTags[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a LogGroup message. Also converts values to other types if specified.
         * @function toObject
         * @memberof sls.LogGroup
         * @static
         * @param {sls.LogGroup} message LogGroup
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogGroup.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.Logs = [];
                object.LogTags = [];
            }
            if (options.defaults) {
                object.Reserved = "";
                object.Topic = "";
                object.Source = "";
            }
            if (message.Logs && message.Logs.length) {
                object.Logs = [];
                for (var j = 0; j < message.Logs.length; ++j)
                    object.Logs[j] = $root.sls.Log.toObject(message.Logs[j], options);
            }
            if (message.Reserved != null && message.hasOwnProperty("Reserved"))
                object.Reserved = message.Reserved;
            if (message.Topic != null && message.hasOwnProperty("Topic"))
                object.Topic = message.Topic;
            if (message.Source != null && message.hasOwnProperty("Source"))
                object.Source = message.Source;
            if (message.LogTags && message.LogTags.length) {
                object.LogTags = [];
                for (var j = 0; j < message.LogTags.length; ++j)
                    object.LogTags[j] = $root.sls.LogTag.toObject(message.LogTags[j], options);
            }
            return object;
        };

        /**
         * Converts this LogGroup to JSON.
         * @function toJSON
         * @memberof sls.LogGroup
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogGroup.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LogGroup;
    })();

    sls.LogGroupList = (function() {

        /**
         * Properties of a LogGroupList.
         * @memberof sls
         * @interface ILogGroupList
         * @property {Array.<sls.ILogGroup>|null} [logGroupList] LogGroupList logGroupList
         */

        /**
         * Constructs a new LogGroupList.
         * @memberof sls
         * @classdesc Represents a LogGroupList.
         * @implements ILogGroupList
         * @constructor
         * @param {sls.ILogGroupList=} [properties] Properties to set
         */
        function LogGroupList(properties) {
            this.logGroupList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogGroupList logGroupList.
         * @member {Array.<sls.ILogGroup>} logGroupList
         * @memberof sls.LogGroupList
         * @instance
         */
        LogGroupList.prototype.logGroupList = $util.emptyArray;

        /**
         * Creates a new LogGroupList instance using the specified properties.
         * @function create
         * @memberof sls.LogGroupList
         * @static
         * @param {sls.ILogGroupList=} [properties] Properties to set
         * @returns {sls.LogGroupList} LogGroupList instance
         */
        LogGroupList.create = function create(properties) {
            return new LogGroupList(properties);
        };

        /**
         * Encodes the specified LogGroupList message. Does not implicitly {@link sls.LogGroupList.verify|verify} messages.
         * @function encode
         * @memberof sls.LogGroupList
         * @static
         * @param {sls.ILogGroupList} message LogGroupList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogGroupList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.logGroupList != null && message.logGroupList.length)
                for (var i = 0; i < message.logGroupList.length; ++i)
                    $root.sls.LogGroup.encode(message.logGroupList[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified LogGroupList message, length delimited. Does not implicitly {@link sls.LogGroupList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof sls.LogGroupList
         * @static
         * @param {sls.ILogGroupList} message LogGroupList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogGroupList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LogGroupList message from the specified reader or buffer.
         * @function decode
         * @memberof sls.LogGroupList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {sls.LogGroupList} LogGroupList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogGroupList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.sls.LogGroupList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.logGroupList && message.logGroupList.length))
                        message.logGroupList = [];
                    message.logGroupList.push($root.sls.LogGroup.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LogGroupList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof sls.LogGroupList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {sls.LogGroupList} LogGroupList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogGroupList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogGroupList message.
         * @function verify
         * @memberof sls.LogGroupList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogGroupList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.logGroupList != null && message.hasOwnProperty("logGroupList")) {
                if (!Array.isArray(message.logGroupList))
                    return "logGroupList: array expected";
                for (var i = 0; i < message.logGroupList.length; ++i) {
                    var error = $root.sls.LogGroup.verify(message.logGroupList[i]);
                    if (error)
                        return "logGroupList." + error;
                }
            }
            return null;
        };

        /**
         * Creates a LogGroupList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof sls.LogGroupList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {sls.LogGroupList} LogGroupList
         */
        LogGroupList.fromObject = function fromObject(object) {
            if (object instanceof $root.sls.LogGroupList)
                return object;
            var message = new $root.sls.LogGroupList();
            if (object.logGroupList) {
                if (!Array.isArray(object.logGroupList))
                    throw TypeError(".sls.LogGroupList.logGroupList: array expected");
                message.logGroupList = [];
                for (var i = 0; i < object.logGroupList.length; ++i) {
                    if (typeof object.logGroupList[i] !== "object")
                        throw TypeError(".sls.LogGroupList.logGroupList: object expected");
                    message.logGroupList[i] = $root.sls.LogGroup.fromObject(object.logGroupList[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a LogGroupList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof sls.LogGroupList
         * @static
         * @param {sls.LogGroupList} message LogGroupList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogGroupList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.logGroupList = [];
            if (message.logGroupList && message.logGroupList.length) {
                object.logGroupList = [];
                for (var j = 0; j < message.logGroupList.length; ++j)
                    object.logGroupList[j] = $root.sls.LogGroup.toObject(message.logGroupList[j], options);
            }
            return object;
        };

        /**
         * Converts this LogGroupList to JSON.
         * @function toJSON
         * @memberof sls.LogGroupList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogGroupList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LogGroupList;
    })();

    return sls;
})();

module.exports = $root;
