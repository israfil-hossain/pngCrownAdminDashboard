
// Create a Custom Button For All Project ..............

import React from 'react'
import Button from '@mui/material/Button';


const PackageButton = ({color,text,variant}) => {
  return (
        <Button 
            sx={{
                color:"white",
                variant:`${variant}`,
               
                backgroundColor: `${color}`,
                '&:hover': {
                  backgroundColor: "#0bb348",
                },
                fontWeight:"500",
                fontSize:"15px",
                width:"100px",
                height:"30px"
              }} 
        >
            {text}
        </Button>
  )
}

export default PackageButton