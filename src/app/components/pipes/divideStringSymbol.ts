import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  standalone: true,
  name: 'DivideStringSymbol',
})
export class DivideStringSymbol implements PipeTransform {
  transform(value: string,): string {
    return value.split(/[.\-_]/).join(' ')
  }
}