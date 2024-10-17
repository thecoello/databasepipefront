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

  constructor(private httpService: HttpService,) { }

  ngOnInit(): void {
    this.gridOptions = {
      suppressColumnVirtualisation: true,
      suppressRowVirtualisation: true,
    }
    this.getData()
  }

  setExternalFilter(event: any) {
    console.log(event)
    salesRegion = event
    this.gridApi?.onFilterChanged();
  }

  doesExternalFilterPass(node: any): boolean {

    let filtersToApply: any

    if (node.data) {

      salesRegion.forEach((filters) => {
        const array = filters?.filters!
        const even = (element: any) => node.data[filters.title!] === element;
        filtersToApply = array.some(even)
      });

      return filtersToApply
    }
    return true;
  }

  isExternalFilterPresent(): boolean {
    return salesRegion && salesRegion.length > 0 ? true : false
  }

  setFilter(columnName: string) {
    const filter: Array<any> = []
    this.gridApi.forEachNode((row: any) => {
      if (!filter.includes(row.data[columnName])) {
        filter.push(row.data[columnName])
      }
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
          const filterCount: any[] = []
          _colDefs.push({ field: title, filter: title == 'id' ? null : FilterComponent, headerName: new DivideStringSymbol().transform(title) })
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