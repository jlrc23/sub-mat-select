import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { FilterData } from "../model/filter-data.interface";
import { debounceTime } from 'rxjs/operators';
import { MetadataService } from './metadata.service';
import { COMBOBOX_VALUE_ACCESSOR, MAX_WAIT, VAL_SELECT_ALL, LBL_SELECT_ALL } from './combo-box.const';

@Component({
  selector: 'app-combo-box',
  providers: [COMBOBOX_VALUE_ACCESSOR, MetadataService],
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ComboBoxComponent implements ControlValueAccessor, OnInit {
  constructor(public mtData: MetadataService) { }
  @Input() set dataset(ds) { this.mtData.setDataset(ds); }
  @Input() set multiSelect(multiSelect) { this.mtData.setMultiSelect(multiSelect); }
  @Input() set bandItemSelectAll(bandItemSelectAll) { this.mtData.setBandItemSelectAll(bandItemSelectAll); }
  @Input() set indexOfItemSelected(indexOfItemSelected) { this.mtData.setIndexOfItemSelected(indexOfItemSelected); }
  @Input() styleSelect: any;
  @Input() set topMax(topMax) { 
    this.mtData.setTopMax(topMax);
    if(topMax){
      this.labelSelect = "Select Top";
    }
  }
  readonly valueOfSelectAllItem = VAL_SELECT_ALL;
  labelSelect = LBL_SELECT_ALL;
  onChange: Function;
  onTouched: Function;
  ctrlSelector = new FormControl();
  private selectedFilter;
  private flagCheckAll: boolean;
  private oldState;

  ngOnInit(): void {
    this.ctrlSelector
      .valueChanges
      .pipe(debounceTime(MAX_WAIT))
      .subscribe(this.selectItems.bind(this));
  }

  private selectItems(selectedItems) {
    if (this.mtData.multiSelect) {
      selectedItems = this.behaviorMultiSelect(selectedItems);
    }
    this.selectedFilter = selectedItems;
    this.onChange(this.selectedFilter);
    this.onTouched();
    this.oldState = this.selectedFilter;
  }

  private behaviorMultiSelect(selectedItems) {
    let result = selectedItems;
    const checkedSelectAll = selectedItems.some(i => VAL_SELECT_ALL == i);
    if (selectedItems.length === this.mtData.dataset.length && !checkedSelectAll) {
      this.checkAll();
      result = this.valueOfSelectAllItem;
    } else if (checkedSelectAll && this.oldState == this.valueOfSelectAllItem) {
      this.uncheckSelectAll(selectedItems);
    }
    return result;
  }

  toggleSelectAll($event) {
    if (this.mtData.multiSelect) {
      this.flagCheckAll = !this.flagCheckAll;
      if (this.flagCheckAll)
        this.checkAll();
      else
        this.ctrlSelector.setValue([]); //, {onlySelf: true, emitEvent: false});//,  
    }
  }

  private uncheckSelectAll(items) {
    this.flagCheckAll = false;
    this.ctrlSelector.setValue([...items.filter(i => i != VAL_SELECT_ALL)], { onlySelf: true, emitEvent: false });
  }

  private checkAll() {
    this.flagCheckAll = true;
    console.log()
    const allItems = this.mtData.topMax? this.mtData.dataset.slice(0, this.mtData.topMax):this.mtData.dataset;
    this.ctrlSelector.setValue([VAL_SELECT_ALL, ...allItems], { onlySelf: true, emitEvent: false });
  }

  public isAllow(item){
    let result = false;
    if(this.mtData.multiSelect && this.mtData.topMax && this.ctrlSelector.value){
      let isSelected = false
      for(let i in this.ctrlSelector.value ){
        if( this.ctrlSelector.value[i].value == item.value ){
          isSelected = true;
          break;
        }
      }
      const countSelecteds = this.flagCheckAll? this.ctrlSelector.value.length-1:  this.ctrlSelector.value.length;
      const allowMore = this.mtData.topMax <= countSelecteds;
      result = !isSelected  && allowMore;



    }
    return result;
  }

  /**
   * @override
   */
  writeValue(obj: any) {
    this.selectedFilter = obj;
  }

  /**
   * @override
   */
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  /**
   * @override
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}