import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import { ControlComponent } from './control/control.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ControlComponent
  ],
  imports: [
    CommonModule,
    ControlRoutingModule,
    FormsModule
  ],
  exports: [ControlComponent]

})
export class ControlModule { }
