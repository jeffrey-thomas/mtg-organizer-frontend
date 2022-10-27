import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadCards, selectCardDataStatus, selectCards } from "../redux/CardDataSlice";
import { AppDispatch } from "../redux/store";
import { useCollection } from "./useCollection";


export const useCardData = (dispatch:AppDispatch)=>{

    const {collection, collectionStatus} = useCollection(dispatch)

    const cardData = useSelector(selectCards);
    const cardDataStatus = useSelector(selectCardDataStatus);

    

    useEffect(
        ()=>{
            if(collectionStatus==='idle' && cardDataStatus ==='uninitialized'){
                const ids = Object.keys(collection.cards).map((card_id)=>collection.cards[card_id].id)
                if(ids.length>0)
                    dispatch(loadCards(ids))
            }
        }
    )

    return { cardData, cardDataStatus }

}