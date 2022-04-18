import { Component, Input, OnInit } from '@angular/core';
import { IReportInfo } from 'src/app/core/interfaces/server/IReport';

@Component({
  selector: 'dental-row-box-preview-each-side',
  templateUrl: './row-box-preview-each-side.component.html',
  styleUrls: ['./row-box-preview-each-side.component.scss']
})
export class RowBoxPreviewEachSideComponent implements OnInit {
  @Input() cariesData!: IReportInfo[];
  // ---
  // 1 => right
  // 2 => left
  @Input() position!: (1 | 2);
  // ---
  @Input() type: ('caries' | 'retained' | 'lesion' | 'boneLoss') = 'caries';
  // ---
  constructor() { }

  ngOnInit(): void {
  }

}
