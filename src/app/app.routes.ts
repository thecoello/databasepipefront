import { Routes } from '@angular/router';
import { TableDataComponent } from './table-data/table-data.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';

export const routes: Routes = [
    {path:'', component: TableDataComponent},
    {path:'filterdata', component: TableDataComponent},
    {path:'uploadfile', component: UploadfileComponent}
];
