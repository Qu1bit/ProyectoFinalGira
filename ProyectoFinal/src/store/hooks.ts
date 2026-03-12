import { useDispatch,TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";

//es el medio por el cual podemos actualziar el estado invocando action que ejecutan reducers
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;