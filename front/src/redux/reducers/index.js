import { combineReducers } from 'redux';

import cart from './cart';
import dishes from './dishes';
import filters from './filters';

export default combineReducers({
  cart,
  dishes,
  filters,
});
