import { Component } from '@angular/core'
import { HttpService } from '../services/httpService'
import PipeReport from '../models/pipereport'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { FilterComponent } from '../components/filter/filter.component'

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [AgGridAngular,FilterComponent],
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
    this.getData()
  }

  getData() {
    this.httpService.getDataBase().subscribe({
      next: (response) => {
        this.allPipeReport = response

        const _colDefs: Array<ColDef> = []
        const listFilter: Array<string> = []
    
        Object.keys(this.allPipeReport![0]).forEach(title => {

          this.allPipeReport!.forEach((PipeReport, i) => {
            listFilter.push(PipeReport[title])
          });
         
          _colDefs.push({ field: title, filter: FilterComponent, headerName: title})
        })

        this.colDefs = _colDefs
        this.rowData = this.allPipeReport

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