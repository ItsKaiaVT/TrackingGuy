import * as redis from 'redis'
import { observable, Observable, Observer } from "rxjs";
type RedisFun<T = any> = (...args: any) => Observable<T>
type RedisP1<T1 = any, R = any> = (p1: T1) => Observable<R>
type RedisFunP1<T1 = any, R = any> = (handler: redis.RedisClient[keyof redis.RedisClient]) => RedisP1<T1, R>
type RedisP2<T1 = any, T2 = any, R = any> = (p1: T1, p2: T2) => Observable<R>
type RedisFunP2<T1 = any, T2 = any, R = any> = (handler: redis.RedisClient[keyof redis.RedisClient]) => RedisP2<T1, T2, R>
type RedisP3<T1 = any, T2 = any, T3 = any, R = any> = (p1: T1, p2: T2, p3: T3) => Observable<R>
type RedisFunP3<T1 = any, T2 = any, T3 = any, R = any> = (handler: redis.RedisClient[keyof redis.RedisClient]) => RedisP3<T1, T2, T3, R>
type RedisP4<T1 = any, T2 = any, T3 = any, T4 = any, R = any> = (p1: T1, p2: T2, p3: T3, p4: T4) => Observable<R>
type RedisFunP4<T1 = any, T2 = any, T3 = any, T4 = any, R = any> = (handler: redis.RedisClient[keyof redis.RedisClient]) => RedisP4<T1, T2, T3, T4, R>
export enum TTLMode {
    SECOND = 'EX',
    MILLISECOND = 'PX'
}
export enum InsertMode {
    INSERT_WHEN_NOT_EXIST = 'NX',
    INSERT_WHEN_EXIST = 'XX'
}
export class RxRedis {
    private client = redis.createClient(this.options)
    constructor(private options: redis.ClientOpts) {
    }
    private curry: <T = any>(handler: redis.RedisClient[keyof redis.RedisClient]) => RedisFun<T> = (handler) => {
        //@ts-ignore
        return ((...args: any[]) => {
            return new Observable<any>((obser: Observer<any>) => {
                const cb: redis.Callback<any> = (error, reply) => {
                    if (error) {
                        obser.error(error);
                    } else {
                        obser.next(reply);
                    }
                    obser.complete();
                };
                (handler as any)(...args, cb)
            })
        })
    }
    public get = (this.curry as RedisFunP1<string, string>)(this.client.get.bind(this.client))
    public getset = (this.curry as RedisFunP2<string, string, string>)(this.client.getset.bind(this.client))
    public strlen = (this.curry as RedisFunP1<string, number>)(this.client.strlen.bind(this.client))
    public append = (this.curry as RedisFunP1<string, number>)(this.client.append.bind(this.client))
    public setrange = (this.curry as RedisFunP3<string, number, string, number>)(this.client.setrange.bind(this.client))
    public getrange = (this.curry as RedisFunP3<string, number, number, string>)(this.client.getrange.bind(this.client))
    public incr = (this.curry as RedisFunP1<string, number>)(this.client.incr.bind(this.client))
    public incrby = (this.curry as RedisFunP2<string, number, number>)(this.client.incrby.bind(this.client))
    public incrbyfloat = (this.curry as RedisFunP2<string, number, number>)(this.client.incrbyfloat.bind(this.client))
    public decr = (this.curry as RedisFunP1<string, number>)(this.client.decr.bind(this.client))
    public decrby = (this.curry as RedisFunP2<string, number, number>)(this.client.decrby.bind(this.client))
    public lpushx = (this.curry as RedisFunP2<string, string, number>)(this.client.lpushx.bind(this.client))
    public rpushx = (this.curry as RedisFunP2<string, string, number>)(this.client.rpushx.bind(this.client))
    public rpoplpush = (this.curry as RedisFunP2<string, string, string>)(this.client.rpoplpush.bind(this.client))
    public rpop = (this.curry as RedisFunP1<string, string>)(this.client.rpop.bind(this.client))
    public lpop = (this.curry as RedisFunP1<string, string>)(this.client.lpop.bind(this.client))
    public lrem = (this.curry as RedisFunP3<string, number, string, number>)(this.client.lrem.bind(this.client))
    public llen = (this.curry as RedisFunP1<string, number>)(this.client.llen.bind(this.client))
    public lindex = (this.curry as RedisFunP2<string, string, number>)(this.client.lindex.bind(this.client))
    public linsert = (this.curry as RedisFunP4<string, 'BEFORE' | 'AFTER', string, string, number>)(this.client.linsert.bind(this.client))
    public lset = (this.curry as RedisFunP3<string, number, string, 'ok'>)(this.client.lset.bind(this.client))
    public lrange = (this.curry as RedisFunP3<string, number, number, string[]>)(this.client.lrange.bind(this.client))
    public ltrim = (this.curry as RedisFunP3<string, number, number, 'ok'>)(this.client.ltrim.bind(this.client))
    public brpoplpush = (this.curry as RedisFunP3<string, string, number, string>)(this.client.brpoplpush.bind(this.client))
    private innser_set = this.curry(this.client.set.bind(this.client));

