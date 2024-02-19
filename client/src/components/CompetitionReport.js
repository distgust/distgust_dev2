import { useState,useEffect } from "react";
import Loader from "./Loader";

const CompetitionReport = (props) =>{
    const [report,setReport] = useState([])
    const [loading, setLoading] = useState(true);
    const server = props.apiserver
    let cid = props.competitionid
    useEffect(() => {
        // Fetch data from the server
        const getreport = async () => {
            try{
                const response = await fetch(server+'/api/competitionreport/'+cid, {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                try{
                    const result = await response.json()
                    setReport(result.report)
                    //console.log(report)
                }catch(err){
                    alert(err)
                    console.error(err)
                }
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }   
        }
        getreport()
    },[server,cid,loading])


    if(loading){
        return(
            <Loader/>
        )
    }else{
        return(
        <>
            <div className='container-full-width col-4 text-right pt-0 pb-0'>
                    <button className="primary-btn" onClick={() => setLoading(true)}>รีเฟรช</button>
            </div>
            <div className="row-2">
            
            {report.map((value,key) => {
                let RewardCount = 0;
                let TypeKey = key
                let competitionType = Object.keys(value)
                let RewardReport = value[competitionType]
                console.log(value[competitionType])
                return(
                    <div className='card px-0' key={TypeKey}>
                        <div className='card-header mb-2 align-center '>
                            <h4 className='card-heading'>{competitionType}</h4>
                        </div>
                        <div className="card-content container contents-center">
                            <ul className='reward-list' >
                            {/* eslint-disable-next-line */}
                            {RewardReport.map((rewarddata)=>{
                                let Number = rewarddata.registerNumber
                                    RewardCount++
                                    return(
                                        <li key={TypeKey+RewardCount}><b>อันดับที่ {RewardCount}</b> : {rewarddata.registerName} <b className="ml-2 text-right">หมายเลข</b> {Number}  </li>
                                    )
                            })}
                            </ul>
                        </div>
                    </div>
                )
            })
            }
                </div>
                
            </>
        )   
    }
}

export default CompetitionReport