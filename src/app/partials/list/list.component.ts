import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAllReports, IFilterDropDown, IReport } from 'src/app/core/interfaces/server/IReport';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'dental-report-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ReportListComponent implements OnInit {
  filterData!: IFilterDropDown;
  // ---
  form!: FormGroup;
  // ---
  reportData!: IAllReports;
  // ---
  requestTableConfig: any = [
    { key: 'reportTypeName', title: 'نوع گزارش' },
    { key: 'name', title: 'نام بیمار' },
    { key: 'drName', title: 'نام دکتر' },
    { key: 'reporterName', title: 'نام گزارش‌دهنده' },
    { key: 'reportDate', title: 'تاریخ گزارش' },
    { key: 'addDate', title: 'تاریخ تنظیم' },
  ];
  // ---
  pageIndex = 1;
  pageSize = 5;
  // ---
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getFilterDropDowns();
    this.createForm();
  }

  getFilterDropDowns(): void {
    this.apiService.getFilterDropDown().subscribe(
      _filterData => {
        this.filterData = _filterData;
      }
    )
  }

  createForm(): void {
    this.form = this.fb.group({
      pageIndex: [this.pageIndex],
      pageSize: [this.pageSize],
      reportType: [null, Validators.required],
      name: ['', Validators.required],
      drName: ['', Validators.required],
      reporterId: [null, Validators.required],
      fromReportDate: ['', Validators.required],
      toReportDate: ['', Validators.required],
      fromAddDate: ['', Validators.required],
      toAddDate: ['', Validators.required]
    })
  }

  getData(): void {
    this.apiService.getAllReports(this.form.value).subscribe(
      _reportData => {
        this.reportData = _reportData;
      }
    )
  }

  onPageChange(value: number): void {
    this.form.get('pageIndex')!.setValue(value);
    this.getData();
  }

  onClickAction(item: any): void {
    this.router.navigateByUrl(`report/${item.rowId}`)

  }



}
