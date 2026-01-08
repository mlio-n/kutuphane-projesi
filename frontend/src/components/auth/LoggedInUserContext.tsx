import { createContext, useContext, useState, type Dispatch, type ReactNode } from "react";
import Cookies from "universal-cookie";
import { setToken } from "../../helper/api";

export type LoggedInUser = {
  id: number;
  username: string;
  role: string;
  access_token: string;
};

export type LoggedInUserContextType = {
  loggedInUser: LoggedInUser | null;
  setLoggedInUser: Dispatch<React.SetStateAction<LoggedInUser | null>>;
};

const LoggedInUserContext = createContext<LoggedInUserContextType | null>(null);

export const LoggedInUserContextProvider = ({ children }: { children: ReactNode }) => {
  const cookies = new Cookies();
  let initialUser: LoggedInUser | null = null;

  const storedUser = cookies.get("loggedInUser");
  if (storedUser) {
    initialUser = storedUser;
    setToken(initialUser!.access_token);
  }

  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(initialUser);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export function useLoggedInUsersContext() {
  const context = useContext(LoggedInUserContext);
  if (!context) throw Error("Context bulunamadı!");
  return context;
}