import axios from 'axios';
import {apiUrl} from "../../services/authService";

export const Types = {
  SET_ITEMS: 'dish@SET:ITEMS',
  LOADING: 'dish@LOADING:START',
  LOADED: 'dish@LOADING:FINISH',
  ERROR: 'dish@LOADING:ERROR',
};

let timer = null;

const Actions = {
  setItems: payload => ({
    type: Types.SET_ITEMS,
    payload,
  }),
  fetchItems: ({ category }) => dispatch => {
    dispatch(Actions.isLoading);
    return axios
        .get(apiUrl.concat('/dish/get?category=').concat(category ? category: 'all'))
      .then(({ data }) => {
        dispatch(Actions.setItems(data));
      })
      .catch(err => {
        console.error(err);
        dispatch(Actions.isError(err));
      });
  },
  isLoading: {
    type: Types.LOADING,
  },
  isLoaded: {
    type: Types.LOADED,
  },
  isError: err => ({
    type: Types.ERROR,
    payload: err,
  }),
};

export default Actions;
