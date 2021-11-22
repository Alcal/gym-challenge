import { Reducer, createSlice } from '@reduxjs/toolkit'

const PAGE_SIZE = 20

enum EWorkoutCategory {
  c1 = 'c1',
  c2 = 'c2',
  c3 = 'c3',
  c4 = 'c4',
  c5 = 'c5',
  c6 = 'c6',
  c7 = 'c7',
}

interface IWorkoutEntry {
  _id?: string
  title?: string
  teaser?: string
  videoUrl?: string
  thumbnailUrl?: string
  duration?: number
  description?: string
  startDate?: Date
  category?: EWorkoutCategory
}

interface IWorkoutState {
  workoutData: IWorkoutEntry[]
  currentWorkout: IWorkoutEntry
  isLoading: boolean
  totalCount: number
  pageSize: number
  allCategories: string[]
  query: {
    categories: EWorkoutCategory[]
    page: number
    month: number
  }
}

const initialState: IWorkoutState = {
  workoutData: [],
  currentWorkout: {},
  isLoading: false,
  allCategories: ['c1','c2','c3','c4','c5','c6','c7'],
  totalCount: 0,
  pageSize: PAGE_SIZE,
  query: {
    month: new Date().getMonth(),
    page: 1,
    categories: [],
  },
}

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    getWorkouts: (state, query) => {
      state.isLoading = true
    },
    getWorkoutsSuccess: (state, { payload }) => {
      state.workoutData = payload.items
      state.totalCount = payload.count
      state.isLoading = false
    },
    getWorkoutsFail: (state, error) => {
      state.isLoading = false
    },
    getWorkoutById: (state, query) => {
      state.isLoading = true
    },
    getWorkoutByIdSuccess: (state, { payload }) => {
      const { currentWorkout } = state
      state.currentWorkout = { ...currentWorkout, ...payload }
      state.isLoading = false
    },
    getWorkoutByIdFail: (state, error) => {
      state.isLoading = false
    },
    setCurrentWorkout: (state, { payload: id }) => {
      state.currentWorkout = {
        ...state.workoutData.find(({ _id }) => id === _id)
      }
    },
    setCategories: (state, { payload }) => {
      const { query: { categories }} = state
      categories.includes(payload) ?
        categories.splice(categories.indexOf(payload), 1) :
        categories.push(payload)
      state.query = {...state.query, categories: [...categories]}
    },
    setQuery: (state, { payload }) => {
      const { query } = state
      state.query = { ...query, ...payload }
    },
  }
})
export const selectWorkoutData = ({ workouts }: { workouts: IWorkoutState}) =>
  workouts.workoutData
export const selectAllCategories = ({ workouts }: { workouts: IWorkoutState }) =>
  workouts.allCategories
export const selectCategories = ({ workouts }: { workouts: IWorkoutState}) => 
  workouts.query.categories
export const selectQuery = ({ workouts }: { workouts: IWorkoutState}) => 
  workouts.query
export const selectMonth = ({ workouts }: { workouts: IWorkoutState}) =>
  workouts.query.month
export const selectCurrentWorkout = ({ workouts } : { workouts: IWorkoutState }) =>
  workouts.currentWorkout
export const selectPaginationData = ({ workouts }: { workouts: IWorkoutState}) => ({
  count: Math.ceil(workouts.totalCount / workouts.pageSize),
  page: workouts.query.page,
  pageSize: workouts.pageSize,
  showPagination: workouts.totalCount > workouts.pageSize
})
export const selectIsLoading = ({ workouts }: { workouts: IWorkoutState}) => 
  workouts.isLoading

export const {
  getWorkouts,
  getWorkoutsSuccess,
  getWorkoutsFail,
  getWorkoutById,
  getWorkoutByIdSuccess,
  getWorkoutByIdFail,
  setQuery,
  setCategories,
  setCurrentWorkout,
} = workoutSlice.actions

export default workoutSlice.reducer