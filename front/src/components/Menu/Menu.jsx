import React from 'react';
import classNames from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import '../../scss/index.scss'

import {DishBlock, Categories} from '../';
import {dishesActions, cartActions, filtersActions} from '../../redux/actions';

function Menu() {
    const dispatch = useDispatch();
    const [dishes, isLoading, cartItems, filters] = useSelector(state => [
        state.dishes.items,
        state.dishes.isLoading,
        state.cart.items,
        state.filters,
    ]);

    const addToCart = React.useCallback(obj => dispatch(cartActions.addToCart(obj)), [dispatch]);
    const selectCategory = React.useCallback(
        index => {
            dispatch(filtersActions.setCategory(index));
        },
        [dispatch],
    );

    React.useEffect(() => {
        dispatch(dishesActions.fetchItems(filters));
    }, [dispatch, filters]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="wrapper">
            {/*<div className="header">*/}
                <div className="container">
                    <React.Fragment>
                        <div className={classNames('content__top', {noclick: isLoading})}>
                            <Categories
                                activeItem={filters.category}
                                items={['Все', 'Супы', 'Выпечка', 'Салаты', 'Напитки', 'Горячие блюда']}
                                onClick={selectCategory}
                            />
                        </div>
                        {/*<h2 className="content__title">Все пиццы</h2>*/}
                        {console.log(dishes)}
                        <div className="content__items">
                            {dishes && !isLoading
                                ? dishes.map(item => (
                                    <DishBlock
                                        key={item.id}
                                        {...item}
                                        onAdd={addToCart}
                                        cartItems={cartItems}
                                        isLoading={isLoading}
                                    />
                                ))
                                : [...Array(8)].map((_, index) => <DishBlock key={index} isLoading={isLoading}/>)}
                        </div>
                    </React.Fragment>
                </div>
            {/*</div>*/}
        </div>
    );
}

export default Menu;
