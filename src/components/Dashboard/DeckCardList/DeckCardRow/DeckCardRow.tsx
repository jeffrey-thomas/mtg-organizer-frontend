import { KeyboardArrowLeft, KeyboardDoubleArrowLeft } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { Card } from "../../../../database"

import { useCollection } from "../../../../hooks/useCollection"
import { MtgCardData, MtgCardDisplay } from "../../../Mtg"
import { DashboardFunctions } from "../../DashboardFunctions"

interface DeckCardRowProps{
    card:Card
    data:MtgCardData
}

export const DeckCardRow = ({card, data}:DeckCardRowProps)=>{

    const dispatch = useDispatch()
    const {collection} = useCollection(dispatch)

    return (
        <Box sx={{display:'grid', gridTemplateColumns:'40px 40px 40px minmax(0, 1fr)', alignItems:'center', justifyContent:'center', width:'100%'}}>
            
            <Tooltip title='Move 4 Cards'>
            <IconButton 
                    sx={{width:'40px', height:'40px'}} 
                    onClick={()=>{DashboardFunctions.moveCard(card,collection.library_id,4)}}
                >
                    <KeyboardDoubleArrowLeft/>
                </IconButton>
            </Tooltip>  

            <Tooltip title='Move 1 Card'>
                <IconButton 
                    sx={{width:'40px', height:'40px'}} 
                    onClick={()=>{DashboardFunctions.moveCard(card, collection.library_id,1)}}
                >
                    <KeyboardArrowLeft/>
                </IconButton>
            </Tooltip>

            <Typography variant='subtitle1' sx={{p:'10px', textAlign:'center'}}>{card.qty}</Typography>  
            <MtgCardDisplay card={data}/>
        </Box>
    )
}