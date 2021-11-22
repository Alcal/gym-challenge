import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TimerIcon from '@mui/icons-material/Timer';
import Image from 'next/image'
import { VideoInfo, SubtitleContainer } from './VideoThumbnail.styled'
import { shimmerBlobURL } from '../utils'

interface IVideoThumbnailProps {
  duration: number
  thumbnailUrl: string
  title: string
  subTitle: string
  variant?: string
  onClick(): void
}

const VideoThumbnail = ({ duration, thumbnailUrl, title, subTitle, onClick, variant }: IVideoThumbnailProps) => {
  return (
    <Card sx={{
        minWidth: '20rem',
        height: '15rem',
        position: 'relative',
        flexGrow: 1,
        transition: '0.2s',
        boxShadow: 3,
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: 8,
        }
      }}
      onClick={onClick}
    >
      <Image
        src={thumbnailUrl}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={shimmerBlobURL(700, 475)}
      />
      <VideoInfo variant={variant}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <SubtitleContainer>
          <Typography variant="body1" component="div">
            {subTitle}
          </Typography>
        </SubtitleContainer>
        <Typography variant="body1" component="div">
          <TimerIcon fontSize="small" />
          {`${Math.floor(duration/60)}min`}
        </Typography>
      </VideoInfo>
    </Card>
  )
}

export default VideoThumbnail