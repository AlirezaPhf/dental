import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGetAllPayload, IPostReportPayload, ISplitChildrenAndAdult } from '../interfaces/client/IGeneral';
import { IAllReports, IFilterDropDown, IReport } from '../interfaces/server/IReport';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apiUrl;
  // ---
  constructor(
    private http: HttpClient
  ) { }


  /**
   * @description get all reports from api
   * @author Alireza PhF
   */
  getAllReports(data: IGetAllPayload): Observable<IAllReports> {
    return this.http.post<IAllReports>(`${this.baseUrl}report/getAll`, data);
  }

  /**
   * 
   * @description get report by id
   * @author Alireza PhF
   */
  getReportData(id: number = 0): Observable<IReport> {
    return this.http.get<IReport>(`${this.baseUrl}report/${id}`);
  }

  /**
   * 
   * @description get filter drop downs from Api
   * @author Alireza PhF
   */
  getFilterDropDown(): Observable<IFilterDropDown> {
    return this.http.get<IFilterDropDown>(`${this.baseUrl}report/getAllFilterDropDown`);
  }

  /**
   * 
   * @description save an report into database
   * @author Alireza PhF
   */
  saveReport(data: ISplitChildrenAndAdult) {
    const adult = [...data.adult.top, ...data.adult.bottom];
    const children = [...data.children.top, ...data.children.bottom];
    // ---
    const reportInfos = [...adult, ...children];
    // ---
    const _data: IPostReportPayload = {
      date: data.date,
      drName: data.drName,
      id: data.id,
      name: data.name,
      reportInfos,
      reportType: data.reportType,
      userId: data.userId
    }
    // ---
    return this.http.post<IReport>(`${this.baseUrl}report`, _data);
  }





}
