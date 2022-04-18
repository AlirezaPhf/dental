import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPositionSplitData } from 'src/app/core/interfaces/client/IGeneral';
import { IReport, IReportInfo } from 'src/app/core/interfaces/server/IReport';
import { ApiService } from 'src/app/core/services/api.service';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'dental-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  reportData!: IReport;
  // ---
  childrenSplitData: IPositionSplitData = { top: [], bottom: [] };
  // ---
  adultSplitData: IPositionSplitData = { top: [], bottom: [] };
  // ---
  isLoading = true;
  // ---
  reportId: number = 0;
  // ---
  constructor(
    private apiService: ApiService,
    private mainService: MainService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.activatedRoute && this.activatedRoute.params && this.activatedRoute.snapshot.params['reportId']) {
      this.reportId = this.activatedRoute.snapshot.params['reportId'];
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.getReportData(this.reportId).subscribe(
      _reportData => {
        this.reportData = _reportData;
        this.splitPosition();
        this.isLoading = false;
      }
    )
  }

  splitPosition(): void {
    const splitData = this.mainService.splitChildrenAndAdult(this.reportData);
    // children
    // top
    // this.childrenSplitData.top = splitData.children.filter(x => x.positionType === 20001 || x.positionType === 20002);
    // bottom
    // this.childrenSplitData.bottom = splitData.children.filter(x => x.positionType === 20003 || x.positionType === 20004);
    // adult
    // top
    // this.adultSplitData.top = splitData.adult.filter(x => x.positionType === 20001 || x.positionType === 20002);
    // bottom
    // this.adultSplitData.bottom = splitData.adult.filter(x => x.positionType === 20003 || x.positionType === 20004);
  }
}
