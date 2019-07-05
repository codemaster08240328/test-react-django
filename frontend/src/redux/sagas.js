import { all } from 'redux-saga/effects'
import companySaga from './company/saga'
import officeSaga from './office/saga'

export default function* rootSaga(getState) {
  yield all([companySaga(), officeSaga()])
}
