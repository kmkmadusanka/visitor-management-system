import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimit',
})
export class WordLimitPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    // if (value.length > 14) {
    //   return `${value.substring(0, 12)}...`;
    // }

    return value;
  }
}
