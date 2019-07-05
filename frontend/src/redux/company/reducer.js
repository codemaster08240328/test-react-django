import actions from './actions';
import Immutable from 'seamless-immutable';

const initState = Immutable({
  success: null,
  companies: [],
  message: null,
  loading: null,
})

export default function companyReducer(state=initState, {type, payload}){
  switch(type){
    case actions.GET_COMPANY_LIST:
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
        companies: payload,
        message: null,
        loading: false
      }

    case actions.GET_ERROR:
      return {
        ...state,
        success: false,
        companies: [],
        message: payload,
        loading: false
      }

    default:
      return state
  }
}
