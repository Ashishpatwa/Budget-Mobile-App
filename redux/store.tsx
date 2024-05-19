import { configureStore } from "@reduxjs/toolkit";
import {addItemsSlice} from "./addItemsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import addItemsSlice from "./addItemsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage : AsyncStorage
}

const persistedReducer = persistReducer(persistConfig,addItemsSlice.reducer);

const store = configureStore ({
    reducer :{
        items: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
    }),

})

const persistor = persistStore(store);

export {persistor};
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: ()=>typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export default store;