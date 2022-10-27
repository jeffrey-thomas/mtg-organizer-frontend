import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Box, Collapse, Divider, IconButton, useTheme } from "@mui/material"
import { useState } from "react"
import { MtgPaletteDefault } from "../MtgPalette"
import { MtgText } from "../MtgText"
import { MtgCardData } from "./MtgCardData"

interface MtgCardProps{
    card:MtgCardData
}

export const MtgCardO = ({card}:MtgCardProps)=>{

    const [expanded, setExpanded] = useState(false);

    const palette = MtgPaletteDefault;
    const theme = useTheme();

    const handleExpand = ()=>{
        setExpanded(true);
    }

    const handleCollapse = ()=>{
        setExpanded(false);
    }

    const getCardColor=(index:number)=>{
        return palette.colors[card.color_identity[index]].background;
    }

    const backgroundColor = 
        card.color_identity.length === 0
            ? palette.colors.C.background
            : card.color_identity.length === 1
                ? palette.colors[card.color_identity[0]].background
                : palette.colors.M.background

    const frameColors = 
        card.color_identity.length === 0
        ? [palette.colors.C.border]
        : card.color_identity.map((color)=>palette.colors[color].border)

    const frameGradients = ()=>{
        switch(card.color_identity.length){
            case 2: 
                return `, linear-gradient(to right, ${frameColors[0]}, ${frameColors[1]})`;
            case 3: 
                return `, linear-gradient(to right, ${frameColors[0]}, ${frameColors[1]}, ${frameColors[2]})`;
            case 4: 
                return `, linear-gradient(to right, ${frameColors[0]}, ${frameColors[1]}, ${frameColors[2]}, ${frameColors[3]})`
            case 5:
                return `, linear-gradient(to right, ${frameColors[0]}, ${frameColors[1]}, ${frameColors[2]}, ${frameColors[3]}, ${frameColors[4]})`
        }
    } 

    const styles = {
        display:'flex',
        flexDirection:'row',
        alignItems:'end',
        border:'2px solid black',
        borderRadius:'10px',
        p:'2px',
        backgroundColor:`${frameColors[0]}`,
        backgroundImage:`radial-gradient(circle farthest-side at top left, rgba(255,255,255,0.35), rgba(255,255,255,0)) ${frameGradients()}`,
        width:'750px',

        '& .innerFrame' : {
            display:'grid', 
            gridTemplateColumns:'2fr 1fr',
            gap:'6px',
            alignItems:'center',
            border:'2px solid black',
            borderRadius:'8px',
            p:'6px',
            width:'100%',
            backgroundColor: backgroundColor,
            backgroundImage:'radial-gradient(circle farthest-side at top left, rgba(0,0,0,0),rgba(0,0,0,0.25))'
        },
        '& img':{
            width:'100%'
        },
        '& .MuiCollapse-root':{
            gridColumn:'1 / 3'
        }
    }
  

    return(
        <Box sx={styles} className='outerFrame'>
            <Box className='innerFrame'>
                <h3>{card.name}</h3>
                <Box sx={{textAlign:'right'}}>
                    <h3><MtgText shadow text={card.mana_cost? card.mana_cost : card.card_faces ? card.card_faces[0].mana_cost : ''}/></h3>
                </Box>
                <h4>{card.type_line}</h4>
                <Box sx={{textAlign:'right'}}>
                    <h3>{card.power? `${card.power}/${card.toughness}`: card.loyalty? `Loyalty: ${card.loyalty}` : ''}</h3>
                </Box>
                <Collapse in={expanded} >
                    
                        {
                            card.card_faces
                                ? card.card_faces.map(
                                    (face, index)=>
                                <Box key={face.name}>
                                {index > 0 && <Divider/>}
                                <Box  sx={{display:'grid', gridTemplateColumns:'2fr 1fr', alignItems:'center', gap:'6px',my:'6px'}}>
                                    
                                    <Box>
                                        <MtgText text={face.oracle_text}/>
                                        <br/>
                                        <h3>{`${face.power}/${face.toughness}`}</h3>
                                    </Box>
                                    <Box sx={{ backgroundColor:'rgba(0,0,0,0.5)', color:'white', borderRadius:'4px', textAlign:'center'}}>
                                        <img src={face.image_uris?.art_crop}/>
                                        {face.artist}
                                    </Box>
                                </Box>
                                </Box>
                                )
                                :<Box sx={{display:'grid', gridTemplateColumns:'2fr 1fr', alignItems:'center', gap:'6px'}}>
                                    <MtgText text={card.oracle_text}/>
                                    <Box sx={{ backgroundColor:'rgba(0,0,0,0.5)', color:'white', borderRadius:'4px', textAlign:'center'}}>
                                        <img src={card.image_uris?.art_crop}/>
                                        {card.artist}
                                    </Box>
                                </Box>
                        }
                    
                    
                </Collapse>
                
            </Box>

            <Box sx={{width:'40px'}}>
            { !expanded &&
            <IconButton onClick={handleExpand}>
                <ExpandMore sx={{fill:'white'}}/>
            </IconButton>
            }
            { expanded &&
            <IconButton onClick={handleCollapse}>
                <ExpandLess sx={{fill:'white'}}/>
            </IconButton>
            }
            </Box>
        </Box>
    )
}