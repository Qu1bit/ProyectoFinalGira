import { useDispatch,TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";

//es el medio por el cual podemos actualziar el estado invocando action que ejecutan reducers
//modificarlo
export const useAppDispatch = () => useDispatch<AppDispatch>();
//leerlo
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;