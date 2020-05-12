import FabricCanvasTool from './fabrictool'
import {linearDistance} from './utils';

const fabric = require('fabric').fabric;

export default class Triangle extends FabricCanvasTool {

  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = canvas.selection = false;
    canvas.forEachObject((o) => o.selectable = o.evented = false);
    this._width = props.lineWidth;
    this._color = props.lineColor;
    this._fill = props.fillColor;
  }

  doMouseDown(o) {
    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);

    this.isDown = true;
    [this.startX, this.startY] = [pointer.x, pointer.y];
    this.triangle = new fabric.Triangle({
      left: this.startX,
      top: this.startY,
      width: 1,
      height: 1,
      originX: 'center', originY: 'center',
      strokeWidth: this._width,
      stroke: this._color,
      fill: this._fill,
      selectable: false,
      evented: false,
    });

    canvas.add(this.triangle);
  }

  doMouseMove(o) {
    if (!this.isDown) return;

    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);

    this.triangle.set({
      width: linearDistance({ x: this.startX, y: this.startY }, { x: pointer.x, y: this.startY }) * 2,
      height: linearDistance({ x: this.startX, y: this.startY }, { x: this.startX, y: pointer.y }) * 2,
    });
    this.triangle.setCoords();

    canvas.renderAll();
  }

  doMouseUp() {
    this.isDown = false;
  }
}