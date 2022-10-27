import { Delete, KeyboardArrowRight, KeyboardDoubleArrowRight } from "@mui/icons-material"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { Card } from "../../../../database"
import { useSelectedDeck } from "../../../../hooks/useSelectedDeck"
import { MtgCardData, MtgCardDisplay } from "../../../Mtg"
import { DashboardFunctions } from "../../DashboardFunctions"

interface AvailableCardRowProps{
    card:Card,
    data:MtgCardData,
    deleteMethod:(card:Card)=>void
}

export const AvailableCardRow = ({card, data, deleteMethod}:AvailableCardRowProps)=>{

    const {selectedDeck} = useSelectedDeck()

    return (
        <Box sx={{display:'grid', gridTemplateColumns:'40px minmax(0, 1fr) 40px 40px 40px', alignItems:'center', justifyContent:'center', width:'100%'}}>
            <Typography variant='subtitle1' sx={{p:'10px', textAlign:'center'}}>{card.qty}</Typography>
            <MtgCardDisplay card={data}/>
            <Tooltip title='Remove Card'>
                <IconButton onClick={()=>deleteMethod(card)}>
                    <Delete/>    
                </IconButton>    
            </Tooltip>     
            <Tooltip title='Move 1 Card'>
                <span>
                    <IconButton 
                        onClick={()=>{DashboardFunctions.moveCard(card, selectedDeck,1)}}
                        disabled={selectedDeck===''}
                    >
                        <KeyboardArrowRight/>
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title='Move 4 Cards'>
                <span>
                    <IconButton 
                        onClick={()=>{DashboardFunctions.moveCard(card, selectedDeck,4)}}
                        disabled={selectedDeck===''}
                    >
                        <KeyboardDoubleArrowRight/>
                    </IconButton>
                </span>
            </Tooltip>

        </Box>
    )
}