import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarksRoutingModule } from './marks-routing.module';
import { MarksComponent } from './marks.component';


@NgModule({
  declarations: [
    MarksComponent
  ],
  imports: [
    CommonModule,
    MarksRoutingModule
  ]
})
export class MarksModule { }
