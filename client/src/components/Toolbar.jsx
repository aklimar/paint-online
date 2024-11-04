import React, { useState, useEffect } from 'react';
import '../styles/toolbar.scss';
import ToolState from '../store/ToolState';
import Brush from './../tools/Brush';
import Rect from './../tools/Rect';
import Ellipsis from './../tools/Ellipsis';
import Line from './../tools/Line'
import CanvasState from '../store/CanvasState';
import Eraser from './../tools/Eraser';

const Toolbar = () => {
    const [color, setColor] = useState(ToolState.strokeColor);

    useEffect(() => {
        ToolState.setStrokeColor(color);
        ToolState.setFillColor(color);
    }, [color]);

    const changeColor = e => {
        setColor(e.target.value);
    }

    return ( 
        <div className="toolbar">
            <button className='toolbar__btn brush' onClick={() => { ToolState.setTool(new Brush(CanvasState.canvas,CanvasState.socket,CanvasState.sessionId)) }} />
            <button className='toolbar__btn rect' onClick={() => { ToolState.setTool(new Rect(CanvasState.canvas,CanvasState.socket,CanvasState.sessionId)) }} />
            <button className='toolbar__btn circle' onClick={() => { ToolState.setTool(new Ellipsis(CanvasState.canvas)) }} />
            <button className='toolbar__btn line' onClick={() => { ToolState.setTool(new Line(CanvasState.canvas)) }} />
            <button className='toolbar__btn eraser' onClick={() => { ToolState.setTool(new Eraser(CanvasState.canvas)) }} />
            <input
                onChange={changeColor}
                value={color}
                style={{ marginLeft: 10 }}
                type="color"
            />
            <button className='toolbar__btn undo' onClick={()=>CanvasState.undo()} />
            <button className='toolbar__btn redo' onClick={()=>CanvasState.redo()}/>
            <button className='toolbar__btn save' />
        </div>
    );
}

export default Toolbar;
