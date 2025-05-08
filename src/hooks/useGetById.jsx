import { useEffect } from "react"
import { API_OPTIONS } from "../utils/Constants";

const useGetById = () => {
    const [data, setData] = useState([]);
  async function getData()
  {
    const data= await fetch(,API_OPTIONS)
    const response=await data.json();
    const results= await response.results;
    return results;
  }
  useEffect()=>{
    getData();
  }
}

export default useGetById
