import { Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { Card } from "../../../database"
import { useCardData } from "../../../hooks/useCardData"
import { AvailableCardRow } from "./AvailableCardRow"

interface AvailableCardListProps{
    cards:Card[],
    deleteMethod:(card:Card)=>void
}

export const AvailableCardList = ({cards, deleteMethod}:AvailableCardListProps)=>{

    const dispatch = useDispatch()
    const {cardData } = useCardData(dispatch)

    return(
        <Box sx={{ display:'grid', gridTemplateColumns:'1fr', gap:'5px', maxHeight:'100%', overflowY:'scroll'}}>
            {
                cards.map(
                    (card)=> card
                        ? <AvailableCardRow key={card.id} card={card} data={cardData[card.id]} deleteMethod={deleteMethod}/> 
                        : ''
                )
            }
        </Box>
    )

}