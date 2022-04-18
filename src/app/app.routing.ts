import { Routes } from '@angular/router'
import { AppComponent } from "./app.component";
import { ReportItemComponent } from './partials/item/item.component';
import { ReportListComponent } from './partials/list/list.component';

export const routes: Routes = [
    {
        path: 'reports',
        component: ReportListComponent
    },
    {
        path: 'report/:reportId',
        component: ReportItemComponent
    },
]