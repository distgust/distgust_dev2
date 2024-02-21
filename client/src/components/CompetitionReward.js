import { useState,useEffect } from "react";
import Loader from "./Loader";

const CompetitionReward = (props) =>{
    const [Type, setType] = useState([]);
    const [Reward, setReward] = useState([]);
    const [loading, setLoading] = useState(true);
    const server = props.apiserver
    let cid = props.competitionid
    useEffect(() => {
        // Fetch data from the server
        const fetchdatas = async () => {
            try{
                const response = await fetch(server+'/api/getcompetitionreward/'+cid, {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                try{
                    const result = await response.json()
                    setType(result.data.type)
                    setReward(result.data.reward)
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

        fetchdatas()
    },[server,cid])


    if(loading){
        return(
            <Loader/>
        )
    }else{
        return(
            <div className="row-2">
            {Type.map((typedata)=>{
                let RewardCount = 0;
                return(
                    <div className='card' key={typedata.CompetitionType}>
                        <div className='card-header mb-2 align-center'>
                            <h4 className='card-heading'>{typedata.CompetitionTypeName}</h4>
                        </div>
                        <div className="card-content contents-center">
                            <ul className='reward-list' key={typedata.CompetitionType}>
                            {/* eslint-disable-next-line */}
                            {Reward.map((rewarddata)=>{
                                let type = typedata.CompetitionType.toLowerCase()
                                let reward = rewarddata.CompetitionRewardType
                                if(reward.includes(type)){
                                    RewardCount++
                                    return(
                                        <li key={rewarddata.CompetitionRewardType}>รางวัลที่{RewardCount} : {rewarddata.CompetitionRewardPrice} บาท</li>
                                    )
                                }
                            })}
                            </ul>
                        </div>
                    </div>
                )
            })} 
            </div>
        )   
    }
}

export default CompetitionReward