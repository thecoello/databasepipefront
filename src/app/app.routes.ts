import { Routes } from '@angular/router';
import { TableDataComponent } from './table-data/table-data.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { TableDataNewComponent } from './table-data-new/table-datanew.component';
import { UsersComponent } from './users/users.component';
import { CreateuserComponent } from './createuser/createuser.component';

export const routes: Routes = [
    {path:'', component: TableDataNewComponent},
    {path:'filterdata', component: TableDataNewComponent},
    {path:'uploadfile', component: UploadfileComponent},
    {path:'users', component: UsersComponent},
    {path:'createuser', component: CreateuserComponent},
];
