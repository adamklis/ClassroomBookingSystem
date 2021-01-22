import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipList'
})
export class TooltipListPipe implements PipeTransform {

  transform(listOfLines: any[]): string {
    let result = '';
    listOfLines.forEach(line => result = result + line + '\n');

    return result.trim();
  }

}
