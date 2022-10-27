import { Box, Typography } from "@mui/material"

const style={
    backgroundColor:'rgba(0,0,0,0.5)', 
    color:'white', 
    borderRadius:'5px', 
    textAlign:'center',
    width:'100%',
    maxWidth:'150px',
    '& img':{ width:'100%'}
}

interface MtgCardArtProps{
    src:string,
    artist:string
}

export const MtgCardArt = ({src, artist}:MtgCardArtProps)=>{
    return (
        <Box sx={style}>
            <img src={src} alt={`card art by ${artist}`}/>
            <Typography variant='body2'>{artist}</Typography>
        </Box>
    )
}