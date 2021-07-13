import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'catFilter' })
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string | null, properties?: string[]): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    const filterQuery = searchText.toLocaleLowerCase();

    return items.filter(it => {
      if (properties && properties.length > 0) {
        return properties.some(prop => {
          const val = it[prop];
          // ignore non-string values
          if (typeof val !== 'string') {
            return false;
          }
          return val.toLocaleLowerCase().includes(filterQuery);
        });
      }
      return it.toLocaleLowerCase().includes(filterQuery);
    });
  }
}
