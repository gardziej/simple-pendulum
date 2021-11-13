import { Application, Graphics } from 'pixi.js';
import { Vector } from './vector.interface';

export class Circle {

  protected rendererObject: Graphics;

  constructor(
    public x: number,
    public y: number,
    public r: number,
    public v: Vector = {x: 0, y: 0},
    public color: string,
    protected renderer: Application
    ) {
      this.init();
      this.loop();
    }

    get mass(): number {
      return this.r / 2;
    }

  private init(): void {
    this.initRenderer();
  }

  private initRenderer(): void {
    this.rendererObject = new Graphics();
    this.rendererObject.beginFill(+this.color);
    this.rendererObject.drawCircle(0, 0, this.r);
    this.updateRenderer();
    this.rendererObject.endFill();
    this.renderer.stage.addChild(this.rendererObject);
  }

  private loop(): void {
    this.renderer.ticker.add((delta) => {
      this.x = this.x + this.v.x;
      this.y = this.y + this.v.y;
      this.updateRenderer();
    });
  }

  private updateRenderer(): void {
    this.rendererObject.x = this.x;
    this.rendererObject.y = this.y;
  }

}