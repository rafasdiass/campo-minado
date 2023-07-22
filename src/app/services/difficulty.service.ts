import { Injectable } from '@angular/core';
import { DifficultySetting } from '../model/difficulty-setting.model';


@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
  private difficulties: { [key: string]: DifficultySetting } = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 30, cols: 16, mines: 99 },
  };

  currentDifficulty: DifficultySetting = this.difficulties['easy'];

  constructor() { }

  setDifficulty(difficulty: string) {
    if (this.difficulties[difficulty]) {
      this.currentDifficulty = this.difficulties[difficulty];
    }
  }

  getDifficulty(): DifficultySetting {
    return this.currentDifficulty;
  }
}
