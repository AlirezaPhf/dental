import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISplitChildrenAndAdult } from 'src/app/core/interfaces/client/IGeneral';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'dental-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
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
