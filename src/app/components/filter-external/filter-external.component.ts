import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { DivideStringSymbol } from '../pipes/divideStringSymbol';

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
  @Output() externalFilter = new EventEmitter<Array<string>>();

  show:boolean = false

  filters: Array<string> = []

  height: number = 0


  externalFilterChanged(newValue: string) {

    if (!this.filters.includes(newValue)) {
      this.filters.push(newValue)
    } else {
      this.filters.splice(this.filters.indexOf(newValue), 1)
    }

    this.externalFilter.emit(this.filters!)

    this.gridApi?.onFilterChanged();
  }
  

  showFilter(){
    if(!this.show){
      this.show = true
    }else{
      this.show = false
    }
  }
}
