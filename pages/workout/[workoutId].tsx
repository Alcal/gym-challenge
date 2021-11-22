import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import EventIcon from '@mui/icons-material/Event';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import {
  WorkoutContainer,
  WorkoutVideo,
  CategoryLink,
} from '../../components/Workout.styled'
import {
  getWorkoutById,
  selectCurrentWorkout,
} from '../../state/reducers/workouts'
import styles from '../../styles/Home.module.css'

const Workout = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const workout = useSelector(selectCurrentWorkout)
  const date = new Date(workout.startDate)
  useEffect(() => {
    if(!router.isReady) return
    const { query: { workoutId } } = router
    dispatch(getWorkoutById(workoutId))
  }, [router.isReady])

  return <div className={styles.container}>
    <WorkoutContainer>
      <Card sx={{
        width: '100%',
        height: '100%',
      }}>
        <CardMedia sx={{ height: '30rem'}}> 
          <WorkoutVideo controls src={workout.videoUrl} poster={workout.thumbnailUrl} />
        </CardMedia>
        <CardContent>
          <Grid container columns={8} spacing={1} direction="row">
            <Grid item xs={2}>
              <Paper sx={{ height: '100%', padding: '1rem'}}>
                <Box sx={{ paddingY: '0.5rem'}}>
                  <EventIcon color="primary" fontSize="small" sx={{marginRight: '1rem'}}/>
                  <Typography variant="body2" component="span">
                    {`Starts on: ${date.toLocaleString('default', { month: 'long', day: 'numeric' })}`}
                  </Typography>
                </Box>
                <Box sx={{ paddingY: '0.5rem'}}>
                  <FitnessCenterIcon color={workout.category} fontSize="small" sx={{marginRight: '1rem'}}/>
                  <Typography variant="body2" component="span">
                    {`Category: ${workout.category?.toUpperCase()}`}
                  </Typography>
                </Box>
                <Box sx={{ paddingY: '0.5rem'}}>
                  <TimerIcon color="secondary" fontSize="small" sx={{marginRight: '1rem'}}/>
                  <Typography variant="body2" component="span">
                    {`Duration: ${Math.round(workout.duration/60)}min`}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper sx={{ padding: '1rem'}}>
                <Typography gutterBottom variant="h4" component="div">
                  {workout.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {workout.teaser}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {workout.description}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{justifyContent:'end', gap: '2rem', paddingX:'2rem'}}>
          <CategoryLink
            variant="button"
            component="button"
            category={workout.category || 'primary' }
            onClick={() => {
              router.push({
                pathname: '/',
                query: {
                  categories: workout.category
                }
              })
            }}
            >  
            {`Other workouts in the ${workout.category} category`}
          </CategoryLink>
          <Link
            variant="button"
            component="button"
            color="secondary"
            onClick={() => {
              router.push({
                pathname: '/',
                query: {
                  monthIndex: date.getMonth()
                }
              })
            }}
            >
            {`Other workouts on the month of ${date.toLocaleString('default', { month: 'long' })}`}
          </Link>
      </CardActions>
    </Card>
    </WorkoutContainer>
  </div>
}

export default Workout