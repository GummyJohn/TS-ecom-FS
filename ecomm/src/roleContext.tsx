import { useEffect, createContext, useState, ReactNode } from "react"

export interface Role {
  user: string;
  role: number;
}

interface RoleContextType {
  role: Role | null ;
  authenticate : () => Promise<void>;
  handleSignout: () => Promise<void>;
}

export const RoleContext = createContext<RoleContextType>({
  role: null,
  authenticate: async () => {},
  handleSignout: async () => {},
})

export const AuthRoleProvider = ({ children } : {children: ReactNode}) => {
  const [role, setRole] = useState<Role | null>(null);

  async function authenticate() {
    try {
      const response = await fetch('http://localhost:4001/islogged', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.status === 200) {
        const data = await response.json();
        setRole(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  }

  async function handleSignout(){
    try{
      const response = await fetch('http://localhost:4001/signout', {
        method: 'POST',
        credentials: 'include'
      })

      if(response.status === 200){
        setRole(null)
      }
    }catch(err){
      if(err instanceof Error){
        console.log(err.message);
      }
    }
  }

  
  useEffect(() => {
    authenticate()
  }, [])

  return (
    <RoleContext.Provider value={{ role, authenticate, handleSignout }}>
      {children}
    </RoleContext.Provider>
  );
};
