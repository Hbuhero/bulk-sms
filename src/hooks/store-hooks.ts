import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatcher } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatcher>();
export const useAppSelector = useSelector.withTypes<RootState>();
