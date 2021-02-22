import { useContext, createContext } from 'react';

export const AppContext = createContext<Partial<IAuth>>({});

export function useAppContext() {
  return useContext(AppContext);
}
