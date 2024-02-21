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
                const request = await fetch(props.apiserver+'/api/notendcompetitions', {
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
            <div className='row'>
                <div className='container-full-width col-4 text-right pt-0 pb-0'>
                    <button className="primary-btn" onClick={() => setLoading(true)}>รีเฟรช</button>
                </div>
            </div>
            <div className='row-3 '>
                {CompetitionDatas.map((Props)=>{
                    const date = Props.CompetitionDate.split("-/")
                    const da = new Date(date)
                    return(
                        <CompetitionCard CompetitionTitle={Props.CompetitionTitle} CompetitionLocation={Props.CompetitionLocation} 
                        CompetitionDate={da.toDateString()} CompetitionDetail={Props.CompetitionDetail} key={Props.CompetitionID} 
                        Cid={Props.CompetitionID} apiserver={props.apiserver} CompetitionStatus={props.CompetitionStatus}/>
                        )
                    })}
            </div>
        </div>             
    )
}
export default ContentCompetition;