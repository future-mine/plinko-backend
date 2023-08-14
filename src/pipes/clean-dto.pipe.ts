import { PipeTransform, Injectable } from '@nestjs/common';
import * as _ from 'lodash';

export const cleanObject = (obj: any): any => {
  return _.pickBy(obj, _.identity);
};

@Injectable()
export class CleanDtoPipe implements PipeTransform {
  transform(value: any): any {
    return cleanObject(value);
  }
}

@Injectable()
export class ToUpperCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
