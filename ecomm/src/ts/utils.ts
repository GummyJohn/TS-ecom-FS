export interface Products{
  id:number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quanity: number;
}

export async function getData(
  url: string, 
  setState: (data: Products[]) => void, 
  setError: (error: boolean) => void, 
  setLoading: (loading: boolean) => void,
){
  try{
    setLoading(true)
    const response = await fetch(url);
    if(response.ok){
      const data = await response.json();
      setState(data);
      setLoading(false);
    }
  }catch(err){
    setError(true)
  }
}