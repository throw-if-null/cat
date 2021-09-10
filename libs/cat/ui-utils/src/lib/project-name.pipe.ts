import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectName'
})
export class ProjectNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
