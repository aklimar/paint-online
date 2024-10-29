export default class Tool {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mouseDown = false;
        this.initEvents();
    }
    initEvents() {
        this.canvas.onmouseleave = this.handleMouseLeave.bind(this);
        this.canvas.onmouseup = this.handleMouseUp.bind(this);
    }

    handleMouseLeave() {
        this.mouseDown = false;
    }

    handleMouseUp() {
        this.mouseDown = false;
    }
    destroyEvents(){
        this.canvas.onmousemove=null
        this.canvas.onmousedown=null
        this.canvas.onmouseup=null
        this.canvas.onmouseleave = null;
    }
}