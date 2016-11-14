/**
 * Tower Defense Game
 */
class TowerDefenseGame {
  // Identifier of the last requestAnimationFrame so we can stop the game.
  public stopMain: number;
  // Keeps track of the last update time. Always increments by tickLength.
  public lastTick: number;
  // Keeps track of the last provided requestAnimationFrame timestamp.
  public lastRender: number;
  // Set the simulation to run at 25Hz (40ms)
  public tickLength: number = 40;
  // Time since the game started in seconds
  public secondsSinceStart: number = 0;
  // Basic game state
  private gameRunning: boolean = false;

  private testElement: HTMLElement; // TODO: just for testing, remove this.

  /**
   * Initialize the game.
   * Performs whatever tasks are leftover before the mainloop must run.
   */
  setInitialState():void {
    console.log('setInitialState');
  }

  public startGame(): void {
    if (this.gameRunning === false) {
      console.warn('start game');
      //Pretend the first draw was on first update.
      this.lastRender = this.lastTick;
      this.lastTick = performance.now();
      this.gameRunning = true;

      // Start the main loop
      this.main(performance.now());
    }
  }

  /**
   * Method to stop the animation of the current game
   */
  public stopGame(): void {
    if (this.gameRunning === true) {
      console.warn('stop game');
      this.gameRunning = false;
      window.cancelAnimationFrame(this.stopMain);
    }
  }

  /**
   * Reset the game to the initial state
   */
  public resetGame(): void {
    this.setInitialState();
  }

  /**
   * Calculates the game state as of a given point in time. It should always
   * increment by tickLength. It is the authority for game state. It is passed 
   * the DOMHighResTimeStamp for the time it represents (which, again, is always 
   * last update + MyGame.tickLength unless a pause feature is added, etc.)
   */
  private update(tickFrame: number){
    let secondsSinceStart: number = Math.floor(tickFrame / 1000);

    if (secondsSinceStart > this.secondsSinceStart && Math.floor(tickFrame % 1000) < 100) {
      this.secondsSinceStart = secondsSinceStart;
      if (secondsSinceStart % 2 === 0){
        this.testElement.style.left = '10px';
      } else {
        this.testElement.style.left = '570px';
      }
      
    }
  }

  /**
   * Is passed tickFrame because it is assumed that the render method will calculate
   * how long it has been since the most recently passed update tick for 
   * extrapolation (purely cosmetic for fast devices). It draws the scene.
   */
  render(tickFrame: number){
    // Something will happen here at some point :)
  }

  /**
   * Call the update function every tickLength milliseconds.
   */
  private queueUpdates(numTicks: number) {
    for(var i=0; i < numTicks; i++) {
      // Now lastTick is this tick.
      this.lastTick = this.lastTick + this.tickLength;
      this.update(this.lastTick);
    }
  }

  /**
   * Game main loop
   */
  private main(tickFrame: number ){
    this.stopMain = window.requestAnimationFrame(this.main.bind(this));
    var nextTick = this.lastTick + this.tickLength;
    var numTicks = 0;

    // Keep track of how large numTicks is.
    // If it is large, then either the game was asleep, or the machine cannot keep up.
    if (tickFrame > nextTick) {
      // Calculate the time between requestAnimationFrame callback and last update.
      var timeSinceTick = tickFrame - this.lastTick;
      numTicks = Math.floor(timeSinceTick / this.tickLength);
    }

    this.queueUpdates(numTicks);
    this.render(tickFrame);
    this.lastRender = tickFrame;
  }

  constructor() {
    // Init the state of the game
    this.setInitialState();
    this.testElement = document.getElementById('test');
  }
}

export default TowerDefenseGame;