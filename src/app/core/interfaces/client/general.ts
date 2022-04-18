import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { IReportInfo } from "../server/IReport";
import { IPositionSplitData, ISplitChildrenAndAdult } from "./IGeneral";

export class AppData implements ISplitChildrenAndAdult {
    children: IPositionSplitData;
    adult: IPositionSplitData;
    name: string;
    drName: string;
    date: string;
    reportType: number;
    userId: number;
    id: number;

    constructor(_children?: IPositionSplitData, _adult?: IPositionSplitData, _name?: string, _drName?: string, _date?: string, _reportType?: number, _userId?: number,
        _id?: number) {
        this.children = _children ? _children : new SplitPosition();
        this.adult = _adult ? _adult : new SplitPosition();
        this.name = _name ? _name : '';
        this.drName = _drName ? _drName : '';
        this.date = _date ? _date : '';
        this.reportType = _reportType ? _reportType : 0;
        this.userId = _userId ? _userId : 0;
        this.id = _id ? _id : 0;
    }

}


export class SplitPosition implements IPositionSplitData {
    top: IReportInfo[];
    bottom: IReportInfo[];

    constructor(_top?: IReportInfo[], _bottom?: IReportInfo[]) {
        this.top = _top ? _top : new Array();
        this.bottom = _bottom ? _bottom : new Array();
    }
}