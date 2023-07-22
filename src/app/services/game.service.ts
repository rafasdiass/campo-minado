import { Injectable } from '@angular/core';

interface Cell {
  isRevealed: boolean;
  hasMine: boolean;
  hasFlag: boolean;
  adjacentMines: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  
  board: Cell[][] = [];
  gameOver: boolean = false;
  rows: number = 9;
  cols: number = 9;
  mineCount: number = 10;

  constructor() { }

  newGame(rows: number = 9, cols: number = 9, mines: number = 10) {
    this.rows = rows;
    this.cols = cols;
    this.mineCount = mines;

    this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
    this.gameOver = false;

    for (let i = 0; i < this.mineCount; i++) {
      let row = Math.floor(Math.random() * this.rows);
      let col = Math.floor(Math.random() * this.cols);
      // Ensure the cell doesn't already have a mine
      while(this.board[row][col]?.hasMine) {
        row = Math.floor(Math.random() * this.rows);
        col = Math.floor(Math.random() * this.cols);
      }
      this.board[row][col] = { isRevealed: false, hasMine: true, hasFlag: false, adjacentMines: 0 };
    }

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if(!this.board[row][col]) {
          this.board[row][col] = { isRevealed: false, hasMine: false, hasFlag: false, adjacentMines: 0 };
        }
        this.board[row][col].adjacentMines = this.countBombs(row, col);
      }
    }
  }

  gameWon(): boolean {
  for(let row = 0; row < this.rows; row++) {
    for(let col = 0; col < this.cols; col++) {
      // if the cell doesn't have a mine and isn't revealed, return false
      if(!this.board[row][col].hasMine && !this.board[row][col].isRevealed) {
        return false;
      }
    }
  }

  
  return true;
}


  revealCell(row: number, col: number) {
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
