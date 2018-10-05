import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../../Helpers/constantes'

const initialState = { repos: [], repoInfo: {}, user: {} };

export default function login(state = initialState, action){
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, repos: action.payload.data };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: 'Error access Yopo App' };
    default:
      return state;
  }
}