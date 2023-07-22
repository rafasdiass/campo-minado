import { Injectable } from '@angular/core';
import { Cell } from '../model/cell.model';
import { DifficultyService } from './difficulty.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  board: Cell[][] = [];
  gameOver: boolean = false;
  rows: number = 9;
  cols: number = 9;
  mineCount: number = 10;

  constructor(private difficultyService: DifficultyService) { }

  newGame() {
    console.log('Novo jogo começou');
    const difficulty = this.difficultyService.getDifficulty();
    this.rows = difficulty.rows;
    this.cols = difficulty.cols;
    this.mineCount = difficulty.mines;

    this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
    this.gameOver = false;

    for (let i = 0; i < this.mineCount; i++) {
      let row = Math.floor(Math.random() * this.rows);
      let col = Math.floor(Math.random() * this.cols);
      while(this.board[row][col]?.hasMine) {
        row = Math.floor(Math.random() * this.rows);
        col = Math.floor(Math.random() * this.cols);
      }
      this.board[row][col] = { row: row, col: col, isRevealed: false, hasMine: true, hasFlag: false, adjacentMines: 0 };
    }

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if(!this.board[row][col]) {
          this.board[row][col] = { row: row, col: col, isRevealed: false, hasMine: false, hasFlag: false, adjacentMines: 0 };
        }
        this.board[row][col].adjacentMines = this.countBombs(row, col);
      }
    }
    console.log(this.board);  
  }

  gameWon(): boolean {
  for(let row = 0; row < this.rows; row++) {
    for(let col = 0; col < this.cols; col++) {
      if(!this.board[row][col].hasMine && !this.board[row][col].isRevealed) {
        return false;
      }
    }
  }
  return true;
}

revealCell(row: number, col: number) {
  // Se o jogo acabou, não permita revelar células
  if (this.gameOver) {
    return;
  }

  if (this.board[row][col].hasFlag || this.board[row][col].isRevealed) {
    return;
  }

  this.board[row][col].isRevealed = true;

  if (this.board[row][col].hasMine) {
    this.gameOver = true;
    return;
  }

  if (this.board[row][col].adjacentMines === 0) {
    this.revealSurroundingCells(row, col);
  }
}

revealSurroundingCells(row: number, col: number) {
  for(let i = -1; i <= 1; i++) {
    for(let j = -1; j <= 1; j++) {
      if(!(i === 0 && j === 0) && this.isInsideBoard(row + i, col + j)) {
        this.revealCell(row + i, col + j);
      }
    }
  }
}

isInsideBoard(row: number, col: number) {
  return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
}

markCell(row: number, col: number) {
  // Se o jogo acabou, não permita marcar células
  if (this.gameOver) {
    return;
  }
  if (!this.board[row][col].isRevealed) {
    this.board[row][col].hasFlag = !this.board[row][col].hasFlag;
  }
}

countBombs(row: number, col: number): number {
  let count = 0;
  for(let i = -1; i <= 1; i++) {
    for(let j = -1; j <= 1; j++) {
      if(!(i === 0 && j === 0) && this.isInsideBoard(row + i, col + j)) {
        if(this.board[row + i][col + j]?.hasMine) {
          count++;
        }
      }
    }
  }
  return count;
}

checkGameEnd(): boolean {
  if(this.gameOver) {
    return true;
  }

  for(let row = 0; row < this.rows; row++) {
    for(let col = 0; col < this.cols; col++) {
      if(!this.board[row][col].isRevealed && !this.board[row][col].hasMine) {
        return false;
      }
    }
  }
  
  this.gameOver = true;
  return true;
}
}
