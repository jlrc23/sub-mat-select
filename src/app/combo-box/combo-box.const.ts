import {  NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { ComboBoxComponent } from './combo-box.component';

export const LBL_SELECT_ALL = "Select All";
export const COMBOBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ComboBoxComponent),
  multi: true
};
export const VAL_SELECT_ALL =  -1000;
export const MAX_WAIT = 20;