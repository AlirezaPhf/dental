import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTableComponent } from "./custom-table/custom-table.component";
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CustomTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    NgxPaginationModule,
    MatTooltipModule,
    MatButtonModule
  ],
  exports: [
    CustomTableComponent
  ]
})
export class SharedModule { }
