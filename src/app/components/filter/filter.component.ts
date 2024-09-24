import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Optional, Output } from '@angular/core';
import PipeReport from '../../models/pipereport';
import { Filters } from '../../models/filters';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IFilterParams, AgPromise, IDoesFilterPassParams, IAfterGuiAttachedParams, RowNode } from 'ag-grid-community';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements IFilterAngularComp {
  
  params!: IFilterParams;
  filter:string = 'All'
  
  setFilter?:string
  filters:Array<string> = []
  nameToFilter?: string

  filtersArr:Array<string> = []


  agInit(params: IFilterParams): void {
    this.params = params    
    this.nameToFilter = this.params.column.getColId()

    this.params.api.forEachNode((rownode)=>{

      if(!this.filters.includes(rownode.data[this.nameToFilter!])){
        this.filters.push(rownode.data[this.nameToFilter!])
      }

    })
  }

  changefilter(filterText: string){
    this.filter = filterText
    this.setFilter = filterText

    
    if(!this.filtersArr.includes(this.filter)){
        this.filtersArr.push(this.filter)
    }else{
      this.filtersArr.splice(this.filtersArr.indexOf(this.filter), 1)
    }

    if(this.filtersArr.length == 0){
      this.filter = 'All'
    }
    
    this.params.filterChangedCallback()
  }

  isFilterActive(): boolean {
    return this.filter === this.setFilter;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return this.filtersArr.includes(params.data[this.nameToFilter!])
  }

  getModel() { }

  setModel(model: any) {}

}
