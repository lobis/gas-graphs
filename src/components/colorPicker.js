import React, { useState } from 'react';
import '../style/ColorPicker.css';

function ColorPicker({ selectedColor, onColorChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    '#b80000', '#db3e00', '#fccb00', '#008b02', '#006b76', '#1273de', '#004dcf', '#5300eb'
  ];

  const handleColorClick = (color) => {
    onColorChange(color); // Renk değiştiğinde Dashboard bileşenine bildir
    setIsOpen(false);
  };

  return (
    <div className="simple-color-picker">
      <div
        className="selected-color-box"
        style={{ backgroundColor: selectedColor }}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      {isOpen && (
        <div className="color-menu">
          {colors.map((color, index) => (
            <div
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
