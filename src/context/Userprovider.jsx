
import { useContext, createContext, useState } from "react";

const userContext = createContext(null);

function Userprovider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(userContext);
};

export default Userprovider;
