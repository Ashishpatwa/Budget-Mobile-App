import { createSlice } from "@reduxjs/toolkit";

export interface Item {
    name: string;
    plannedAmount: string;
    actualAmount: string;
    month: string;
}

export interface BudgetItem{
    budgetItems: Item[]
}

const initialState: BudgetItem = {budgetItems:[]};
export const addItemsSlice = createSlice({
    name: 'addItems',
    initialState,
    reducers: {
        addBudget(state, action){
            state.budgetItems.push(action.payload);
        }
    }
});

export const { addBudget } = addItemsSlice.actions;
export default addItemsSlice.reducer;




