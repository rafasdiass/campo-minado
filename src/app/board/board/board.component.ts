import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit { // implemente OnInit para chamar o método newGame na inicialização

  constructor(
    
    public gameService: GameService
    
    ) { } 

  ngOnInit() {
    this.gameService.newGame();
  }

// crie metodo para exibir o estado do jogo
  getEmoji() {
    if (this.gameService.gameOver) {
      return '😵';
    } else if (this.gameService.gameWon()) {
      return '😎';
    } else {
      return '😃';
    }
  }

  // crie métodos para interagir com o serviço
  revealCell(row: number, col: number) {
    this.gameService.revealCell(row, col);
  }

  markCell(row: number, col: number) {
    this.gameService.markCell(row, col);
  }
}