    public publish = (this.curry as RedisFunP2<string, string, number>)(this.client.publish.bind(this.client))

    set = (key: string, value: any, ttl?: number, ttlMode?: TTLMode, insertMode?: InsertMode) => {
        if (ttl != undefined) {
            if (ttl > 0 && ttl != null) {
                return this.innser_set(...(insertMode ? [key, value, ttlMode || 'EX', ttl, insertMode] : [key, value, ttlMode || 'EX', ttl]))
            } else {
                return this.innser_set(...(insertMode ? [key, value] : [key, value, insertMode]))
            }
        }
        return this.innser_set(key, value)
    }
    private _set = this.set
    public setnx = (key: string, value: any) => {
        return this._set(key, value, 0, undefined, InsertMode.INSERT_WHEN_NOT_EXIST)
    }
    public setex = (key: string, value: any, ttl: number) => {
        return this._set(key, value, ttl, TTLMode.SECOND)
    }
    public psetex = (key: string, value: any, ttl: number) => {
        return this._set(key, value, ttl, TTLMode.MILLISECOND)
    }
    public mset = (...pairs: [string, string][]) => {
        return this.curry(this.client.mset.bind(this.client))(...pairs.reduce((res, acc) => [...res, ...acc], [] as string[]))
    }
    public msetnx = (...pairs: [string, string][]) => {
        return this.curry(this.client.msetnx.bind(this.client))(...pairs.reduce((res, acc) => [...res, ...acc], [] as string[]))
    }
    public mget = (...keys: string[]) => {
        return this.curry(this.client.mget.bind(this.client))(...keys)
    }


    public lpush = (key: string, ...vals: any[]): Observable<number> => {
        return this.curry(this.client.lpush.bind(this.client))(key, ...vals)
    }
    public rpush = (key: string, ...vals: any[]): Observable<number> => {
        return this.curry(this.client.rpush.bind(this.client))(key, ...vals)
    }
    public blpop = (keys: string | string[], timeout: number = 0) => {
        return this.curry(this.client.blpop.bind(this.client))(...(typeof keys === 'string' ? [keys] : keys), timeout)
    }
    public brpop = (keys: string | string[], timeout: number = 0) => {
        return this.curry(this.client.brpop.bind(this.client))(...(typeof keys === 'string' ? [keys] : keys), timeout)
    }
    public message$ = new Observable<{ channel: string, message: string }>((obser: Observer<{ channel: string, message: string }>) => {
        this.client.on("message", (channel, message) => {
            obser.next({ channel, message });
        })
        this.client.on("unsubscribe", (_, count) => {
            if (count === 0) {
                obser.complete();
            }
        })
    })
    public subscribe=(...channels:string[])=>{
        this.client.subscribe(...channels);
        return this.message$.subscribe.bind(this.message$)
    }
    public unsubscribe=(...channels:string[])=>{
        this.client.unsubscribe(...channels);
    }
}