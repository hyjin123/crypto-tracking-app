import React from 'react';
import "./portfolio.css";

const Coin = (props) => {
  const { name, symbol, image } = props;

  return (
    <div className='coin'>
      <img src={image} alt='crypto' />
      <h1>{`${name} (${symbol})`}</h1>
      <button>Add</button>
  </div>
  );
};

export default Coin;