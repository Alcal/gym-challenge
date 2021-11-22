import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

interface ILayoutProps {
    children: any
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <AppBar sx={{
        height: '2.5rem',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'start',
        paddingX: '1rem',
      }}>
        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems:'center'}}>
          <Link href="/">
            <Image src="/logo.svg" alt="Gymondo logo" width={80} height={20}/>
          </Link>
        </Box>
      </AppBar>
      {children}
      <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/alejandro-castro-lopez/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Alejandro Castro
        </a>
      </footer>
    </>
  )
}

export default Layout