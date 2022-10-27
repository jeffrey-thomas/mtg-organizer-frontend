import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCollection, selectDeckIds } from "../redux/CollectionSlice";
import { selectCurrentDeck, setCurrentDeck } from "../redux/SelectionSlice";

export const useSelectedDeck = ()=>{

    const collection = useSelector(selectCollection)
    const selectedDeck = useSelector(selectCurrentDeck)
    const deckIds = useSelector(selectDeckIds)
    const dispatch = useDispatch()

    const setSelectedDeck = (deck_id:string)=>dispatch(setCurrentDeck(deck_id))

    //default to the first that isn't the library
    const getDefaultDeck = ()=>{
        for(let i=0; i < deckIds.length; i++)
            if(deckIds[i]!==collection.library_id)
                return deckIds[i]

        return '';
    }

    const resetSelectedDeck = ()=>{
        if(selectedDeck === undefined || selectedDeck === '' || !deckIds.includes(selectedDeck))
            dispatch(setCurrentDeck(getDefaultDeck()))
    }

    useEffect(
        resetSelectedDeck
    )

    return { selectedDeck, setSelectedDeck, resetSelectedDeck }

}