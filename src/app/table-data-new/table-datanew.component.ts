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
  filterArr?:Array<any>
  constructor(private httpService: HttpService, ) {}

  ngOnInit(): void {
    this.gridOptions = {
      suppressColumnVirtualisation: true,
      suppressRowVirtualisation: true,
    }
    this.getData() 
  }


  setExternalFilter(event: any){
    this.filterArr = event
  }


  doesExternalFilterPass(node: any): boolean {
    if (node.data) {
      const array = ['50475760', '50472475'];
      const even = (element: any) => node.data["﻿customer_id"] === element;
      return array.some(even)
    }
    return true;

  }

  isExternalFilterPresent(): boolean {
    return true
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

  setFilter(columnName: string){
    const filter:Array<any> = []
    this.rowData!.forEach((row)=>{
      if(!filter.includes(row[columnName])){
        filter.push(row[columnName])
      }
    })
    return filter
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