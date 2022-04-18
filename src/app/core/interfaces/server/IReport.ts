export interface IReport {
    id: number;
    userId: number;
    reportType: number;
    name: string;
    drName: string;
    date: string;
    reportInfos: IReportInfo[];
    reportTypes: IName[];
    positionTypes: IName[];
    cariesTypes: IName[];
    cariesInfoTypes: IName[];
    retainedRootTypes: IName[];
    pulpLesionTypes: IName[];
    boneLossTypes: IName[];
    boneLossInfoTypes: IName[];
    calculusTypes: IName[];
    impactedTeethTypes: IName[];
}

export interface IReportInfo {
    toothType: number;
    toothNumber: number;
    positionType: number;
    forChildren: boolean;
    isChecked: boolean;
    caries: IReportInfoCaries[];
    retainedRoot: IIntro;
    pulpLesion: IIntro;
    missingTeeth: boolean;
    impactedTeeth: IIntro;
    calculus: IIntro[];
    boneLoss: IBoneLoss[];
};

export interface IReportInfoCaries {
    type: number;
    description: string;
    cariesInfos: IIntro[];
}

export interface IBoneLoss {
    type: number;
    boneLossInfo: IIntro[];
}

export interface IIntro {
    type: number;
    description?: string;
}

export interface IName {
    id: number;
    name: string;
}

export interface IFilterDropDown {
    reportTypes: IName[];
    reporter: IName[];
}

export interface IAllReports {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IReportItem[];
}

export interface IReportItem {
    id: number;
    reportTypeName: string;
    name: string;
    drName: string;
    reporterName: string;
    reportDate: string;
    addDate: string;
}