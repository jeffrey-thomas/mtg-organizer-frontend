import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material"
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../../SharedComponents/FormInput";
import { scryfall_api, searchResult } from "../../../../scryfall/Api";
import { MtgCardData, MtgCardDisplay } from "../../../Mtg/MtgCards";
import { useState } from "react";
import { AddCard } from '../AddCard'

interface SearchProps{
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

interface SearchState{
    name:string;
    set:string;
}

const emptyResult = {has_more:false, total_cards:null, data:null}

export const Search = (props:SearchProps) =>{

    const methods = useForm<SearchState>({});
    const {handleSubmit} = methods;
    
    const [results, setResults] = useState<searchResult>(emptyResult)

    const [cardToAdd, setCardToAdd ] = useState<MtgCardData>();
    const [addCardOpen, setAddCardOpen] = useState(false)
    const handleAddCardOpen = (card:MtgCardData)=>{ 
        setCardToAdd(card)
        setAddCardOpen(true) 
    }
    const handleAddCarClose = ()=>{ setAddCardOpen(false) }



    const onSubmit = async(data:SearchState) => {
        scryfall_api.search(data.name, data.set).then(
            (result:searchResult)=>{
                if(result)
                    setResults(result);
                else
                    setResults(emptyResult)
            }
        );

    }

    const formStyles = {
        display:'flex',
        flexDirection:'column',
        pt:0,
        width:'850px',
        '& input':{p:'5px'},
    }

    return(
        <>
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" maxWidth={false}>
            <DialogTitle id="form-dialog-title">Find a Card</DialogTitle>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={formStyles}>
                    <FormInput field="name" placeholder='Enter Card Name'>Card Name</FormInput>
                    <FormInput field="set" inputProps={{maxLength:3}} placeholder='Set'>Set Code</FormInput>
                    <Button type='submit' variant='contained' color='secondary'>Search</Button>
                    <Divider/>
                    {results.total_cards ? `Found ${results.total_cards} cards.` : `No results found.`}
                    <Box sx={{display:'grid', gridTemplaeColumns:'1fr', gap:'5px'}}>
                    {results.data ? results.data.map(
                        (card)=>
                            <Box key={card.id} sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <MtgCardDisplay card={card}/>
                                <Button onClick={()=>{handleAddCardOpen(card)}} variant='contained' color='primary'>Add</Button>
                            </Box>
                    ) : ''}    
                    </Box>             
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} variant = 'contained' color='primary'>Done</Button>
                </DialogActions>
            </form>
            </FormProvider>
               
        </Dialog>

        {addCardOpen && 
            <AddCard 
                open={addCardOpen}
                card={cardToAdd!}
                onClose={handleAddCarClose}
                onError={(message:string)=>{console.log(message)}}
                onSuccess={(message:string)=>{console.log(message)}}
            />
        }
        </>
    );
}