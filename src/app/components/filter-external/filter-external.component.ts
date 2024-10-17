import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { DivideStringSymbol } from '../pipes/divideStringSymbol';
import { Filters } from '../../models/filters';

@Component({
  selector: 'app-filter-external',
  standalone: true,
  imports: [NgFor, NgIf, ScrollingModule, DivideStringSymbol],
  templateUrl: './filter-external.component.html',
  styleUrl: './filter-external.component.css'
})
export class FilterExternalComponent {
  @Input() row?: string
  @Input() gridApi?: GridApi
  @Input() data?:Array<string>
  @Input() nameFilter?: string
  @Output() externalFilter = new EventEmitter<Array<Filters>>();

  show:boolean = false
  filtersArr: Array<string> = []
  height: number = 0
  filters:Filters = new Filters()
  filtersMultiArr?: Array<Filters> = []

  filtersLeft?: Array<string> = []

  externalFilterChanged(newValue: string) {

    if (!this.filtersArr.includes(newValue)) {
      this.filtersArr.push(newValue)
    } else {
      this.filtersArr.splice(this.filtersArr.indexOf(newValue), 1)
    }

    this.filters.title = this.nameFilter
    this.filters.filters = this.filtersArr

    if (!this.filtersMultiArr!.includes(this.filters)) {
      this.filtersMultiArr!.push(this.filters)
    }

    if(this.filtersArr.length == 0){
      this.filtersMultiArr = []
    }

    this.externalFilter.emit(this.filtersMultiArr!)
  }
  

  showFilter(){
    if(!this.show){
      this.show = true
    }else{
      this.show = false
    }
  }
}
