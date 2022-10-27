import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { Box, Collapse, Divider, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { MtgPaletteDefault } from "../MtgPalette"
import { MtgText } from "../MtgText"
import { MtgCardArt } from "./MtgCardArt"
import { MtgCardData } from "./MtgCardData"
 
interface MtgCardProps{
    card:MtgCardData
}

export const MtgCardDisplay = ({card}:MtgCardProps)=>{

    const [expanded, setExpanded] = useState(false);

    const palette = MtgPaletteDefault;

    const handleExpand = ()=>{
        setExpanded(true);
    }

    const handleCollapse = ()=>{
        setExpanded(false);
    }

    const backgroundColor = 
        card?.color_identity?.length === 0
            ? palette.colors.C.background
            : card?.color_identity?.length === 1
                ? palette.colors[card.color_identity[0]].background
                : palette.colors.M.background


    const buttonStyles = {
        backgroundColor:{backgroundColor}, 
        borderRadius:'0 50% 50% 0',
        gridRows:'1 / 3',
        fill:'black',
        alignSelf:'end',
        width:'40px',
        height:'40px',
        '&:hover':{
            backgroundColor:{backgroundColor},
            backgroundImage:'radial-gradient(circle farthest-side at right, rgba(255,255,255,0.25),rgba(255,255,255,0.1 ))',
            fill:'white'
        }
    }

    const collapseStyles = {
        display:'grid', 
        gridTemplateColumns:'minmax(66%,calc(100% - 150px)) minmax(auto,150px)', 
        gap:'5px',
        backgroundColor:{backgroundColor}, 
        p:'5px',
        alignItems:'center'
    }

    return(
        <Box sx={{display:'grid', gridTemplateColumns:'auto 40px', width:'100%'}}>

            {/** SUMMARY */}
            <Box sx={{display:'grid', gridTemplateColumns:'4fr 1fr', textAlign:'left', backgroundColor:{backgroundColor}, p:'5px', gridRow:'1'}}>
                <Typography variant='subtitle1'>{`${card.name} (${card.set})`}</Typography>
                <MtgText sx={{textAlign:'right'}} shadow text={card.mana_cost? card.mana_cost : card.card_faces? card.card_faces[0].mana_cost : ' '}/>
                
                <Typography variant = 'subtitle2'>{card.type_line}</Typography>
                <Typography variant = 'subtitle2' sx={{textAlign:'right'}}>
                    {
                        card.card_faces
                        ? `${card.card_faces[0].power}/${card.card_faces[0].toughness} // 
                           ${card.card_faces[1].power}/${card.card_faces[1].toughness}`
                        : card.power
                            ? `${card.power}/${card.toughness}` 
                            : card.loyalty
                                ? `Loyalty:${card.loyalty}` 
                                : ''
                    }
                </Typography>
            </Box>

            {/** EXPAND/COLLAPSE BUTTONS */}
            <Box sx={{alignSelf:'end', gridRow:'1 / 3'}}>
                { !expanded &&
                    <IconButton  onClick={handleExpand}  sx={buttonStyles}>
                        <ExpandMore sx={{fill:'inherit'}}/>
                    </IconButton>
                }{ expanded &&
                    <IconButton  onClick={handleCollapse}  sx={buttonStyles}>
                        <ExpandLess sx={{fill:'inherit'}}/>
                    </IconButton>
                }
            </Box>
            {/** DETAILS */}
            <Collapse in={expanded} sx={{width:'100%'}}>
                { card.card_faces && !card.image_uris &&
                    <Box sx={collapseStyles}>
                        <MtgText text={card.card_faces[0].oracle_text}/>
                        <MtgCardArt src={card.card_faces[0].image_uris?.art_crop!} artist={card.card_faces[0].artist!}/>
                        <MtgText text={card.card_faces[1].oracle_text}/>
                        <MtgCardArt src={card.card_faces[1].image_uris?.art_crop!} artist={card.card_faces[1].artist!}/>
                    </Box>
                }{ !card.card_faces &&
                    <Box sx={collapseStyles}>
                        <MtgText text={card.oracle_text}/>
                        <MtgCardArt src={card.image_uris?.art_crop} artist={card.artist!}/>
                    </Box>
                }{ card.card_faces && card.image_uris &&
                    <Box sx={collapseStyles}>
                        <Box>
                            <MtgText text={card.card_faces[0].oracle_text}/>
                            <Divider/>
                            <MtgText text={card.card_faces[1].oracle_text}/>
                        </Box>
                        <MtgCardArt src={card.image_uris?.art_crop} artist={card.artist!}/>
                    </Box>
                }
            </Collapse>

        </Box>
    )
}