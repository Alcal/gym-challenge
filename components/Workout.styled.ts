import { styled, alpha } from '@mui/system';
import Link from '@mui/material/Link'
import type { LinkBaseProps } from '@mui/material/Link'

interface ICategoryLinkProps extends LinkBaseProps {
  category: string
}

export const WorkoutContainer = styled('div')(() => (`
  max-width: 70vw;
  min-width: 60rem;
  min-height: 80vh;
  margin-right: auto;
  margin-left: auto;
`))

export const WorkoutVideo = styled('video')(() => (`
  background: black;
  width:100%;
  height:100%;
`))

export const CategoryLink = styled(Link)((props: ICategoryLinkProps) => ({
  color: props.theme.palette[props.category].main,
  ...props
}))