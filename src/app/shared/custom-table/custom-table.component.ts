import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dental-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit, OnChanges {
  @Input() config!: {
    key: string;
    title: string;
    content?: string;
    type?: string;
    class?: string;
    colWidth?: string;
    clickable?: boolean;
    contentClass?: string;
    booleanType?: string;
  }[];
  @Input() data!: any[];
  @Input() count!: number;
  @Input() hasSeen = false;
  @Input() hasRemove = true;
  @Input() hasEdit = true;
  @Input() hasSelect = true;
  @Input() showCounter = true;
  @Input() dynamicAction!: { iconClass: string, actionName: string, tooltip: string, condition?: any }[];
  @Input() addUserRole = false;
  @Input() resetPaging = false;
  @Input() showTitle = true;
  @Input() itemsPerPage: any;
  // @Input() itemsPerPage;
  // request send from admi.
  // +0n panel
  @Input() hasPanelAdmin = false;
  @Output() pageChanged = new EventEmitter<any>();
  @Output() actionClicked = new EventEmitter<any>();
  displayedColumns: string[] = [];
  page = 1;
  displayOrder = false;
  default: string = '../../../../assets/images/adminAvatar.svg';

  // --------------------------------------------
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.detectPageNumber();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['resetPaging'] && changes['resetPaging'].currentValue === true) {
      this.page = 1;
    }
    this.prepareDisplayColumns();
  }

  ngOnInit(): void {
  }

  /**
   * @description move keys into display column array
   * @author Alireza PhF
   */
  prepareDisplayColumns(): void {
    this.displayedColumns = [];
    if (this.showCounter) {
      this.displayedColumns.push('position');
    }
    this.config.forEach(
      r => {
        this.displayedColumns.push(r.key);
      }
    );
    this.displayedColumns.push('actions');
    const hasColumn = this.displayedColumns.some((item) => {
      return item === 'marked';
    });
    if (hasColumn === true) {
      this.displayOrder = true;
    }
  }

  /**
   *
   * @description detect the type of value
   * @author Alireza PhF
   */
  isBoolean(value: any): boolean {
    return typeof value === 'boolean' ? true : false;
  }

  /**
   *
   * @description detect the type of value
   * @author Alireza PhF
   */
  viewOrder(value: any): any {
    if (value === 'در حال بررسی' || value === 'تائید شده' || value === 'رد شده') {
      return value;
    }
  }

  /**
   *
   * @description detect the type of value
   * @author Alireza PhF
   */
  isArray(value: any): boolean {
    return Array.isArray(value) ? true : false;
  }


  /**
   *
   * @param pageNumber new page number (emit)
   * @description when page changed(ngx)
   * @author Alireza PhF
   */
  changePage(pageNumber: number): void {
    window.scroll({ top: 0, behavior: "smooth" });
    this.page = pageNumber;
    this.pageChanged.emit(pageNumber);
    let url = this.router.url.includes('?') ? this.router.url.substring(0, this.router.url.indexOf('?')) : this.router.url;
    this.router.navigateByUrl(`${url}?pageIndex=${pageNumber}`);
  }

  /**
   * @description when clicked on action button
   * @author Alireza PhF
   */
  onClickAction(actionName: string, rowId: number, rowData: any): void {
    this.actionClicked.emit({ actionName, rowId, rowData });
  }

  detectTitle(model: any, columnData: any): string {
    let title = '';
    if (columnData.content && columnData.content.includes('_')) {
      // split by _ and cast to array
      const contentArray = columnData.content.split('_');
      for (let index = 1; index < contentArray.length; index++) {
        const key = contentArray[index];
        if (key.includes('?')) {
          title += eval('model.' + key);
        } else {
          title += model[key.replace(/ /g, '')];
        }
      }
    } else if (columnData.type === 'image') {
      title = model.pictureURL ? model.pictureURL : columnData.content ? columnData.content : '/avatar.png';
    }
    return title;

  }

  /**
   * @description seen data
   * @author Afsoon alizadeh
   */
  onClickDataId(elementId: any, title: any): void {
    this.actionClicked.emit({ id: elementId, action: title });
  }

  /**
   *
   * @description detect the type of value
   * @author afsoon alizadeh
   */
  isOrder(value: any): boolean {
    return typeof value === 'number' ? true : false;
  }

  /**
   *
   * @description loop for show star
   * @author afsoon alizadeh
   */
  repeat(value: any) {
    return Array(value);
  }


  /**
   * @description detect page number from query string
   * @author Alireza PhF
   */
  detectPageNumber(): void {
    if (this.activeRoute.snapshot.queryParams && this.activeRoute.snapshot.queryParams['pageIndex']) {
      this.page = this.activeRoute.snapshot.queryParams['pageIndex'];
      this.pageChanged.emit(this.page);
    }
  }
}
