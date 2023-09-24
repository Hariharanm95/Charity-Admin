import { FundraisersContext } from "../context/FundraisersContext";
import { useContext } from "react";

export const useFundraisersContext = () => {
    const context = useContext(FundraisersContext);
  
    if (!context) {
      throw new Error('useFundraisersContext must be used within a FundraisersContextProvider');
    }
  
    return context;
  };
  
