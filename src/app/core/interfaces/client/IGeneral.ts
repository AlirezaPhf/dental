import { IReportInfo } from "../server/IReport";

export interface ISplitChildrenAndAdult {
    children: IPositionSplitData;
    adult: IPositionSplitData;
    name: string;
    drName: string;
    date: string;
    reportType: number;
    userId: number;
    id: number;
}

export interface IPositionSplitData {
    top: IReportInfo[];
    bottom: IReportInfo[];
}

export interface IGetAllPayload {
    pageIndex: number;
    pageSize: number;
    reporterType: number;
    name: string;
    drName: string;
    reporterId: number;
    fromReportDate: string;
    toReportDate: string;
    fromAddDate: string;
    toAddDate: string;
}

export interface IPostReportPayload {
    id: number;
    userId: number;
    reportType: number;
    name: string;
    drName: string;
    date: string;
    reportInfos: IReportInfo[];
}