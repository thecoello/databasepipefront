import { Component } from '@angular/core'
import { HttpService } from '../services/httpService'
import PipeReport from '../models/pipereport'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridOptions, GridReadyEvent, IFilterParams, IRowNode } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { FilterComponent } from '../components/filter/filter.component'
import { NgFor, NgIf } from '@angular/common'
import { DivideStringSymbol } from '../components/pipes/divideStringSymbol'
import { UploadfileComponent } from '../uploadfile/uploadfile.component'
import { FilterExternalComponent } from '../components/filter-external/filter-external.component'
import { Filters } from '../models/filters'

var salesRegion: Array<Filters>

@Component({
  selector: 'app-table-datanew',
  standalone: true,
  imports: [AgGridAngular, FilterComponent, NgIf, NgFor, DivideStringSymbol, UploadfileComponent, FilterExternalComponent],
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

  constructor(private httpService: HttpService,) { }

  ngOnInit(): void {
    this.gridOptions = {
      suppressColumnVirtualisation: true,
      suppressRowVirtualisation: true,
    }
    this.getData()
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


        Object.keys(this.rowData![0]).forEach((title) => {

          if (title != 'id') {
            const filterCount: any[] = []
            _colDefs.push({ field: title, filter: FilterComponent, headerName: new DivideStringSymbol().transform(title) })
          }


        })

      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  onBtnExportCsv() {
    this.gridApi.exportDataAsCsv()
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }


  public getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    String(params.data.id);

}