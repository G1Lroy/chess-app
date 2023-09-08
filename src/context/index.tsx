import React, { ReactNode, createContext, useContext, useState } from "react";
import { Cell } from "../models/Cell/Cell";
interface ICellContext {
  selectedCell: Cell | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<Cell | null>>;
}
interface ContextProviderTypes {
  children: ReactNode;
}
const initialState = {
  selectedCell: null,
  setSelectedCell: () => {},
};
const CellContext = createContext<ICellContext>(initialState);

export const ContextProvider: React.FC<ContextProviderTypes> = ({ children }: any) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  return <CellContext.Provider value={{ selectedCell, setSelectedCell }}>{children}</CellContext.Provider>;
};
export function useCellContext() {
  return useContext(CellContext);
}
