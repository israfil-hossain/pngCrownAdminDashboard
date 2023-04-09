import { Box,} from '@mui/material'
import React from 'react'

const PackageBreadcrumb = ({children}) => {
  return (
    <Box sx={{
        height: 50,
        padding:2,
        borderRadius:"8px",
        color:'white',
        textAlign:"center",
        justifyContent:"center",
        marginTop:"25px",
        marginBottom:"20px",
        backgroundColor: '#eeedf0',
        '&:hover': {
          backgroundColor: '#f2edf7',
        },
    }}>
        {children}
    </Box>
  )
}

export default PackageBreadcrumb