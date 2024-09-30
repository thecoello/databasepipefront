import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component} from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IFilterParams, IDoesFilterPassParams, GridApi } from 'ag-grid-community';
import { FormsModule, NgModel } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { toNumber } from 'ag-grid-community/dist/types/core/utils/number';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgIf, NgFor, TitleCasePipe, FormsModule, ScrollingModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements IFilterAngularComp {
  
  params!: IFilterParams;
  filter:string = 'All'
  height:number = 0

  
  setFilter?:string
  filters:Array<string> = []
  nameToFilter?: string

  filtersArr:Array<string> = []

  agInit(params: IFilterParams): void {
    this.params = params    
    this.nameToFilter = this.params.column.getColId()
    this.setFilters()
  }

  setFilters(){
    this.params.api.forEachNode((rownode)=>{

      if(!this.filters.includes(rownode.data[this.nameToFilter!]) && rownode.data[this.nameToFilter!] != ''){
        this.filters.push(rownode.data[this.nameToFilter!])
      }
    })
    this.height = this.filters.length <= 10 ? parseInt(`${(this.filters.length * 2) + 6}`) : parseInt(`${this.filters.length }`)

  }

  changefilter(filterText: string){
    this.filter = filterText
    this.setFilter = filterText

    //this.params.api.hidePopupMenu()

    
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
