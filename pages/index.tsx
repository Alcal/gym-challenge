import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'
import {
  getWorkouts,
  selectQuery,
  selectMonth,
  selectIsLoading,
  selectCategories,
  selectWorkoutData,
  selectAllCategories,
  selectPaginationData,
  setCurrentWorkout,
  setCategories,
  setQuery,  
} from '../state/reducers/workouts'
import VideoThumbnail from '../components/VideoThumbnail'
import LoadingVideos from '../components/LoadingVideos'
import { VideoList } from '../components/Home.styled'
import MonthSelect from '../components/MonthSelect';
import CategorySelect from '../components/CategorySelect';
import styles from '../styles/Home.module.css'

const renderPagination = ({ setPage, count, page, show}) => (
  <Box sx={{height: '3rem'}}>
    {show &&
      <Pagination
        onChange={(e, value) => setPage(value)}
        count={count}
        page={page}
        sx={{
          marginX: 'auto',
          marginY: '1rem',
          width: 'fit-content',
        }}
        color="secondary"
      />
    }
  </Box>
)

const Home = () =>  {
  const dispatch = useDispatch()
  const query = useSelector(selectQuery)
  const month = useSelector(selectMonth)
  const categories = useSelector(selectCategories)
  const workoutData = useSelector(selectWorkoutData)
  const allCategories = useSelector(selectAllCategories)
  const paginationData = useSelector(selectPaginationData)
  const isLoading = useSelector(selectIsLoading)
  const router = useRouter()

  const goToWorkout = (id: string) => {
    dispatch(setCurrentWorkout(id))
    router.push({
      pathname: '/workout/[workoutId]',
      query: { workoutId: id },
    })
  }

  useEffect(() => {
    if(!router.isReady) return
    const {
      query: {
        page: queryPage = 1,
        monthIndex: queryMonth = month,
        categories: queryCategories = '',
      } = {}
    } = router
    const parsedMonth = parseInt(queryMonth.toString(), 10)
    const decodedCategories = Array.isArray(decodeURI(queryCategories.toString())) ?
      decodeURI(queryCategories.toString()) :
      [decodeURI(queryCategories.toString())]
    const newQuery = {
      page: parseInt(queryPage.toString(), 10) || paginationData.page,
      month: parsedMonth || parsedMonth === 0 ? parsedMonth : month,
      categories: queryCategories ? decodedCategories : []
    }
    dispatch(setQuery(newQuery))
  }, [router.isReady])

  useEffect(() => {
    dispatch(getWorkouts({
      page: query.page,
      pageSize: paginationData.pageSize,
      categories,
      month,
    }))
    router.push({
      pathname: '/',
      query: {
        page: encodeURI(paginationData.page.toString()),
        monthIndex: encodeURI((month).toString()),
        categories: encodeURI(categories.toString()),
      },
    },'', { shallow: true })
  },[query])

  return (
    <div className={styles.container}>
      <Typography variant="h3">
        Welcome to Gymondo*
      </Typography>
      <Typography variant="body1">
        Hello there, this is little test application for fetching and presenting some workout data. Feel free to play around with and do let the creator your thoughts on it.
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        * We're not really Gymondo
      </Typography>
      <Box sx={{display: 'flex', flexDirection:'row', alignItems:'center', gap: '0.5rem'}}>
        <Typography variant="subtitle2">
          Select Month:
        </Typography>
        <MonthSelect
          monthValue={month}
          onMonthChange={(monthValue) => dispatch(setQuery({ month: monthValue }))}
        />
        <Divider orientation="vertical" flexItem />
        <Typography variant="subtitle2">
          Filter by Categories:
        </Typography>
        <CategorySelect
          selectedCategories={categories}
          availableCategories={allCategories}
          onCategoryToggle={(category) => dispatch(setCategories(category))}
        />
      </Box>
      { renderPagination({
          setPage: (page) => dispatch(setQuery({ page })),
          count: paginationData.count,
          page: paginationData.page,
          show: paginationData.showPagination,
        })
      }
      {
        workoutData?.length && !isLoading ?
          <VideoList>
            {workoutData.map(({ thumbnailUrl, ['_id']: id, duration, title, teaser, category }) => (
              <VideoThumbnail
                key={id}
                thumbnailUrl={thumbnailUrl}
                duration={duration}
                title={title}
                subTitle={teaser}
                variant={category}
                onClick={() => goToWorkout(id)}
              />
            ))}
            {[...new Array(paginationData.pageSize - workoutData.length)].map(() => (
              <Box
                sx={{
                  minWidth: '20rem',
                  height: '15rem',
                  backgroundColor: '#f0f0f0',
                  flexGrow: 1
                }}
              />
            ))}
          </VideoList> :
          isLoading ? <LoadingVideos length={paginationData.pageSize} /> :
          <Box sx={{ width: '100%', height: '100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Typography variant="h6" fontSize="large" color="textSecondary">
              <SearchIcon />
              Your search yielded no results. Please try with different parameters.
            </Typography>
          </Box>
      }
      { renderPagination({
          setPage: (page) => dispatch(setQuery({ page })),
          count: paginationData.count,
          page: paginationData.page,
          show: paginationData.showPagination,
        })
      }
    </div>
  )
}

export default Home