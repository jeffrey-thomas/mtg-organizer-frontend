import { Card, db_api } from "../../database"
import { Firebase } from "../../firebase/Firebase"
import { addCard, removeCard, updateCard } from "../../redux/CollectionSlice"
import { store } from "../../redux/store"

export namespace DashboardFunctions{

    export const moveCard = async(card:Card,dest_id:string,quantity:number)=>{

        const qty = Math.min(quantity, card.qty)
        
        const destination = {deck_id:dest_id, id:card.id, qty:qty}

        const token = await Firebase.getToken()

        db_api.moveCard(token, card, destination).then(
            (result)=>{
                if(result.deleted)
                    store.dispatch(removeCard(card))
                if(result.updated)
                    store.dispatch(updateCard(result.updated))

                store.dispatch(addCard(result.added))
            }
        ).catch(
            (error)=>{ console.log('Failed to move card in database.'+error) }
        )
        
    }

}