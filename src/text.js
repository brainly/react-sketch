import FabricCanvasTool from './fabrictool'

const fabric = require('fabric').fabric;

export default class TextTool extends FabricCanvasTool {

  configureCanvas(props) {
    let canvas = this._canvas;
    canvas.isDrawingMode = canvas.selection = false;
    canvas.forEachObject((o) => o.selectable = o.evented = false);
    this._color = props.lineColor;
    this._fontFamily = props.fontFamily;
    this._fontSize = props.fontSize;
  }

  doMouseDown(o) {
    if (this.isDown) {
      return;
    }

    this.isDown = true;

    let canvas = this._canvas;
    let pointer = canvas.getPointer(o.e);

    const text = new fabric.IText('Enter text', {
      fontFamily: this._fontFamily,
      fontSize: this._fontSize,
      fill: this._color,
      left: pointer.x,
      top: pointer.y,
    });


    canvas.add(text);
    canvas.setActiveObject(text);

    text.selectAll();
    text.enterEditing();
  }

  doMouseUp() {
    this.isDown = false;
  }
}