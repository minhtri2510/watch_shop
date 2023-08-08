import React from 'react';
import CardItem from './cardItem';

const ProductList = (props) => {
  return (
    <div className='container'>
      <div className='row'>
        {props.list.map((card) => (
          <div className='col-3 p-2' key={card.id}>
            <CardItem 
              item={card} 
              addToCart={props.addToCart}
              detail={props.detail}
              getItemToCart={props.getItemToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
