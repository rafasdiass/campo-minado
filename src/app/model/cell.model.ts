export interface Cell {
    row: number;
    col: number;
    isRevealed: boolean;
    hasMine: boolean;
    hasFlag: boolean;
    adjacentMines: number;
  }
  