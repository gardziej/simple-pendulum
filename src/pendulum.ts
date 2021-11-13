import { Application, Graphics, ObservablePoint } from "pixi.js";
import { Circle } from "./circle";
import { TextLine } from "./text-line";
import { getRandomColor } from "./utils";
import { Vector } from "./vector.interface";

export class Pendulum {

  private bob: Circle;
  private angleText: TextLine;
  private dataText: TextLine;
  private line: Graphics;
  private aVelocity = 0.0;
  private aAcceleration = 0.0;
  private gravity = 0.08;

  constructor(
    protected origin: Vector, 
    protected r: number,
    protected len: number,
    protected angle: number,
    protected renderer: Application
    ) {
    this.init();
    this.loop();
  }

  private init(): void {
    this.bob = new Circle(0, 0, this.r, {x: 0, y: 0}, '0xffffff', this.renderer);
    this.angleText = new TextLine('angle', this.origin.x + 20, this.origin.y + 20, {fontFamily : 'Arial', fontSize: 16, fill : 0xffffff, align : 'center'}, this.renderer);
    this.dataText = new TextLine('data', 20, this.renderer.view.height - 40, {fontFamily : 'Arial', fontSize: 16, fill : 0xffffff, align : 'left'}, this.renderer);
    this.line = new Graphics();
    this.renderer.stage.addChild(this.line);    
  }

  private loop(): void {
    this.renderer.ticker.add((delta) => {
      this.angleText.text = '' + Math.floor((this.angle * 180 / Math.PI) % 360);
      this.dataText.text  = 'aVelocity: ' + this.aVelocity + ',\naAcceleration: ' + this.aAcceleration;

      const force = this.gravity * Math.sin(this.angle);
      this.aAcceleration = -1 * force / this.len;
      this.aVelocity += this.aAcceleration;
      this.angle += this.aVelocity;

      this.bob.x = this.len * Math.sin(this.angle) + this.origin.x;
      this.bob.y = this.len * Math.cos(this.angle) + this.origin.y;

      this.line.clear();
      this.line.lineStyle(2, 0xffffff, 1);
      this.line.moveTo(this.origin.x, this.origin.y);
      this.line.lineTo(this.bob.x, this.bob.y);
      this.line.closePath();

    });
  }

}