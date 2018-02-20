import { Pipe, PipeTransform } from '@angular/core';

import { morseJp } from './morse-jp';
import * as morse from 'morse';

@Pipe({
  name: 'morse'
})
export class MorsePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = '';

    if (value.match(' ')) {
      value.split(' ').forEach(word => {
        result += morseJp[word] || '';
      });
    } else {
      result = morseJp[value] || '';
    }

    return result;
  }

}
