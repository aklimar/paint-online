import { makeAutoObservable } from "mobx";

class ToolState {
    tool = null;
    strokeColor = '#000000'; // Начальный цвет

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        this.tool = tool;
        this.applyCurrentColor(); // Устанавливаем текущий цвет автоматически
    }

    setStrokeColor(color) {
        this.strokeColor = color;
        if (this.tool) {
            this.tool.strokeColor = color;
        }
    }

    setFillColor(color) {
        if (this.tool) {
            this.tool.fillColor = color;
        }
    }

    setLineWidth(width) {
        this.tool.lineWidth = width
    }

    applyCurrentColor() {
        if (this.tool) {
            this.tool.strokeColor = this.strokeColor;
            this.tool.fillColor = this.strokeColor;
        }
    }
}

export default new ToolState();