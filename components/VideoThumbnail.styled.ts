import { styled, alpha } from '@mui/system';

interface IVideoInfoProps {
  variant: string
  theme?: any
}

export const SubtitleContainer = styled('div')`
  height: 0;
  overflow: hidden;
  transition: 0.2s;
`

export const VideoInfo = styled('div')(({ theme, variant }: IVideoInfoProps) => (`
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1rem;
  position: absolute;
  width: 100%;
  height: fit-content;
  bottom: 0;
  left: 0;
  color: ${theme.palette.grey['50']};
  background-color: ${theme.palette[variant].main};
  &:hover {
    & div:nth-child(2) {
      height: 3rem;
    }
  }
`))