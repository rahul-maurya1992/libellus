import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  
  transform(items: any[], value: string, label:string): any[] {
  if (!items) return [];
  if (!value) return  items;
  if (value == '' || value == null) return [];
  value = value.toLowerCase();
  return items.filter(e => e[label].toLowerCase().indexOf(value) > -1 );
  
}


}
