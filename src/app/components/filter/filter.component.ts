import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import PipeReport from '../../models/pipereport';
import { Filters } from '../../models/filters';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgIf,NgFor, TitleCasePipe],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
 
  filter:boolean = false
  checked:boolean = false
  list:Array<string> = []
  filterArr?:Array<string> = []
  filters:Filters = new Filters()

  @Input() title?:string
  @Input() listOfFilter?:Array<PipeReport> | null
  @Output() filtersOutput = new EventEmitter<Filters>();


  ngOnInit(): void {
   this.setList()
  }

  private getList(object: any, title: string){
    return object[title]
  }

  setList(){
    this.listOfFilter!.forEach((filter) => {      
      if(!this.list.includes(this.getList(filter,this.title!))){
        this.list.push(this.getList(filter,this.title!))
      }      
    });
  }

  addFilter(title: string, filter: string){

 
      if(!this.filterArr?.includes(filter)){
        this.filterArr?.push(filter)      
      }else{
        this.filterArr.splice(this.filterArr.findIndex(e => e == filter),1)
      }

      this.filters.title = title
      this.filters.filters = this.filterArr
 
      this.filtersOutput.emit(this.filters)

  }

  showFilter(event: any){
    if(this.filter){
      this.filter = false
    }else{
      this.filter = true
    }
  }
}
