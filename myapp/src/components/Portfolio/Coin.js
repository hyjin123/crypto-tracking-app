import React from 'react';
import "./portfolio.css";

const Coin = (props) => {
  const { name, symbol, image, handleAddCoin, userId } = props;

  return (
    <div className='coin'>
      <img src={image} alt='crypto' />
      <h1>{`${name} (${symbol})`}</h1>
      <button onClick={() => handleAddCoin(name, userId)}>Add</button>
  </div>
  );
};

export default Coin;