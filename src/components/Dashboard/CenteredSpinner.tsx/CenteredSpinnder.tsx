import { Box, CircularProgress } from "@mui/material"

export const CenteredSpinner = ()=>{
    return(
        <Box sx={{height:'100%', display:'flex',alignItems:'center', justifyContent:'center'}}>
            <CircularProgress/>
        </Box>
                    
    )
}