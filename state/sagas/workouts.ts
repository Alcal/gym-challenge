import { takeEvery, put } from 'redux-saga/effects'
import {
  getWorkouts as getWorkoutsAction,
  getWorkoutById as getWorkoutByIdAction,
  getWorkoutsSuccess,
  getWorkoutsFail,
  getWorkoutByIdSuccess,
  getWorkoutByIdFail,
} from '../reducers/workouts'
import { getWorkouts, getWorkoutById } from '../../services/gymondo'

function* fetchWorkouts({ payload }) {
  try {
    const { page, pageSize, month, categories } = payload
    const query = {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      month,
      categories,
    }
    const data = yield getWorkouts(query)
    yield put(getWorkoutsSuccess(data))
  } catch(e) {
    yield put(getWorkoutsFail(e))
  }
}

function* fetchWorkoutById({ payload }) {
  try {
    const data = yield getWorkoutById(payload)
    yield put(getWorkoutByIdSuccess(data))
  } catch(e) {
    yield put(getWorkoutByIdFail(e))
  }
}

function* watchGetWorkouts() {
  yield takeEvery(getWorkoutsAction, fetchWorkouts)
}

function* watchGetWorkoutById() {
  yield takeEvery(getWorkoutByIdAction, fetchWorkoutById)
}

export {
  watchGetWorkouts,
  watchGetWorkoutById,
}