import { Box, SvgIcon } from "@mui/material"

import { MtgSymbolSvgs } from "./MtgSymbolSvgs";
import { MtgSymbolElements as SymbolInfo } from "./MtgSymbolElements";
import { MtgSymbolId } from "./MtgSymbolId";
import { MtgPaletteDefault } from "../MtgPalette";

interface MtgSymbolProps{
    id:MtgSymbolId,
    shadow?:boolean,
}

export const MtgSymbol = ({id, shadow = false}:MtgSymbolProps)=>{

    const svgIds = SymbolInfo[id].svgIds;
    const colorIds = SymbolInfo[id].colorIds;

    const palette = MtgPaletteDefault

    const isHalf = id[0]==='H'

    const styles = {
        display:'inline-block',
        verticalAlign:'middle',
        position:'relative',
        width: 
            id==='100'
                ? '1.56875em' 
                : id==='1000000'
                    ? '3.8em'
                    : isHalf
                        ? '0.5em'
                        :'1em', 
        height:'1em', 
        margin:'0.1em',
        borderRadius: 
            isHalf
            ? '0 1em 1em 0'
            :'1em',
        background:
            colorIds[1]
            ? `linear-gradient(
                135DEG,
                ${palette.colors[colorIds[0]].circle} 0%, 
                ${palette.colors[colorIds[0]].circle} 50%,
                ${palette.colors[colorIds[1]].circle} 50%)
            `
            :id==='Q' ? `${[palette.symbol]}` :`${palette.colors[colorIds[0]].circle}`,
        boxShadow: shadow ? '-0.06em 0.07em 0 #111, 0 0.06em 0 #111' : ''
    }
    

    return (
        <Box key={ id } sx={ styles }>
            {
                //Handle Symbols with 2 svg images
                svgIds.length === 2
                ?<>
                    <SvgIcon 
                        viewBox='0 0 32 32' 
                        fontSize='inherit' 
                        sx={{
                            position:'absolute', 
                            top:'0.14em', 
                            left:'0.14em', 
                            width:'40%', 
                            height:'40%', 
                            fill:`${palette.symbol}`
                        }}
                    >
                        {MtgSymbolSvgs.path(svgIds[0])}
                    </SvgIcon>

                    <SvgIcon 
                        viewBox='0 0 32 32' 
                        fontSize='inherit' 
                        sx={{
                            position:'absolute', 
                            top:'0.47em', 
                            left:'0.47em', 
                            width:'40%', 
                            height:'40%', 
                            fill:`${palette.symbol}`
                        }}
                    >
                        {MtgSymbolSvgs.path(svgIds[1])}
                    </SvgIcon>
                </>

                //Handle symbols with 1 svg
                :<SvgIcon 
                    viewBox={
                        id==='100'
                            ?'0 0 58 32'
                            : id==='1000000'
                                ? '0 0 160 32'
                                : id[0]==='H'
                                    ?'16 0 32 32'
                                    :'0 0 32 32'} 
                    fontSize='inherit' 
                    sx={{
                        position:'absolute', 
                        top:'0.15em', 
                        left: isHalf? '0' :'0.15em', 
                        width:'auto', 
                        height:'0.7em', 
                        fill:id==='Q'? `#ffffff` : `${palette.symbol}`
                                        }}
                >
                    {MtgSymbolSvgs.path(svgIds[0])}
                </SvgIcon>
            }
        </Box>
    )
}
