import { KeyValue, KeyValuePipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DivideStringSymbol } from '../components/pipes/divideStringSymbol';

@Component({
  selector: 'app-popupcell',
  standalone: true,
  imports: [NgIf, NgForOf, NgFor, KeyValuePipe, DivideStringSymbol ],
  templateUrl: './popupcell.component.html',
  styleUrl: './popupcell.component.css'
})
export class PopupcellComponent  {

  @Input() data?: any


  closePopUp(){
    this.data = null
  }

  valueAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>){
    return a.value.toString().localeCompare(a.value);
  };



}
