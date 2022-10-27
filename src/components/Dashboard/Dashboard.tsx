import { AddBox, Delete, Edit } from "@mui/icons-material";
import { Box, Button, Divider, FormControl, IconButton, MenuItem, Paper, Select, SelectChangeEvent, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Card, Deck } from "../../database";
import { useCardData } from "../../hooks/useCardData";
import { useCollection } from "../../hooks/useCollection";
import { useSelectedDeck } from "../../hooks/useSelectedDeck";
import { selectAvailableCards, selectDecks } from "../../redux/CollectionSlice";
import { RootState } from "../../redux/store";
import { AvailableCardList } from "./AvailableCardList";
import { CenteredSpinner } from "./CenteredSpinner.tsx/CenteredSpinnder";
import { ConfirmDelete } from "./Dialogs/ConfirmDelete";
import { CreateDeck } from "./Dialogs/CreateDeck";
import { DeckCardList } from "./DeckCardList";
import { RenameDeck } from "./Dialogs/RenameDeck";
import { Search } from "./Dialogs/Search";

export const Dashboard = ()=>{

    const dispatch = useDispatch()
    const { cardDataStatus } = useCardData(dispatch);
    const { collection, collectionStatus } = useCollection(dispatch);

    const { selectedDeck, setSelectedDeck } = useSelectedDeck();

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = ()=>{ setSearchOpen(true); }
    const handleSearchClose = ()=>{ setSearchOpen(false); }

    const [renameOpen, setRenameOpen] = useState(false)
    const handleRenameOpen = ()=>{ setRenameOpen(true); }
    const handleRenameClose = ()=>{ setRenameOpen(false); }

    const [createOpen, setCreateOpen] = useState(false)
    const handleCreateOpen = ()=>{ setCreateOpen(true); }
    const handleCreateClose = ()=>{ setCreateOpen(false); }

    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteItem, setDeleteItem] = useState<Card|Deck>()
    const handleDeleteOpen = (item:Card|Deck)=>{ 
        setDeleteItem(item);
        setDeleteOpen(true); 
    }
    const handleDeleteClose = ()=>{ setDeleteOpen(false); }

    const handleSelectDeck = (event:SelectChangeEvent<string>)=>{
        let val = event.target.value
        setSelectedDeck(val)
    }

    const deckCards = useSelector(
        (state:RootState)=>Object.keys(state.collection.cards).filter((card_id)=>card_id.split(':')[0]===selectedDeck).map((card_id)=>state.collection.cards[card_id])
    )

    const availableCards = useSelector(selectAvailableCards)

    const decks = useSelector(selectDecks)

    const styles={
        display:'grid',
        gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',
        gridTemplateRows:'auto minmax(0,1fr)',
        height:'100%',
        '& h5':{ gridColumn:'1 / 3', textAlign:'center', pt:'10px'},
        '& h6':{p:'0px'}
    }

    return(
        <Box sx={styles}>
            <Typography variant='h5'>Collection</Typography>
            <Paper elevation={4} sx={{m:'20px', display:'grid', gridTemplateRows:'38px 1px 60px 1px minmax(0,1fr)'}}>
                <Typography variant='h6' sx={{textAlign:'center'}}>Available Cards</Typography>
                <Divider/>
                <Button onClick={handleSearchOpen} variant='contained' sx={{m:'5px'}}>Add a Card to Collection</Button>
                <Divider/>
                <Box sx={{ maxHeight:'100%', minHeight:'0'}}>
                    { cardDataStatus === 'idle' &&
                        <AvailableCardList cards={availableCards} deleteMethod={handleDeleteOpen}/>
                    }{
                        (cardDataStatus ==='uninitialized' || cardDataStatus ==='pending') && <CenteredSpinner/>
                    }
                </Box>
            </Paper>


            <Paper elevation={4} sx={{m:'20px', display:'grid', gridTemplateRows:'38px 1px 60px 1px minmax(0,1fr)'}}>
                <Typography variant='h6' sx={{textAlign:'center'}}>Deck</Typography>
                <Divider/>
                <FormControl fullWidth sx={{display:'grid', gridTemplateColumns:'minmax(0,1fr) 40px 40px 40px', gap:'5px', alignItems:'center'}}>
                    <Select sx={{m:'5px', height:'50px', width:'100%'}}
                    value={selectedDeck || ''}
                    onChange={handleSelectDeck}
                >                      
                   { decks.map(
                    (deck)=><MenuItem key={deck.id} value={deck.id}>{deck.name}</MenuItem> 
                   ) }
                </Select>
                <Tooltip title='Rename Deck'>
                    <span>
                    <IconButton onClick={handleRenameOpen} disabled={selectedDeck===''}>
                        <Edit/>
                    </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title='New Deck'>
                    <IconButton onClick={handleCreateOpen}>
                        <AddBox/>
                    </IconButton>
                </Tooltip>
                <Tooltip title='Delete Deck'>
                    <span>
                    <IconButton onClick={()=>{handleDeleteOpen(collection.decks[selectedDeck])}} disabled={selectedDeck===''}>
                        <Delete/>
                    </IconButton>
                    </span>
                </Tooltip>
                </FormControl>
                
                <Divider/>
                <Box sx={{ maxHeight:'100%', minHeight:'0'}}>
                    { cardDataStatus === 'idle' && collectionStatus === 'idle' &&
                        <DeckCardList cards={deckCards}/>
                    }{
                        (cardDataStatus !='idle' || collectionStatus !='idle') && <CenteredSpinner/>
                    }
                </Box>
            </Paper>

            {searchOpen &&
                <Search 
                    open={searchOpen} 
                    onClose={handleSearchClose} 
                    onError={(message:string)=>console.log(message)}
                    onSuccess={(message:string)=>console.log(message)}
                />
            }

            {renameOpen && 
                <RenameDeck
                    deck = {collection.decks[selectedDeck]}
                    open={renameOpen}
                    onClose = {handleRenameClose}
                    onError = {(message:string)=>console.log(message)}
                    onSuccess={(message:string)=>console.log(message)}
                />
            }

            {
                createOpen &&
                <CreateDeck
                    open={createOpen}
                    onClose={handleCreateClose}
                    onError = {(message:string)=>console.log(message)}
                    onSuccess={(message:string)=>console.log(message)}
                />
            }

            {
                deleteOpen &&
                <ConfirmDelete
                    open={deleteOpen}
                    onClose={handleDeleteClose}
                    item={deleteItem!}
                />
            }
        </Box>
        
    )

}

