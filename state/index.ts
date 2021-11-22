import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import workoutsReducer from './reducers/workouts'
import {watchGetWorkouts, watchGetWorkoutById } from './sagas/workouts'

const rootReducer = {
	workouts: workoutsReducer
}
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(watchGetWorkouts)
sagaMiddleware.run(watchGetWorkoutById)

export default store