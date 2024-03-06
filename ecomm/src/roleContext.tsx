import { createContext, useState, ReactNode, useEffect } from "react"
import axios from 'axios'

export interface Role {
  user: string;
  role: number;
  spent?: number;
  isAdmin: boolean
}

interface RoleContextType {
  role: Role | null ;
  authenticate : () => Promise<void>;
  handleSignout: (navigate: (path: string) => void,  path: string) => Promise<void>;
  addSpent: (num: number) => void;
}

export const RoleContext = createContext<RoleContextType>({
  role: null,
  authenticate: async () => {},
  handleSignout: async () => {},
  addSpent: () => {},
})

export const AuthRoleProvider = ({ children } : {children: ReactNode}) => {
  const [role, setRole] = useState<Role | null>(null);
 
  function addSpent(num: number){
    const amount = parseInt(num.toFixed(2));

    if(role){
      setRole({
        ...role,
        spent: amount
      })
    }
    
  }
 
  async function authenticate() {
    try {
      const response = await axios.get('http://localhost:4001/islogged', {
        withCredentials: true
      });
      
      if (response.status === 200) {
        setRole(response.data);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }


  async function handleSignout(navigate: (path: string) => void, path: string){
    try{
      const response = await axios.put('http://localhost:4001/signout', {
        role
      },
      {   
        headers: {
          'Content-Type' : 'application/json'
        },
        withCredentials: true
      })
 
      if(response.status === 200){
        setRole(null)
        navigate(path)
      }
    }catch(err){
      if(err instanceof Error){
        console.log(err.message);
      }
    }
  }


  return (
    <RoleContext.Provider value={{ role, authenticate, handleSignout, addSpent}}>
      {children}
    </RoleContext.Provider>
  );
};
