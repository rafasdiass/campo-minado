import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { DifficultyService } from '../../services/difficulty.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent {
  selectedDifficulty: string = '';

  constructor(
    private gameService: GameService,
    private difficultyService: DifficultyService
  ) {}

  newGame() {
    this.gameService.newGame();
    console.log('New game started em control');
  }
  

  setDifficulty() {
    if (this.selectedDifficulty === '') {
      // Não faz nada se nenhuma dificuldade foi selecionada
      return;
    }

    this.difficultyService.setDifficulty(this.selectedDifficulty);
    this.newGame();  // Start a new game with the new difficulty setting
  }
}
