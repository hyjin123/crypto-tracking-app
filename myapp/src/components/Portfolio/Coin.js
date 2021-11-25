import React from 'react';
import "./portfolio.css";

const Coin = (props) => {
  const { name, symbol, image, handleAddCoin, userId, holdings } = props;

  const holdingNames = [];
  for (const holding of props.holdings) {
    holdingNames.push(holding.name)
  }

  let matched = false;
  if (holdingNames.includes(name)) {
    matched = true;
  }

  console.log(matched)
  return (
    <div className='coin'>
      <img src={image} alt='crypto' />
      <h1>{`${name} (${symbol})`}</h1>
      {matched ? <button disabled onClick={() => handleAddCoin(name, userId)}>Add</button> :
      <button onClick={() => handleAddCoin(name, userId)}>Add</button>}
  </div>
  );
};

export default Coin;