import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GridApi, IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import { DivideStringSymbol } from '../pipes/divideStringSymbol';
import { Filters } from '../../models/filters';
import { IFilterAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-filter-external',
  standalone: true,
  imports: [NgFor, NgIf, ScrollingModule, DivideStringSymbol],
  templateUrl: './filter-external.component.html',
  styleUrl: './filter-external.component.css'
})
export class FilterExternalComponent implements OnChanges {

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['clearFilter']) {
      if (this.clearFilter?.includes(this.nameFilter!)) {
        this.filtersArr = []
        this.gridApi?.destroyFilter(this.nameFilter!)
        this.show = false
      }
    }

  }


  @Input() row?: string
  @Input() gridApi?: GridApi
  @Input() data?: Array<string>
  @Input() nameFilter?: string
  @Input() clearFilter?: Array<string>

  show: boolean = false
  filtersArr: Array<string> = []
  height: number = 0
  filtersMultiArr?: Array<Filters> = []
  filtersLeft?: Array<string> = []
  filter: string = 'All'
  setFilter?: string
  params!: IFilterParams;
  filters: Array<string> = []


  externalFilterChanged(newValue: string) {

    if (!this.filtersArr.includes(newValue)) {
      this.filtersArr.push(newValue)
    } else {
      this.filtersArr.splice(this.filtersArr.indexOf(newValue), 1)
    }
    this.gridApi!
      .setColumnFilterModel(this.nameFilter!, { values: this.filtersArr })
      .then(() => {
        this.gridApi!.onFilterChanged();
      })

    if (this.filtersArr.length == 0) {
      this.gridApi?.destroyFilter(this.nameFilter!)
    }
  }

  showFilter() {
    if (!this.show) {
      this.show = true
    } else {
      this.show = false
    }
  }
}
