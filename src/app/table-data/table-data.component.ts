import { Component } from '@angular/core'
import { HttpService } from '../services/httpService'
import PipeReport from '../models/pipereport'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { FilterComponent } from '../components/filter/filter.component'
import { NgIf } from '@angular/common'
import { DivideStringSymbol } from '../components/pipes/divideStringSymbol'
import { UploadfileComponent } from '../uploadfile/uploadfile.component'

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [AgGridAngular,FilterComponent, NgIf, DivideStringSymbol, UploadfileComponent],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.css',
})
export class TableDataComponent {
  private gridApi!: GridApi
  private gridOptions!: GridOptions

  allPipeReport?: Array<PipeReport> | Array<any>
  colDefs: ColDef<PipeReport>[] = []
  rowData?: Array<PipeReport>

  loading?: boolean = true

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.gridOptions = {
      suppressColumnVirtualisation: true,
      suppressRowVirtualisation: true,
    }
    this.getData()
  }

  getData() {
    this.httpService.getDataBase().subscribe({
      next: (response) => {
        this.allPipeReport = response

        const _colDefs: Array<ColDef> = []

        this.colDefs = _colDefs
        this.rowData = this.allPipeReport
    
        Object.keys(this.allPipeReport![0]).forEach((title) => {

          const filterCount: any[] = []

          _colDefs.push({ field: title, filter: title == 'id' ? null : FilterComponent, headerName: new DivideStringSymbol().transform(title)})

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