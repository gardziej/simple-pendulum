import { Application } from "pixi.js";
import { TextLine } from "./text-line";

export class Fps {

  private counter: number = 0;
  private fpsText: TextLine;
  private lastCalledTime: number;
  
  constructor(protected renderer: Application) {
    this.init();
    this.loop();
  }

  private init(): void {
    this.fpsText = new TextLine('', 10, 10, {fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'}, this.renderer);
  }

  private loop(): void {
    this.renderer.ticker.add((delta) => {
      this.calculateFps(delta);
    });
  }

  private calculateFps(delta: number): void {
    this.counter += delta;
    if (this.counter > 60) { this.counter = 0; }
    let pNow: number = performance.now();

    if (!this.lastCalledTime) {
      this.lastCalledTime = pNow;
      this.fpsText.text = '';
      return;
    }
    const d = (pNow - this.lastCalledTime)/1000;
    this.lastCalledTime = pNow;
    if (this.counter === 0) { this.fpsText.text = String(Math.floor(1/d)); }
  }


}