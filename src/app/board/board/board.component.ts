import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CellComponent } from '../../cell/cell/cell.component';
import { ControlComponent } from '../../control/control/control.component'; // import ControlComponent

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.gameService.newGame();
  }

  getEmoji() {
    if (this.gameService.gameOver) {
      return '😵';
    } else if (this.gameService.gameWon()) {
      return '😎';
    } else {
      return '😃';
    }
  }

  get board() {
    return this.gameService.board;
  }
  
  revealCell(row: number, col: number) {
    this.gameService.revealCell(row, col);
  }

  markCell(row: number, col: number) {
    this.gameService.markCell(row, col);
  }
}
