import { Box, SxProps, Typography } from "@mui/material";
import { MtgSymbolId } from "./MtgSymbols/MtgSymbolId";
import { MtgSymbol } from "./MtgSymbols/MtgSymbol";

interface MtgTextProps{
    text?:string,
    shadow?:boolean,
    sx?:SxProps
}

export const MtgText = ({sx={},text,shadow=false}:MtgTextProps)=>{
    
    if(!text)
        return null;
    
    const subtexts = text.split(/[{}]/);
    const results = subtexts.map((value:string, index: number)=>{
        if(MtgSymbolId.isValid(value))
            return <MtgSymbol key={index+"-"+value} id={value} shadow={shadow}/>
        else
            return <Typography key={index+"-"+value}sx={{display:'inline'}} variant='body1'>{value}</Typography>
    });

    return (
        <Box sx={{...sx, whiteSpace:"pre-line"}}>
            {results}
        </Box>
    );
}