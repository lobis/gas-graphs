import { GithubPicker } from 'react-color';

import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"

const ColorPicker = ({ initialColor = { r: '255', g: '0', b: '0', a: '1', }, setColor }) => {
    const [state, setState] = useState({
        displayColorPicker: false,
        color: initialColor
    });

    const selectedGases = useSelector(state => state.gas.selectedGases)

    const handleClick = () => { setState({ ...state, displayColorPicker: !state.displayColorPicker }) }

    const handleClose = () => { setState({ ...state, displayColorPicker: false }) }

    useEffect(() => {
        selectedGases.forEach(entry => {
            if (JSON.stringify(entry.color) !== JSON.stringify(state.color)) {
                if (setColor) {
                    setColor(state.color)
                }
            }
        })
    }, [state.color, setColor, selectedGases])

    const handleChange = (newColor) => {
        setState({ ...state, color: newColor.rgb })
    }

    const styles = {
        color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`,
        },
        swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        },
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    }

    return (
        <div>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color} />
            </div>
            {
                state.displayColorPicker ?
                    <div style={styles.popover}>
                        <div style={styles.cover} onClick={handleClose} />
                        <GithubPicker color={state.color} onChange={handleChange} />
                    </div>
                    : null
            }
        </div>
    );
}

export default ColorPicker;

export const colorRGBToHex = (color = { r: 255, g: 0, b: 0, a: 1 }) => {
    const rgb = (color.r << 16) | (color.g << 8) | (color.b << 0);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
}