import { AppBar, Box, Container, Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import logoImage from './images/aroopa.jfif';

export default function Navbar() {

   
  return (
    <div>
      <>
        <AppBar position='static'>
            <Container>
            <Toolbar className='flex justify-between  text-white'>
            <img src={logoImage} alt="AROOPA INTERNS Logo" width="40" height="40" />
                <Typography className=' text-white pr-[45%]  ' variant='h5'>
                  INTERN's HUB
                </Typography>
                <Box className='flex  items-center gap-[]   text-white'>
                    <NavLink className=' text-white hover:opacity-70 active:bg-blue-700 p-5 rounded-sm ' to='/'  >Dashboard</NavLink>
                    <NavLink className=' text-white hover:opacity-70 active:bg-blue-700 p-5 rounded-sm' to='about'>Interns</NavLink>
                    <NavLink className=' text-white hover:opacity-70 active:bg-blue-700 p-5 rounded-sm' to='contact'>Status</NavLink>
                </Box>
            </Toolbar>
            </Container>
        </AppBar>
      </>
    </div>
  )
}
