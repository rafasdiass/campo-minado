import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board/board.component';
import { CellModule } from '../cell/cell.module';
import { ControlModule } from '../control/control.module';


@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    CellModule,
    ControlModule
  ],
  exports: [BoardComponent]

})
export class BoardModule { }

