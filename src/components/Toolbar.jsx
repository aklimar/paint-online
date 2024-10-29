import '../styles/toolbar.scss';
import ToolState from '../store/ToolState';
import Brush from './../tools/Brush';
import Rect from './../tools/Rect';
import Ellipsis from './../tools/Ellipsis';
import Line from './../tools/Line'
import CanvasState from '../store/CanvasState';
import Eraser from './../tools/Eraser';

const Toolbar = () => {
    return ( 
        <div className="toolbar">
            <button className='toolbar__btn brush' onClick={()=>{ToolState.setTool(new Brush(CanvasState.canvas))}}/>
            <button className='toolbar__btn rect' onClick={()=>{ToolState.setTool(new Rect(CanvasState.canvas))}}/>
            <button className='toolbar__btn circle' onClick={()=>{ToolState.setTool(new Ellipsis(CanvasState.canvas))}}/>
            <button className='toolbar__btn line' onClick={()=>{ToolState.setTool(new Line(CanvasState.canvas))}}/>
            <button className='toolbar__btn eraser'  onClick={()=>{ToolState.setTool(new Eraser(CanvasState.canvas))}}/>
            <input type='color' style={{marginLeft:10}}/>
            <button className='toolbar__btn undo'/>
            <button className='toolbar__btn redo'/>
            <button className='toolbar__btn save'/>
        </div>
     );
}
 
export default Toolbar;