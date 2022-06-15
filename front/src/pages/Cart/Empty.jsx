import React from 'react';
import { Link } from 'react-router-dom';
import CartEmptyImg from '../../assets/img/empty-cart.png';

const Empty = () => {
  return (
    <React.Fragment>
      <h2>
        Корзина пустая <icon>😕</icon>
      </h2>
      <p>
        Вероятней всего, вы не выбрали блюда.
        <br />
        Для того, чтобы заказать доставку, перейди в меню.
      </p>
      <img src={CartEmptyImg} alt="Empty cart" />
      <Link to="/menu" class="button button--black">
        <span>Перейти в меню</span>
      </Link>
    </React.Fragment>
  );
};

export default Empty;
