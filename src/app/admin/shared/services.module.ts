import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@NgModule({
  providers: [
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ],
  imports: [
    CommonModule
  ],
})
export class ServicesModule{}
