import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";


interface Card{
  owner: string;
  description?: string;
  createdAt?: Date;
  closedAt?: Date;
  isCompleted?: boolean;
}

interface cardState{
    cards:Card[];
};


const initialState: cardState = {
    cards:[],
};

const cardSlice = createSlice ({
    name: 'cards',
    initialState,
    reducers:{
        setSelectedCard:(state, action:PayloadAction<Card>)=>{
            //state.name = action.payload.name,
            //state.author = action.payload.author,
            //state.genre = action.payload.genre,
            //state.rating = action.payload.rating,
            //state.publishDate = action.payload.publishDate
            
        },
        addCard: (state, action: PayloadAction<Card>)=>{
            state.cards.push(action.payload)
        },
        clearCard:() => initialState,
    }
});


//exportar actions utilizando slice
export const {addCard, clearCard} = cardSlice.actions

//exportar el reducec de book como default
export default cardSlice.reducer


