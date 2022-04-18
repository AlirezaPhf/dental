import { Component, Input, OnInit } from '@angular/core';
import { IPositionSplitData } from 'src/app/core/interfaces/client/IGeneral';

@Component({
  selector: 'dental-row-box-preview',
  templateUrl: './row-box-preview.component.html',
  styleUrls: ['./row-box-preview.component.scss']
})
export class RowBoxPreviewComponent implements OnInit {
  @Input() adultData!: IPositionSplitData;
  // ---
  @Input() childrenData!: IPositionSplitData;
  // ---
  @Input() type: ('caries' | 'retained' | 'lesion' | 'boneLoss') = 'caries';
  // ---
  constructor() {
  }

  ngOnInit(): void {


  }

}
