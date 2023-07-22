import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CellRoutingModule } from './cell-routing.module';
import { CellComponent } from './cell/cell.component';



@NgModule({
  declarations: [
    CellComponent
  ],
  imports: [
    CommonModule,
    CellRoutingModule,
   
  ],
  exports: [CellComponent]
})
export class CellModule { }
