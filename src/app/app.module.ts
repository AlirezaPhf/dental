import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserInputDgComponent } from './partials/user-input-dg/user-input-dg.component';
import { routes } from './app.routing';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { ReportListComponent } from './partials/list/list.component';
import { ReportItemComponent } from './partials/item/item.component';
import { PreviewComponent } from './partials/item/preview/preview.component';
import { ActionsComponent } from './partials/item/actions/actions.component';
import { RowReportComponent } from './partials/item/actions/showing-teeth/row-report/row-report.component';
import { ShowingTeethComponent } from './partials/item/actions/showing-teeth/showing-teeth.component';
import { ToothDetailsComponent } from './partials/item/actions/tooth-details/tooth-details.component';
import { RowBoxPreviewComponent } from './partials/item/preview/row-box-preview/row-caries-preview.component';
import { RowBoxPreviewEachSideComponent } from './partials/item/preview/row-box-preview/row-box-preview-each-side/row-box-preview-each-side.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './core/adapter/material.persian-date.adapter';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    PreviewComponent,
    ActionsComponent,
    UserInputDgComponent,
    RowReportComponent,
    ShowingTeethComponent,
    ToothDetailsComponent,
    RowBoxPreviewComponent,
    RowBoxPreviewEachSideComponent,
    ReportListComponent,
    ReportItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
