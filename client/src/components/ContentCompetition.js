import { useState } from "react";
import CompetitionCard from "./CompetitionCard";
import { useEffect } from "react";
import Loader from "./Loader";

const ContentCompetition = (props) => {
    const [CompetitionDatas, setCompetitionDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    //fetch newstable
    useEffect(() => {
        fetch(props.apiserver+'/api/allcompetitions', {
            method: 'GET',
            mode: 'cors',
            headers:{
                'Content-Type' : 'application/json',
                'ngrok-skip-browser-warning': 'any',
            }
        })
        .then((response) => response.json())
        .then((result) => setCompetitionDatas(result.data))
        .catch((error) => alert('Error fetching data:', error))
        .finally(() => setLoading(false));
    },[props.apiserver]);
    if (loading) {
        console.log('loading...')
        return (
            <Loader/>
        )
    }
    return (
            <div className='row-3'>
                {CompetitionDatas.map((Props)=>{
                    const date = Props.CompetitionDate.split("-")
                    const da = new Date(date)
                    return(
                        <CompetitionCard NewsHeader={Props.CompetitionTitle} NewsLocation={Props.CompetitionLocation} 
                        NewsMatchDate={da.toDateString()} NewsContent={Props.CompetitionDetail} key={Props.CompetitionID} Cid={Props.CompetitionID} apiserver={props.apiserver}/>
                        )
                    })}
            </div>             
    )
}
export default ContentCompetition;