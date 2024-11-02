import '../styles/settingbar.scss';
import ToolState from './../store/ToolState'
import { useState, useEffect } from 'react';
const SettingBar = () => {

    return (
        <div className="settingBar">
            <label htmlFor='selectLineWidth'>Толщина линии</label>
            <select 
            id='selectLineWidth'
            onChange={(e) => ToolState.setLineWidth(Number(e.target.value))}
            >
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="30">30</option>
                <option value="50">50</option>
            </select>
            <label htmlFor='stroke-color'>Цвет обводки</label>
            <input
            onChange={(e)=>ToolState.setStrokeColor(e.target.value)}
            id="stroke-color"
            type='color'
            />
        </div>
    );
}

export default SettingBar;