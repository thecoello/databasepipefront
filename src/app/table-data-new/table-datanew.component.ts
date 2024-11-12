import { Component, EventEmitter, Output } from '@angular/core'
import { HttpService } from '../services/httpService'
import PipeReport from '../models/pipereport'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridOptions, GridReadyEvent, IFilterParams, IRowNode } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { FilterComponent } from '../components/filter/filter.component'
import { NgFor, NgIf, UpperCasePipe } from '@angular/common'
import { DivideStringSymbol } from '../components/pipes/divideStringSymbol'
import { UploadfileComponent } from '../uploadfile/uploadfile.component'
import { FilterExternalComponent } from '../components/filter-external/filter-external.component'
import { Filters } from '../models/filters'
import { User } from '../models/user'
import { PopupcellComponent } from '../popupcell/popupcell.component'

var salesRegion: Array<Filters>

@Component({
  selector: 'app-table-datanew',
  standalone: true,
  imports: [AgGridAngular, FilterComponent, NgIf, NgFor, DivideStringSymbol, UploadfileComponent, FilterExternalComponent, UpperCasePipe, PopupcellComponent],
  templateUrl: './table-datanew.component.html',
  styleUrl: './table-datanew.component.css',
})
export class TableDataNewComponent {
  gridApi!: GridApi
  gridOptions!: GridOptions
  allPipeReport?: Array<any> | Array<any>
  colDefs: ColDef<any>[] = []
  rowData?: Array<any>
  loading?: boolean = true
  filters?: Array<Filters> = []
  filtersMultiArr?: Array<string>
  a: any
  clearFilterArr?:Array<string>
  countRow?:number
  user?:User = new User()
  id = localStorage.getItem('userid')
  token = localStorage.getItem('token')?.split(' ')[1]

  dataCell?:any 


  constructor(private httpService: HttpService,) { }

  ngOnInit(): void {

    this.getData()
    this.getUser()

    this.gridOptions = {
      suppressColumnVirtualisation: true,
      suppressRowVirtualisation: true,
    }
 
  }

  getUser() {
    if (this.token && this.id)
      this.httpService.getUser(parseInt(this.id)).subscribe({
        next: (response) => {
          this.user = response
        }
      })
  }

  setFilter(columnName: string) {
    const filter: Array<any> = []

    this.gridApi.forEachNode((row: any) => {
      if (!filter.includes(row.data[columnName])) {
        filter.push(row.data[columnName])
      }
    })

    const sortArr = filter.sort(function (a, b) {
      return a.localeCompare(b)
    })
    
    return filter
  }

  getData() {
    this.httpService.getDataBase().subscribe({
      next: (response) => {

        const _colDefs: Array<ColDef> = []
        this.rowData = response
        this.colDefs = _colDefs

        Object.keys(this.rowData![0]).forEach((title, i) => {
          if (title != 'id') {
            const filterCount: any[] = []
            _colDefs.push({ field: title, filter: FilterComponent, unSortIcon: true, headerName: new DivideStringSymbol().transform(title),
              hide: i >= 0 && i <= 18 ? false : true, 
              cellStyle: title == 'We_have_Win_story_(Global)?_(Source_CRP)' || 
              title == 'We_have_Go-live_story_(Global)?_(Source_CRP)' || 
              title == 'We_have_Customer_story?_(Source_CRP)' || 
              title == 'Customer_is_an_offcial_reference?_(Source_CRP)' ?
              {'background-color': '#e0e0e0'} : 
              title == 'Short_description_of_the_real_Business_' || 
              title == 'Customer_LinkedIn_Account' || 
              title == 'Customer_Facebook_Account' || 
              title == 'Customer_X_Account' || 
              title == 'Customer_Instagram_Account' ?
              {'background-color': '#bde3f7'} : {}
              
          })
          }
        })

      },
      error: ()=>{
        location.reload()
      }
    })
  }

  clearFilter(filterName:Array<string>){
    this.clearFilterArr = filterName
  }

  clearAll(){

    const allFilter:Array<string> = []

    this.colDefs!.forEach(col => {
      allFilter.push(col.field!)
    });
    this.clearFilterArr = allFilter!
  }

  onBtnExportCsv() {
    this.gridApi.exportDataAsCsv()
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }


  public getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    String(params.data.id);

  clickOnCell(event: any){
    this.dataCell = event
  }

}