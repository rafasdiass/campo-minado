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
    CellRoutingModule
  ]
})
export class CellModule { }
