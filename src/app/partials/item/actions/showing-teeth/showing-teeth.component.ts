import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPositionSplitData, ISplitChildrenAndAdult } from 'src/app/core/interfaces/client/IGeneral';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'dental-showing-teeth',
  templateUrl: './showing-teeth.component.html',
  styleUrls: ['./showing-teeth.component.scss']
})
export class ShowingTeethComponent implements OnInit {
  appData$!: Observable<ISplitChildrenAndAdult>;
  // ---
  constructor(
    private mainService: MainService
  ) {
    this.appData$ = mainService.appData$;
  }

  ngOnInit(): void {
  }





}
