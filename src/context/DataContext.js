"use client";
import { createContext, useContext, useState } from "react";

// Create the context
const DataContext = createContext();

// Context Provider
export function DataProvider({ children }) {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook to use the context
export function useData() {
  return useContext(DataContext);
}
