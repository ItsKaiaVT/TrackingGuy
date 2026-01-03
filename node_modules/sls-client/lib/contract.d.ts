export declare type BaseLog = Record<string, any> & {
    __time: number;
};
export interface LogGroup<L extends BaseLog = BaseLog, T = Record<string, string>> {
    Logs: L[];
    LogTags: T;
    Reserved?: string;
    Topic?: string;
    Source?: string;
}
