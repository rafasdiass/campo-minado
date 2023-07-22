import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(public gameService: GameService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.gameService.newGame();
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();  // Força a detecção de mudanças
  }
  

  markCell(row: number, col: number) {
    this.gameService.markCell(row, col);
  }
}
