import { Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { Card } from "../../../database"
import { useCardData } from "../../../hooks/useCardData"
import { DeckCardRow } from "./DeckCardRow"

interface DeckCardListProps{
    cards:Card[]
}

export const DeckCardList = ({cards}:DeckCardListProps)=>{

    const dispatch = useDispatch()
    const {cardData } = useCardData(dispatch)

    return(
        <Box sx={{ display:'grid', gridTemplateColumns:'1fr', gap:'5px', maxHeight:'100%', overflowY:'scroll'}}>
            {
                cards.map(
                    (card)=> card? <DeckCardRow key={card.id} card={card} data={cardData[card.id]}/> : ''
                )
            }
        </Box>
    )

}