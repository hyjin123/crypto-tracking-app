import React from 'react';
import "./portfolio.css";

const Coin = (props) => {
  const { name, symbol, image, handleAddCoin, userId, holdings } = props;

  const holdingNames = [];
  for (const holding of props.holdings) {
    holdingNames.push(holding.name)
  }
  
  // if any of the holding names match the coin name, disable the add button so no duplicates
  let matched = false;
  if (holdingNames.includes(name)) {
    matched = true;
  }

  return (
    <div className='coin'>
      <img src={image} alt='crypto' />
      <h1>{`${name} (${symbol})`}</h1>
      {matched ? <button disabled onClick={() => handleAddCoin(name, userId)} className="coin-btn-disabled">Add</button> :
      <button onClick={() => handleAddCoin(name, userId)} className="add-coin-btn">Add</button>}
  </div>
  );
};

export default Coin;