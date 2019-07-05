import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import * as services from '../../helpers/services';
import actions from './actions';

export function* getCompanyList() {
  yield takeEvery(actions.GET_COMPANY_LIST, function*({payload}) {
    const result = yield call(services.getCompanyList)
    if(result && !result.error) {
      yield put({
        type: actions.GET_SUCCESS,
        payload: result.data
      })
    } else {
      yield put({
        type: actions.GET_ERROR,
        payload: result.error
      })
    }

  })
}

export default function* rootSaga() {
  yield all([
    fork(getCompanyList),
  ])
}
