'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const fp_1 = __importDefault(require("lodash/fp"));
const sls_1 = require("./sls/sls");
const big_integer_1 = __importDefault(require("big-integer"));
const axios_1 = __importDefault(require("axios"));
const qs = __importStar(require("querystring"));
// protobuf
//import protobuf from 'protobufjs';
//const builder = protobuf.loadSync(path.join(__dirname, './sls.proto'));
//const LogGroupListProto = builder.lookupType('sls.LogGroupList');
//@ts-ignore
global.XMLHttpRequest = require('xhr2');
//@ts-ignore
XMLHttpRequest.prototype._restrictedHeaders.date = false;
//@ts-ignore
XMLHttpRequest.prototype._restrictedHeaders['content-length'] = false;
/**
 * @description 阿里云日志服务客户端
 * @author jx
 * @date 2019-05-07
 * @export
 * @class SlsClient
 */
class SlsClient {
    constructor(config) {
        /**
         * @description 无主体请求
         * @param urlParams 用于构造url的参数
         * @param queries
         * @param selector 自定义project或logstore
         * @private
         * @memberof SlsClient
         */
        this.noBodyAction = (urlParams, queries, selector) => {
            const url = SlsClient.createVarByTemplate(urlParams.keys, urlParams.template, selector);
            return this.action(url + '?' + qs.stringify(queries), 'GET', queries);
        };
        /**
         * @description 拉取日志
         * @memberof SlsClient
         */
        this.pullLogs = (option, selector) => this.noBodyAction({
            keys: ['endpoint', 'logStore', 'projectName'],
            template: `http://{projectName}.{endpoint}/logstores/{logStore}/shards/${option.shards ||
                0}`
        }, { cursor: option.cursor, count: option.count || 10, type: 'log' }, selector).pipe(operators_1.pluck('data'), operators_1.map((buffer) => SlsClient.logListToObject(sls_1.sls.LogGroupList.decode(new Uint8Array(buffer, 0, buffer.byteLength)))));
        /**
         * @description 查询日志
         * @memberof SlsClient
         */
        this.getLogs = (option, selector) => this.noBodyAction({
            keys: ['endpoint', 'logStore', 'projectName'],
            template: `http://{projectName}.{endpoint}/logstores/{logStore}`
        }, { ...option, type: 'log' }, selector).pipe(operators_1.pluck('data'), operators_1.map((buffer) => {
            return buffer;
        }));
        /**
         * @description 分析日志
         * @memberof SlsClient
         */
        this.getHistograms = (option, selector) => this.noBodyAction({
            keys: ['endpoint', 'logStore', 'projectName'],
            template: `http://{projectName}.{endpoint}/logstores/{logStore}`
        }, { ...option, type: 'histogram' }, selector).pipe(operators_1.pluck('data'), operators_1.map((buffer) => {
            return buffer;
        }));
        /**
         * @description 指定游标获取日志
         * @memberof SlsClient
         */
        this.getLogsByCursor = (option, selector) => {
            const iStart = big_integer_1.default(Buffer.from(option.startCursor, 'base64').toString());
            const iEnd = big_integer_1.default(Buffer.from(option.endCursor, 'base64').toString());
            return this.pullLogs({
                count: iEnd.minus(iStart).valueOf(),
                cursor: option.startCursor,
                shards: option.shards
            }, selector);
        };
        /**
         * @description 提交一条log
         * @memberof SlsClient
         */
        this.postLogStoreLogs = (log, selector) => {
            const url = SlsClient.createVarByTemplate(['logStore', 'projectName', 'endpoint'], `http://{projectName}.{endpoint}/logstores/{logStore}/shards/lb`, selector);
            const body = Buffer.from(sls_1.sls.LogGroup.encode(SlsClient.convertLog(log)).finish());
            const header = {
                'x-log-bodyrawsize': body.byteLength,
                'content-type': 'application/x-protobuf'
            };
            return this.action(url, 'POST', {}, body, header);
        };
        SlsClient.config = config;
        config.endpoint =
            config.endpoint ||
                SlsClient.createVarByTemplate(['net', 'region'], '{region}-{net}' + SlsClient.baseString);
    }
    /**
     *  请求api
     * @param url 请求地址
     * @param method 方法
     * @param queries 查询对象
     * @param body 查询主体
     * @param setHeaders 补充header
     */
    action(url, method, queries, body, setHeaders) {
        const headers = {
            ...SlsClient.baseHeader,
            date: new Date().toUTCString(),
            ...(body
                ? {
                    'content-md5': crypto_1.default
                        .createHash('md5')
                        .update(body)
                        .digest('hex')
                        .toUpperCase(),
                    'content-length': body.length
                }
                : {}),
            ...(setHeaders || {})
        };
        headers['authorization'] = SlsClient.sign(method, SlsClient.getPathByUrl(url), queries, headers);
        return rxjs_1.from(axios_1.default.request({ url, method, headers }));
        // return ajax({
        //   url,
        //   method,
        //   body,
        //   headers,
        //   responseType: 'arraybuffer'
        // });
    }
    /**
     * @description 签名
     * @author jx
     * @date 2019-05-07
     * @private
     * @static
     * @param {Method} verb
     * @param {string} path
     * @param {Record<string, any>} queries
     * @param {Record<string, any>} headers
     * @returns
     * @memberof SlsClient
     */
    static sign(verb, path, queries, headers) {
        const contentMD5 = headers['content-md5'] || '';
        const contentType = headers['content-type'] || '';
        const date = headers['date'];
        const canonicalizedHeaders = SlsClient.getCanonicalizedHeaders(headers);
        const canonicalizedResource = SlsClient.getCanonicalizedResource(path, queries);
        const signString = `${verb}\n${contentMD5}\n${contentType}\n` +
            `${date}\n${canonicalizedHeaders}${canonicalizedResource}`;
        return `LOG ${SlsClient.config.accessKeyId}:${crypto_1.default
            .createHmac('sha1', SlsClient.config.accessKeySecret)
            .update(signString)
            .digest('base64')}`;
    }
}
SlsClient.createVarByTemplate = (symbols, template, option) => symbols.reduce((result, symbol) => result.replace(new RegExp(`{${symbol}}`, 'g'), { ...SlsClient.config, ...(option || {}) }[symbol] || symbol), template);
SlsClient.baseString = '.log.aliyuncs.com';
/**
 * @description 从url解析出path部分，主要用于签名
 * @private
 * @static
 * @memberof SlsClient
 */
