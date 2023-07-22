import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../model/cell.model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {

  @Input() cell: Cell = { 
    isRevealed: false, 
    hasMine: false, 
    hasFlag: false, 
    adjacentMines: 0,
    row: 0,
    col: 0 
  };// recebe a célula como entrada

  @Output() cellClicked = new EventEmitter<{ row: number, col: number }>();
  @Output() flagPlaced = new EventEmitter<{ row: number, col: number }>();

  clickCell(row: number, col: number) {
    this.cellClicked.emit({ row, col });
  }

  placeFlag(event: MouseEvent, row: number, col: number) {
    event.preventDefault();
    this.flagPlaced.emit({ row, col });
  }
}
