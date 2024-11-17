import React from 'react';

const Arrows = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundColor: '#2fcb00',
        color: 'white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        border: '2px solid #fff',
      }}
      onClick={onClick}
    />
  );
};

export default Arrows;
