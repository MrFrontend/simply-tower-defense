class TowerDefenseMap {
    padding: number = 10;
    spaceBetweenSections: number;
    boardWidth: number;
    boardHeight: number;
    lineWidth: number = 0.5;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    public render(): void {
        window.requestAnimationFrame(() => {
            for (var x = 0; x <= this.boardWidth; x += this.spaceBetweenSections) {
                this.context.moveTo(0.5 + x + this.padding, this.padding);
                this.context.lineTo(0.5 + x + this.padding, this.boardHeight + this.padding);
            }


            for (var x = 0; x <= this.boardHeight; x += this.spaceBetweenSections) {
                this.context.moveTo(this.padding, 0.5 + x + this.padding);
                this.context.lineTo(this.boardWidth + this.padding, 0.5 + x + this.padding);
            }

            this.context.strokeStyle = "black";
            this.context.stroke();
        });
    }

    private resize(width: number, height: number): void {
        this.boardWidth = this.width - 2 * this.padding;
        this.boardHeight = this.height - 2 * this.padding;
        this.spaceBetweenSections = this.boardWidth / this.sections;
    }

    private createCanvasElement(): void {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.className = 'tower-defense-map';
        this.rootElement.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
    }

    constructor (private rootElement: HTMLElement, private width: number, private height: number, private sections: number = 16){
        this.resize(width, height);
        this.createCanvasElement();
    }
}

export default TowerDefenseMap;
