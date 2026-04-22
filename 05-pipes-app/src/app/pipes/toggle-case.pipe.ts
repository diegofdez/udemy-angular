import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase' // 'diego' | toggleCase => 'DIEGO'
})

export class ToggleCasePipe implements PipeTransform {
  transform(value: string, upper: boolean = true): string {
    console.log('Transforming value:', value, 'to upper case:', upper);

    // return value.split('').map(char => {
    //   return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
    // }).join('');

    if (upper) {
      return value.toUpperCase();
    } else {
      return value.toLowerCase();
    }
  }
}
