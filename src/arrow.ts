import { Application, Graphics } from 'pixi.js';

export class Arrow {

  protected rendererObject: Graphics;
  private pointToObj: any;

  constructor(
    public x: number,
    public y: number,
    public s: number,
    public color: string,
    protected renderer: Application
    ) {
      this.init();
      this.loop();
    }

  private init(): void {
    this.initRenderer();
  }

  private initRenderer(): void {
    this.rendererObject = new Graphics();
    this.rendererObject.beginFill(+this.color);
    const arrowSize: number = this.s;
    this.rendererObject.moveTo(-arrowSize*2, -arrowSize);
    this.rendererObject.lineTo(0, -arrowSize);
    this.rendererObject.lineTo(0, -arrowSize*2);
    this.rendererObject.lineTo(arrowSize*2, 0);
    this.rendererObject.lineTo(0, arrowSize*2);
    this.rendererObject.lineTo(0, arrowSize);
    this.rendererObject.lineTo(-arrowSize*2, arrowSize);
    this.rendererObject.lineTo(-arrowSize*2, -arrowSize);
    this.rendererObject.closePath();
    this.rendererObject.endFill();
    this.renderer.stage.addChild(this.rendererObject);


  }

  private loop(): void {
    this.renderer.ticker.add((delta) => {
      this.updateRenderer();
    });
  }

  private updateRenderer(): void {
    this.rendererObject.x = this.x;
    this.rendererObject.y = this.y;
    if (this.pointToObj) {
      let dx = this.pointToObj.x - this.x;
      let dy = this.pointToObj.y - this.y;
      this.rendererObject.rotation = Math.atan2(dy, dx); //radians
    }
  }

  public pointToObject(obj) {
    this.pointToObj = obj;
  }

}