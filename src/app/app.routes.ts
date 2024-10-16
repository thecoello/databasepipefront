import { Routes } from '@angular/router';
import { TableDataComponent } from './table-data/table-data.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { TableDataNewComponent } from './table-data-new/table-datanew.component';

export const routes: Routes = [
    {path:'', component: TableDataNewComponent},
    {path:'filterdata', component: TableDataNewComponent},
    {path:'uploadfile', component: UploadfileComponent}
];
