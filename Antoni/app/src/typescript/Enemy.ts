class Enemy {
    private enemyWidth: number = 20;
    private enemyHeight: number = 20;
    private enemyTop: number;
    private enemyLeft: number;
    private updateFrequency: number = 100;
    private updateCounter: number = this.updateFrequency;
    private moveStep: number = 6;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private tangent: number = 0;

    public render(): void {
        this.canvas.style.top = `${this.enemyTop}px`;
        this.canvas.style.left = `${this.enemyLeft}px`;
    }

    public update(): void {
        if (this.updateCounter === this.updateFrequency) {
            /*
            if (this.enemyLeft < 400 && this.enemyLeft <= 200 ){
                this.enemyLeft += this.moveStep;
            } else if (this.enemyTop < 400) {
                this.enemyTop += this.moveStep;
            } else if (this.enemyTop >= 400){
                this.enemyLeft -= this.moveStep;
            } else if (this.enemyLeft >= 400) {
                this.enemyTop -= this.moveStep;
            }
            */
            this.tangent += 0.1;
            var r = 100;
            var xcenter = 300;
            var ycenter = 300;
            this.enemyLeft = Math.floor(xcenter + (r * Math.cos(this.tangent)));
            this.enemyTop = Math.floor(ycenter + (r * Math.sin(this.tangent)));
            
        } else {
            this.updateCounter ++;
        }
    }

    private createCanvasElement(): void {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.enemyWidth;
        this.canvas.height = this.enemyHeight;
        this.canvas.className = 'tower-defense-enemy';
        this.rootElement.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
    }

    constructor (private rootElement: HTMLElement){
        this.enemyTop = 300;
        this.enemyLeft = 400;
        this.createCanvasElement();
        this.render();
    }
}

export default Enemy;
