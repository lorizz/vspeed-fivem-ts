import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

const RouterCtx = createContext<RouterProviderValue | null>(null);

interface RouterProviderValue {
  setCurrentRoute: (route: string) => void;
  currentRoute: string;
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentRoute, setCurrentRoute] = useState("startup");

  return (
    <RouterCtx.Provider
      value={{
        currentRoute,
        setCurrentRoute,
      }}
    >
      {children}
    </RouterCtx.Provider>
  );
};

export const useRouter = () =>
  useContext<RouterProviderValue>(RouterCtx as Context<RouterProviderValue>);
