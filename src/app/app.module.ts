import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { MetadataService } from './combo-box/metadata.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    NoopAnimationsModule 
    ],
  declarations: [ AppComponent, ComboBoxComponent ],
  bootstrap:    [ AppComponent ],
  providers: [MetadataService]
})
export class AppModule { }
