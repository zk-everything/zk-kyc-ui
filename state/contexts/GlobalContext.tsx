/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { createContext, Dispatch, useEffect, useReducer } from "react";
import globalReducer from "../reducers/global";

export type Event = {
  eventTopic: string;
  eventLink: string;
  from: string;
  to: string;
  eventDescription: string;
  registered: boolean;
};

type InitialStateType = {
  darkMode: boolean;
  loggedIn: boolean;
  loading: boolean;
  walletAddress: string;
  events: Event[];
  currentEvent: Event | null;
};

export const initialState = {
  darkMode: false,
  loggedIn: false,
  loading: false,
  events: [],
  currentEvent: null,
  walletAddress: "",
};

export const GlobalContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => {} });

const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", JSON.stringify("light"));
    }
  }, [state.darkMode]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
