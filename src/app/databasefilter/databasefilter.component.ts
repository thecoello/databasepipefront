import { AfterViewInit, Component, Input, input, OnInit } from '@angular/core';
import { FilterComponent } from '../components/filter/filter.component';
import { HttpService } from '../services/httpService';
import PipeReport from '../models/pipereport';
import { NgFor, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Filters } from '../models/filters';

@Component({
  selector: 'app-databasefilter',
  standalone: true,
  imports: [FilterComponent, NgFor, NgIf, TitleCasePipe],
  templateUrl: './databasefilter.component.html',
  styleUrl: './databasefilter.component.css'
})
export class DatabasefilterComponent implements OnInit {

  allPipeReport?: Array<PipeReport> | Array<any> = []
  filters?: Array<Filters> = []
  loading?:boolean = true

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.httpService.getDataBase().subscribe({
      next: (response) => {
        this.allPipeReport = response
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  filter(event: any) {

    this.loading = false

    const filterAllPipeReport = this.allPipeReport
    const newFileRetpor:Array<any> = []

    if(!this.filters?.includes(event)){
      this.filters?.push(event)
    }

    this.filters!.forEach((filter:Filters) => {
        
      filterAllPipeReport!.forEach(data => {

        if(filter.filters?.includes(data[filter.title!])){
          newFileRetpor!.push(data)
        }
        
      });

    });

    console.log(newFileRetpor)

    if(newFileRetpor.length > 0){
      this.allPipeReport = []
      this.allPipeReport = newFileRetpor
      setTimeout(() => {
        this.loading = true
      }, 1000);

    }else{
      this.getData()
    }

  }

  getList(object: any, title: string) {
    return object[title]
  }


  getKeyName(object: Object, index: number) {
    return Object.keys(object)[index]
  }

}
