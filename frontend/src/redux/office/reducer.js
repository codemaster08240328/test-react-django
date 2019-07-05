import actions from './actions';
import Immutable from 'seamless-immutable';

const initState = Immutable({
  success: null,
  offices: [],
  message: null,
  loading: null,
})

export default function officeReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.GET_OFFICE_LIST:
      return {
        ...state,
        success: null,
        message: null,
        loading: true
      }

    case actions.GET_SUCCESS:
      return {
        ...state,
        success: true,
        offices: payload,
        message: null,
        loading: false
      }

    case actions.GET_ERROR:
      return {
        ...state,
        success: false,
        offices: [],
        message: payload,
        loading: false
      }

    default:
      return state
  }
}
