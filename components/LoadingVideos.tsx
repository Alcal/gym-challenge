import Box from '@mui/material/Box'

interface ILoadingVideosProps {
  length: number
}

const LoadingVideos = ({ length }) => (<>
  {[...new Array(length)].map((_, index) => (
    <Box
      key={index}
      sx={{
        minWidth: '20rem',
        height: '15rem',
        backgroundColor: '#f0f0f0',
        flexGrow: 1
      }}
    />
  ))}
</>)

export default LoadingVideos