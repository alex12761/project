import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from '../';

import './DishBlock.scss';

const DishBlock = ({ id, image, title, price, cartItems, onAdd, isLoading }) => {
  const addedCount = cartItems[id] ? cartItems[id].length : 0;

  const [type, setType] = React.useState(0);

  const onAddClick = () => {
    const obj = {
      id,
      type,
      price,
    };
    if (onAdd) {
      onAdd(obj);
    }
  };
  let tempo = 'data:image/png;base64,'.concat(image);
  // console.log(tempo)
  return (
    <div className={classNames('dish-block', { 'dish-block--loading': isLoading })}>
      <div className="dish-block__image">
        <img src={tempo} alt="dish" />
      </div>
      <h4 className="dish-block__title">{title}</h4>
      <div className="dish-block__bottom">
        <div className="dish-block__price">от {price} ₽</div>
        <Button onClick={onAddClick} className="button--add" outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"></path>
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </Button>
      </div>
    </div>
  );
};

DishBlock.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.number),
  price: PropTypes.number,
  cartItems: PropTypes.object,
  onAdd: PropTypes.func,
  isLoading: PropTypes.bool,
};

DishBlock.defaultProps = {
  addedToCart: 0,
  price: 0,
  types: [],
  name: '',
  imageUrl: '',
  id: 0,
  cartItems: {},
};

export default DishBlock;
