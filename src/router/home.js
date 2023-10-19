import { Typography } from '@mui/material'
import React from 'react'
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export default function home() {

  return (
    <>
    <div className="text-left flex  p-10 ">
      <div className='mt-10 w-96 rounded-2xl'>
    <Card className='border rounded-lg' >
      <CardContent className='bg-red-400 h-[260px] rounded-2xl'>
        <Typography >
          Word of the Day
        </Typography>
        <Typography >
          well meaning and kindly.
          
        </Typography>
      </CardContent>
   
    </Card>
    </div>
      <div className='mt-10 w-96 pl-10 rounded-2xl'>
    <Card className='border rounded-lg' >
      <CardContent className='bg-green-400 h-[260px] rounded-2xl'>
        <Typography >
          Word of the Day
        </Typography>
        <Typography >
          well meaning and kindly.
          
        </Typography>
      </CardContent>
   
    </Card>
    </div>
 </div>
    </>
  )
}
