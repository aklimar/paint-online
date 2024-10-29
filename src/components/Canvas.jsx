import React, { useRef, useEffect } from 'react';
import '../styles/canvas.scss';
import {observer} from "mobx-react-lite";
import CanvasState from '../store/CanvasState';

import Brush from './../tools/Brush';

const Canvas = observer(
  () => {

    const canvasRef = useRef();

    useEffect(() => {
        CanvasState.setCanvas(canvasRef.current)
    }, [])
  
    return (
      <div className="canvas">
        <canvas ref={canvasRef} width={1000} height={600} />
      </div>
    );
  }
)
  
export default Canvas;