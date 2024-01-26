import { useState,useEffect } from "react";
import Loader from "./Loader";

const CompetitionReward = (props) =>{
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const server = props.apiserver
    let cid = props.competitionid
    useEffect(() => {
        // Fetch data from the server
        const fetchdatas = async () => {
            try{
                const response = await fetch(server+'/api/showcompetitionreward/'+cid, {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                try{
                    const result = await response.json()
                    setDatas(result.data)
                }catch(err){
                    setDatas(err)
                }
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }   
        }

        fetchdatas()
    },[server,cid])
    if(loading){
        return(
            <Loader/>
        )
    }else{
        return(
            <></>
        )
    }
}

export default CompetitionReward