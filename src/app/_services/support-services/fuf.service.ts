import { Injectable } from '@angular/core';
import { SelectOption } from '../../_models/control-models/select-option.model';

@Injectable({
  providedIn: 'root'
})
export class FufService { // Frequently Used Functions

  constructor() { }

  /**
   * A function that creates a selectOption list from an enum object.
   * Give the enum as an object. (like this: Object(EnumName))
   * Also enum should have string values.
   * @remarks
   *
   * @param enumObject - the enum that will be converted to SelectOption[]
   * @param withNull - you can add a null value to your list by defining the label for the null value SelectOption
   * @returns SelectOption[]
   */
  getSelectOptionsByEnum(enumObject: object, withNull?: string): SelectOption[] { // use Object(Enum) to call this function
    const selectOptions: SelectOption[] = [];
    const keys = Object.keys(enumObject);
    if (withNull) {
      selectOptions.push(new SelectOption(null, withNull));
    }
    keys.forEach(key => {
      selectOptions.push(new SelectOption(key, enumObject[key]));
    });
    return selectOptions;
  }

  /**
   * A function that creates a random string with the given length.
   * with the following characters: abcdefghijklmnopqrstuvwxyz0123456789
   * @remarks
   *
   * @param length - the generated string will be this long
   * @returns string
   */
  getRandomString(length: number): string {
    let outString = '';
    const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
  }
}
