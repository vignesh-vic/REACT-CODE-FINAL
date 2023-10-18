import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export default function LayoutRouter() {
  return (
    <>
      <Navbar/>

        <Outlet/>
    
    </>
  )
}
