import { useState } from "react";
import CompetitionCard from "./CompetitionCard";
import { useEffect } from "react";
import Loader from "./Loader";

const ContentCompetition = (props) => {
    const [CompetitionDatas, setCompetitionDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    
        
    useEffect(() => {
        //fetch newstable
        const FetchData = async () =>{
            try{
                const request = await fetch(props.apiserver+'/api/allcompetitions', {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                const result = await request.json()
                setCompetitionDatas(result.data)
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }
        }
        FetchData()
    },[loading,props.apiserver]);
    if (loading) {
        console.log('loading...')
        return (
            <Loader/>
        )
    }
    return (
        <div className='container-full-width pt-0 pb-0'>
            <button className="primary-btn" onClick={() => setLoading(true)}>รีเฟรช</button>
            <div className='row-2'>
                {CompetitionDatas.map((Props)=>{
                    const date = Props.CompetitionDate.split("-")
                    const da = new Date(date)
                    return(
                        <CompetitionCard NewsHeader={Props.CompetitionTitle} NewsLocation={Props.CompetitionLocation} 
                        NewsMatchDate={da.toDateString()} NewsContent={Props.CompetitionDetail} key={Props.CompetitionID} Cid={Props.CompetitionID} apiserver={props.apiserver}/>
                        )
                    })}
            </div>
        </div>             
    )
}
export default ContentCompetition;