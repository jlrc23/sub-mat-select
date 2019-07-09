import { Injectable } from '@angular/core';
import { FilterData } from "../model/filter-data.interface";
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable()
export class MetadataService {
  dataset:FilterData[] = [];
  multiSelect: boolean;
  bandItemSelectAll: boolean;
  indexOfItemSelected: number;
  topMax: number;

  BSdataset = new BehaviorSubject<FilterData[]>(this.dataset);
  BSmultiSelect = new BehaviorSubject< boolean>(this.multiSelect);
  BSbandItemSelectAll = new BehaviorSubject< boolean>(this.bandItemSelectAll);
  BSindexOfItemSelected = new BehaviorSubject< number>(this.indexOfItemSelected);
  BStopMax = new BehaviorSubject< number>(this.topMax);

  dataset$: Observable<FilterData[]> = this.BSdataset.asObservable();
  multiSelect$: Observable<boolean> = this.BSmultiSelect.asObservable();
  bandItemSelectAll$: Observable<boolean> = this.BSbandItemSelectAll.asObservable();
  indexOfItemSelected$: Observable<number> = this.BSindexOfItemSelected.asObservable();
  topMax$: Observable<number> = this.BStopMax.asObservable();

  constructor() { }

  setDataset(ds:FilterData[]){
    if(this.dataset != ds){
      this.dataset = ds;
      this.BSdataset.next(ds);
    }
  }


  setMultiSelect(multiSelect: boolean){
    if(this.multiSelect != multiSelect){
      this.multiSelect = multiSelect;
      this.BSmultiSelect.next(this.multiSelect);
    }
  }


  setBandItemSelectAll(bandItemSelectAll: boolean){
    if(this.bandItemSelectAll != bandItemSelectAll){
      this.bandItemSelectAll = bandItemSelectAll;
      this.BSbandItemSelectAll.next(this.bandItemSelectAll);
    }
  }


  setIndexOfItemSelected(indexOfItemSelected: number){
    if(this.indexOfItemSelected != indexOfItemSelected){
      this.indexOfItemSelected = indexOfItemSelected;
      this.BSindexOfItemSelected.next(this.indexOfItemSelected);
    }
  }


  setTopMax(topMax: number){
    if(this.topMax != topMax){
      this.topMax = topMax;
      this.BStopMax.next(this.topMax);
    }
  }
}