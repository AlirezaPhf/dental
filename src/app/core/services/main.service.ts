import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppData } from '../interfaces/client/general';
import { IPositionSplitData, ISplitChildrenAndAdult } from '../interfaces/client/IGeneral';
import { IReport, IReportInfo } from '../interfaces/server/IReport';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private appData = new BehaviorSubject<ISplitChildrenAndAdult>(new AppData());
  appData$ = this.appData.asObservable();
  // ---
  showToothDetails = new EventEmitter<IReportInfo>();
  // ---
  isLoading = new EventEmitter<boolean>(true);
  // ---
  constructor() { }


  findPageNumber(queryParams: any): number {
    let pageIndex = 1;
    if (queryParams && queryParams.pageIndex) {
      pageIndex = queryParams.pageIndex;
    }
    return pageIndex;
  }

  /**
   * @description try to split child and adult and return
   * @author Alireza PhF
   */
  splitChildrenAndAdult(reportData: IReport): ISplitChildrenAndAdult {
    let splitData: ISplitChildrenAndAdult = new AppData();
    // ---
    reportData.reportInfos.forEach(
      item => {
        // top
        const isTop = item.positionType === 20001 || item.positionType === 20002;
        // ---
        splitData[item.forChildren ? 'children' : 'adult'][isTop ? 'top' : 'bottom'].push(item);
      }
    )
    // ---
    splitData.date = reportData.date;
    // ---
    splitData.drName = reportData.drName;
    // ---
    splitData.id = reportData.id;
    // ---
    splitData.name = reportData.name;
    // ---
    splitData.reportType = reportData.reportType;
    // ---
    splitData.userId = reportData.userId;
    // ---
    this.appData.next(splitData);
    return splitData;
  }

  setNewReportInfo(item: IReportInfo) {
    // this.appData.next(item);
  }

  getAppData(): ISplitChildrenAndAdult {
    return this.appData.value;
  }

}
