import { Component, Input, OnInit } from '@angular/core';
import { IReportInfo } from 'src/app/core/interfaces/server/IReport';
import { MainService } from 'src/app/core/services/main.service';


@Component({
  selector: 'dental-row-report',
  templateUrl: './row-report.component.html',
  styleUrls: ['./row-report.component.scss']
})
export class RowReportComponent implements OnInit {
  @Input() reportData!: IReportInfo[];
  // ---
  // (1 = children) - (2 = adult)
  @Input() type!: (1 | 2);
  // position
  @Input() position!: ('top' | 'bottom');
  // ---
  rightSideData!: IReportInfo[];
  // ---
  leftSideData!: IReportInfo[];
  // ---
  activeToothType: number = -1;
  // ---
  constructor(
    public mainService: MainService
  ) { }

  ngOnInit(): void {
    this.preparePositionData();
  }

  preparePositionData(): void {
    this.rightSideData = this.reportData.filter(x => x.positionType === 20001 || x.positionType === 20003);
    this.leftSideData = this.reportData.filter(x => x.positionType === 20002 || x.positionType === 20004);
  }

  showDetails(item: IReportInfo): void {
    this.activeToothType = item.toothType;
    item.isChecked = true;
    this.mainService.showToothDetails.emit(item);
  }

}
