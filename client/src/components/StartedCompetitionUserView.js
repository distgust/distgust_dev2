import { useState } from "react";
import CompetitionCard from "./CompetitionCard";
import { useEffect } from "react";
import Loader from "./Loader";
import CompetitionScoreUserView from "./CompetitionScoreUserView";

const StartedCompetitionUserView = (props) => {
    const [CompetitionDatas, setCompetitionDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    
        
    useEffect(() => {
        //fetch newstable
        const FetchData = async () =>{
            try{
                const request = await fetch(props.apiserver+'/api/startedcompetitions', {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                const result = await request.json()
                if(result.status === 'success'){
                    console.log(result.data)
                    setCompetitionDatas(result.data)
                }
            }catch(err){
                console.error(err)
                return(err)
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

    if(CompetitionDatas.length >= 1){
        return (
            <div className='container-full-width pt-0 pb-0' >
                <div className='row'>
                    <div className='container-full-width col-4 text-right pt-0 pb-0'>
                        <button className="primary-btn" onClick={() => setLoading(true)}>รีเฟรช</button>
                    </div>
                </div>
                <div className='row-1 pt-0'>
                    {CompetitionDatas.map((Props)=>{
                        const date = Props.CompetitionDate.split("-/")
                        const da = new Date(date)
                        return(
                        <>
                            <div className='container-full-width'>
                                <CompetitionCard CompetitionTitle={Props.CompetitionTitle} CompetitionLocation={Props.CompetitionLocation} 
                                CompetitionDate={da.toDateString()} CompetitionDetail={Props.CompetitionDetail} key={Props.CompetitionID} 
                                Cid={Props.CompetitionID} apiserver={props.apiserver} CompetitionStatus={props.CompetitionStatus}/>
                            </div>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>ตารางคะแนน</h2>
                                    <p className="section-header-date">{da.toDateString()}</p>
                                </div>
                                <CompetitionScoreUserView competitionid={Props.CompetitionID} apiserver={props.apiserver}/>
                            </div>
                            
                        </>
                            )
                        })}
                </div>
            </div>             
        )
    }
        return (
            <div className='container-full-width pt-0 pb-0' >
                <button className="primary-btn" key={'refresh2'} onClick={() => setLoading(true)}>รีเฟรช</button>
                <div className='row-1'>
                    <div className='card align-center'>
                        <h2 className='card-heading mt-2'>ยังไม่มีการแข่งขันในขณะนี้</h2>
                    </div>
                </div>
            </div>             
        )
}

export default StartedCompetitionUserView;