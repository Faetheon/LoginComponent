import React from 'react';

const Item = (props) => (
  <div className='item'>
    <img className='item-image' src={props.data.image_url} />
    <div className='item-desc'><a href={props.data.purchase_url}>{props.data.short_desc}</a></div>
    <div className='item-rating'>{props.data.rating} out of 5 stars</div><div className='item-reviews'>With {props.data.reviews} reviews</div>
    <div className='item-price'>${props.data.price}</div>
  </div>
);

export default Item;