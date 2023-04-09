import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export const CommonProgress = () => {
  return (
    <Box sx={{display:"flex", alignItems: "center",background:"white",opacity:0.9, justifyContent:"center",borderRadius:"8px",height:"60vh"}}>
        <CircularProgress size={70} color="secondary"/> 
    </Box>
  )
}


