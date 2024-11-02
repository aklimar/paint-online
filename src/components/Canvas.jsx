import React, { useRef, useEffect } from 'react';
import '../styles/canvas.scss';
import {observer} from "mobx-react-lite";
import CanvasState from '../store/CanvasState';
import ToolState from './../store/ToolState'
import Brush from './../tools/Brush';

const Canvas = observer(
  () => {

    const canvasRef = useRef();

    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current)
        ToolState.setTool(new Brush(canvasRef.current))
    }, [])
  
    const mouseDownHandler=()=>{
      CanvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
      <div className="canvas">
        <canvas 
        onMouseDown={()=>mouseDownHandler()}
        ref={canvasRef} 
        width={1200} 
        height={800} />
      </div>
    );
  }
)
  
export default Canvas;