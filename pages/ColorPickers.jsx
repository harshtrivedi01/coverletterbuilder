import React from 'react';

const colors = [
  { name: 'None', value: '' },
  { name: 'Nobel Grey', value: '#8e8e8e' },
  { name: 'Oxford Blue', value: '#002147' },
  { name: 'Electric Lilac', value: '#b19cd9' },
  { name: 'Olympic Blue', value: '#0094c6' },
  { name: 'Turquoise', value: '#00b5ad' },
  { name: 'Jungle Green', value: '#029e73' },
  { name: 'Indian Red', value: '#cd5c5c' },
  { name: 'Tuscan Yellow', value: '#f7c52b' },
];

const ColorPickers = ({ selectmultiplecolor, onChange }) => {
  return (
    <div className="flex items-center">
      <span>Background: </span>
      <div className="flex space-x-2 ml-2">
        {colors.map((color, index) => {
          // Ensure style is always a valid object with a consistent default
          const style = color.value ? { backgroundColor: color.value } : { backgroundColor: 'transparent' };

          return (
            <div
              key={index}
              onClick={() => onChange(color.value)}
              className={`w-6 h-6 rounded-full cursor-pointer border ${
                selectmultiplecolor === color.value ? 'border-black' : 'border-gray-300'
              }`}
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorPickers;