SlsClient.getPathByUrl = (url) => (url.split('?').shift() || url).split(SlsClient.baseString).pop() || url;
/**
 * @description 默认header
 * @private
 * @static
 * @memberof SlsClient
 */
SlsClient.baseHeader = {
    accept: 'application/x-protobuf',
    'content-type': 'application/json',
    date: new Date().toUTCString(),
    'x-log-apiversion': '0.6.0',
    'x-log-signaturemethod': 'hmac-sha1'
};
SlsClient.bufferToLogList = (buffer) => sls_1.sls.LogGroupList.decode(buffer);
SlsClient.getCanonicalizedHeaders = (headers) => Object.keys(headers)
    .filter(k => k.startsWith('x-log-') || k.startsWith('x-acs'))
    .sort()
    .map(k => `${k}:${headers[k].toString().trim()}`)
    .join('\n') + '\n';
SlsClient.getCanonicalizedResource = (path, queries) => `${path}${SlsClient.queryString(queries) ? `?${SlsClient.queryString(queries)}` : ''}`;
SlsClient.queryString = (queries) => Object.entries(queries)
    .map(pair => `${pair[0]}=${typeof pair[1] === 'undefined' ? '' : pair[1].toString()}`)
    .sort()
    .join('&');
SlsClient.logListToObject = (logs) => {
    return logs.logGroupList.map(log => {
        return {
            ...log,
            Logs: (log.Logs || []).map(tmp => ({
                ...SlsClient.fromPairsToObject()(tmp.Contents || []),
                __time: tmp.Time
            })),
            LogTags: SlsClient.fromPairsToObject()(log.LogTags || [])
        };
    });
};
SlsClient.createKvList = (obj) => Object.entries(obj)
    .filter(([Key]) => !Key.startsWith('__'))
    .map(([Key, Value]) => ({
    Key,
    Value: typeof Value === 'object'
        ? JSON.stringify(Value)
        : (Value || '').toString()
}));
SlsClient.fromPairsToObject = (mapField = {
    key: 'Key',
    value: 'Value'
}) => fp_1.default.compose(fp_1.default.fromPairs, fp_1.default.reduce((pairs, part) => [
    ...pairs,
    [part[mapField.key], part[mapField.value]]
], []));
SlsClient.readKvList = SlsClient.fromPairsToObject({ key: 'Key', value: 'Value' });
SlsClient.convertLog = (logGroup) => {
    const Time = Math.floor(Date.now().valueOf() / 1000);
    return {
        ...logGroup,
        Logs: (logGroup.Logs || []).map(log => ({
            Time: log['__time'] || Time,
            Contents: SlsClient.createKvList(log)
        })),
        LogTags: SlsClient.createKvList(logGroup.LogTags)
    };
};
exports.default = SlsClient;
