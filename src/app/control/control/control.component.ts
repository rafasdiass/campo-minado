import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  constructor(private gameService: GameService) {}

  newGame() {
    this.gameService.newGame();
  }

  setDifficulty(difficulty: string) {
    switch (difficulty) {
      case 'easy':
        this.gameService.newGame(9, 9, 10); // 9x9 board with 10 mines
        break;
      case 'medium':
        this.gameService.newGame(16, 16, 40); // 16x16 board with 40 mines
        break;
      case 'hard':
        this.gameService.newGame(16, 30, 99); // 16x30 board with 99 mines
        break;
      default:
        this.gameService.newGame(); // default to easy if an unexpected value is passed
        break;
    }
  }
}
