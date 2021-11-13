import * as PIXI from 'pixi.js';
import { Fps } from './fps';
import { Pendulum } from './pendulum';

const CANVAS: HTMLCanvasElement = document.querySelector('#canvas') as HTMLCanvasElement;
const renderer: PIXI.Application = new PIXI.Application({view: CANVAS, antialias: true, backgroundColor: 5375e0, width: CANVAS.width, height: CANVAS.height });

class App {
  
  private fps = new Fps(this.renderer);
  private pendulum: Pendulum[] = [];

  constructor(public renderer: PIXI.Application) {
    this.init();
    this.start();
    this.loop();
  }
  
  private init(): void {
    this.pendulum.push(new Pendulum({x: 2* this.renderer.view.width / 3, y: 100}, 30, 500, Math.PI / 4, this.renderer));
  }

  private start(): void {

  }

  private loop(): void {
    this.renderer.ticker.add((delta) => {

    });
  }

}

new App(renderer);