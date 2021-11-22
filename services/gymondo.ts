import axios from 'axios'
// import qs from 'querystring'

const PAGINATION_SIZE = 20

const instance = axios.create({
  baseURL: 'https://qfzfsavm54.execute-api.us-east-1.amazonaws.com/',
  timeout: 3000,
  headers: {}
});

export const getWorkouts = async ({
  offset = 0,
  limit = PAGINATION_SIZE,
  month = new Date().getMonth(),
  categories = [],
}) => {
  try {
    const params = {
      limit, offset, month, categories
    }
    const { data } = await instance.get('workouts', { params })
    return data
  } catch (e) {
    return new Error(e)
  }
}

export const getWorkoutById = async (id: string) => {
  try {
    const { data } = await instance.get(`workouts/${id}`)
    return data
  } catch (e) {
    return new Error(e)
  }
}