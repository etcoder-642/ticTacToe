# Tic Tac Toe Game

This was the most fun project I have built so far. Some of the things I have learned from this project includes:

- The Use of Modules and Factory Functions
- How to organize code and write a more cleaner code.
- How to dynamically update the UI using Js.
- The importance of documenting and writing an explanation for your code etc...

Here I have explained in detail how the system works.

This is a simple implementation of the classic Tic Tac Toe game. The game allows two players to compete against each other, keeping track of scores and rounds.

## Features

- Two-player mode.
- Dynamic UI updates for player turns and game status.
- Tracks player scores across multiple rounds.
- Handles invalid moves gracefully.
- Displays winner or draw messages at the end of the game.
- Reset and restart functionality.

## Modules and Components

### `gameModule`
- Manages the game logic, including the game board, player turns, and win conditions.
- Key methods:
  - `createPlayer(name)`: Adds a player to the game.
  - `startGame()`: Starts the game if two players are present.
  - `addValue(pos)`: Adds a value to the board at the specified position if valid.
  - `resetGame()`: Resets the game board and state.
  - `getPlayers()`: Returns the list of players.
  - `boardStat()`: Returns the current state of the game board.

### `playerPoint`
- Tracks the scores of both players.
- Key methods:
  - `incrementFirst(num)`: Increments the score of Player 1.
  - `incrementSecond(num)`: Increments the score of Player 2.
  - `getValueFirst()`: Returns Player 1's score.
  - `getValueSecond()`: Returns Player 2's score.
  - `reset()`: Resets both players' scores.

### `displayController`
- Handles the UI and player interactions.
- Key methods:
  - `popUpMode()`: Displays a popup for game events.
  - `normalMode()`: Switches to the normal game mode.
  - `resetMode()`: Resets the game UI and state.
  - `drawMode()`: Displays a draw message.
  - `winnerMode()`: Displays the winner message.
  - `playerTurn(boolean)`: Updates the UI to show the current player's turn.

## Updates

- **Variable Updates**: The `currentPlayer` boolean in `displayController` now toggles only on valid moves.
- **Game Logic**: Improved validation for player moves to ensure proper turn handling.
- **UI Updates**: Enhanced feedback for invalid moves and game status.

## How to Play

1. Start the game by entering player names and the number of rounds.
2. Players take turns clicking on the grid to place their marks.
3. The game announces the winner or a draw at the end of each round.
4. Use the reset or restart buttons to play again.

## Requirements

- A modern web browser.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Open the `index.html` file in your browser.

## License

This project is licensed under the MIT License.