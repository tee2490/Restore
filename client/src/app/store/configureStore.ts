import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from '../../features/account/accountSlice';
import { basketSlice } from '../../features/basket/basketSlice';
import { catalogSlice } from '../../features/catalog/catalogSlice';
import { counterSlice } from '../../features/contact/counterSlice';

//configureStore เป็นของ redux toolkits ทำหน้าที่รวบรวม Reducer
export const store = configureStore({
    reducer:{
        counter:counterSlice.reducer,
        basket :basketSlice.reducer,
        catalog : catalogSlice.reducer,
        account : accountSlice.reducer
    }
})

//เป็นค่า Default ที่มีอยู่ใน store คือ store.getState, store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

//สำหรับเรียกใข้ dispatch และ state
export const useAppDispatch = ()=>useDispatch<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector