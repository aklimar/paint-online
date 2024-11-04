import React, { useRef, useEffect, useState } from 'react';
import '../styles/canvas.scss';
import { observer } from "mobx-react-lite";
import CanvasState from '../store/CanvasState';
import ToolState from './../store/ToolState'
import Brush from './../tools/Brush';
import { Modal, Input, Button, Alert } from 'antd';
import { useParams } from 'react-router-dom';
import Rect from './../tools/Rect';


const Canvas = observer(
  () => {

    const canvasRef = useRef();
    const [username, setUsername] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const params = useParams()

    useEffect(() => {
      CanvasState.setCanvas(canvasRef.current)
    }, [])

    useEffect(() => {
      if (CanvasState.username) {
        const socket = new WebSocket(`ws://localhost:5000/`)
        CanvasState.setSocket(socket)
        CanvasState.setSessionId(params.id)
        ToolState.setTool(new Brush(canvasRef.current, socket, params.id))
        socket.onopen = () => {
          socket.send(JSON.stringify({
            id: params.id,
            username: CanvasState.username,
            method: "connection",
          }))
          socket.onmessage=(e)=>{
            let msg=JSON.parse(e.data)
            switch (msg.method) {
              case "connection":
                  console.log(`Пользователь ${msg.username} присоединился `)
                break;
              case "draw":
                  drawHandler(msg)
                break;
            
            }
          }
        }
      }
    }, [CanvasState.username])

    const drawHandler =(msg)=>{
      const figure=msg.figure
      const ctx=canvasRef.current.getContext('2d')
      switch (figure.type) {
        case "brush":
          Brush.draw(ctx,figure.x,figure.y)
          break;
        case "rect":
            Rect.staticDraw(ctx,figure.x,figure.y,figure.width,figure.height)
          break;
        case "finish":
            ctx.beginPath()
          break;
      }
    }

    const mouseDownHandler = () => {
      CanvasState.pushToUndo(canvasRef.current.toDataURL())
    }



    const connectHandler = () => {
      if (username.trim().length > 0) {  // Проверка на минимум 1 символ
        CanvasState.setUserName(username);
        setIsModalOpen(false);
      } else {
        setShowAlert(true)
      }
    };

    return (
      <>
        <Modal
          title="Введите имя"
          open={isModalOpen}
          footer={[
            <Button key="ok" type='primary' onClick={connectHandler}>OK</Button>
          ]}
        >
          <Input value={username} onChange={(e) => setUsername(e.target.value)} min={1} />
          {showAlert && (
            <Alert message="Введите хотя бы 1 символ" type="warning" style={{ marginTop: 10 }} />
          )}
        </Modal>
        <div className="canvas">
          <canvas
            onMouseDown={() => mouseDownHandler()}
            ref={canvasRef}
            width={1200}
            height={800} />
        </div>
      </>
    );
  }
)

export default Canvas;