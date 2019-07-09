import { Component, OnInit } from '@angular/core';
import { FilterData } from './model/filter-data.interface';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataset: FilterData[] = [
    { value: 'chico-0', label: 'Chico' },
    { value: 'mediano-1', label: 'Mediano' },
    { value: 'grande-2', label: 'Grande' }
  ];
  selecteds: any;
  indexItemSelected = 0;
  bandItemSelectAll = true;

  styleSelect: {
        'width': 'max-content !important',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        'appearance': 'none'
    }

  selector: FormControl;

  ngOnInit() {
    this.selector = new FormControl();
    this.selector.valueChanges.subscribe(res=>{
      console.log(`[AppComponent::ngOnInit]`, res);
      this.selecteds=res;
    });
  }

}
