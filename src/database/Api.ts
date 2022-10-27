import { Card } from ".";
import { Deck } from "./Deck";

const base_uri = 'https://mtg-organizer-backend.herokuapp.com/api'

type HTTPMethod = 'GET' | 'POST' | 'DELETE';

const requestData = async (route:string, method:HTTPMethod, token:string, errMsg:string, body?:string)=>{

    let request:RequestInit = {
        method:method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if(body)
        request.body = body;

    const response = await fetch(base_uri+route,request);

    if(!response.ok){
        throw new Error(errMsg);
    }

    let json = await response.json();
    
    return json;
}

export const db_api = {

    //DECKS
    createDeck:async(token:string,name:string)=>{
        let body = JSON.stringify({name:name});
        let response = await requestData('/decks', 'POST', token, "Failed to create deck on database.", body);
        return response as Deck;
    },

    getDecks:async(token:string)=>{
        let response = await requestData('/decks', 'GET', token, "Failed to get decks from database.");
        return response as Deck[];
    },

    updateDeck:async(token:string, deck:Deck)=>{
        let body = JSON.stringify(deck);
        let response = await requestData('/decks/'+deck.id,'POST',token,"Failed to update deck in database.", body);
        return response;
    },

    deleteDeck:async(token:string, deck:Deck)=>{

        let response = await requestData('/decks/'+deck.id, 'DELETE', token, "Failed to delete deck in database.");
        return response;
    },

    //Cards
    addCard:async(token:string,card:Card)=>{
        let body = JSON.stringify(card);

        let response = await requestData('/cards', 'POST', token, "Failed to add card to database.", body);
        return response as Card;
    },

    getCardsFromDecks:async(token:string,deckIds:string[])=>{
        if(!deckIds || deckIds.length < 1)
            throw new Error("No deck id provided.")

        let query = '?deck=' + deckIds.join('&deck=')
        let response = await requestData('/cards'+query, 'GET', token, "Failed to get cards from database.");
        return response as Card[];
    },

    updateCard:async(token:string, card:Card)=>{

        const {deck_id, id, qty}=card
        //if qty is less than 1 delete instead
        if(qty===0)
            return await requestData(`/cards/${deck_id}/${id}`,'DELETE',token,"Failed to update card in database.")

        let body = JSON.stringify({qty:qty});
        let response = await requestData(`/cards/${deck_id}/${id}`,'POST',token,"Failed to update card in database.", body);
        return response;
    },

    deleteCard:async(token:string, card:Card)=>{
        const {deck_id, id} = card
        let response = await requestData(`/cards/${deck_id}/${id}`,'DELETE',token,"Failed to update card in database.")
        return response;
    },

    moveCard:async(token:string, origin:Card, destination:Card)=>{
        const leftOver = origin.qty - destination.qty

        if(leftOver<0)
            throw new Error('Cannot move more cards than exist.')
    
        let result:{added:Card, deleted?:Card, updated?:Card} = {added:await db_api.addCard(token, destination) as Card }
        
        if(leftOver > 0)
            result['updated'] = await db_api.updateCard(token,{id:origin.id, deck_id:origin.deck_id, qty:leftOver}) as Card
        else
            result['deleted'] = await db_api.deleteCard(token,origin)       

       return result
    }

}
