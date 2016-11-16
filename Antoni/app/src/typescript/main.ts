'use strict';

import TowerDefenseGame from './TowerDefenseGame';

window.onload = function() {
  let startButtonElement: HTMLElement = document.getElementById('startButton');
  let stoptButtonElement: HTMLElement = document.getElementById('stopButton');
  let containerElement: HTMLElement = document.getElementById('container');
  let MyGame: TowerDefenseGame = new TowerDefenseGame(containerElement);
  
  // Button event handler
  startButtonElement.onclick = () => {MyGame.startGame()};
  stoptButtonElement.onclick = () => {MyGame.stopGame()};
}
