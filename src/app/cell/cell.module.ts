import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CellRoutingModule } from './cell-routing.module';
import { CellComponent } from './cell/cell.component';
import { BoardModule } from '../board/board.module';


@NgModule({
  declarations: [
    CellComponent
  ],
  imports: [
    CommonModule,
    CellRoutingModule,
    BoardModule
  ]
})
export class CellModule { }
