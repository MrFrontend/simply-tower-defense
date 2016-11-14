'use strict';

import TowerDefenseGame from './TowerDefenseGame';

window.onload = function() {
  let startButtonElement: HTMLElement = document.getElementById('startButton');
  let stoptButtonElement: HTMLElement = document.getElementById('stopButton');
  let MyGame: TowerDefenseGame = new TowerDefenseGame();
  
  // Button event handler
  startButtonElement.onclick = () => {MyGame.startGame()};
  stoptButtonElement.onclick = () => {MyGame.stopGame()};
}
