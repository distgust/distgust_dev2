import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import Headers from '../components/Header'
import Loader from '../components/Loader'
import CompetitionDetail from '../components/CompetitionDetail'
const CompetitionPage = (props) => {
    const { competitionid } = useParams();
    const [fetchDatas, setFetchDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(competitionid)
    let pagetitle = ''
    let server = props.apiserver

    useEffect(() => {
        fetch(server+'/api/competition', {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type' : 'application/json',
                'ngrok-skip-browser-warning': 'any',
            },
            body:JSON.stringify({cid:[competitionid]}),
        })
        .then((response) => response.json())
        .then((result) => setFetchDatas(result.data))
        .catch((error) => alert(error))
        .finally(() => setLoading(false));
    },[server,competitionid]);

    if (loading) {
        console.log('loading...')
        return (
            <Loader/>
        )
    }

    return(
            <>
                <Headers pagetitle={pagetitle}/>
                <main className='no-topnav col-12'>
                    {fetchDatas.map((Props)=>{
                        const date = Props.CompetitionDate.split("-")
                        const da = new Date(date)
                        return(
                            <CompetitionDetail NewsHeader={Props.CompetitionTitle} NewsLocation={Props.CompetitionLocation} 
                            NewsMatchDate={da.toDateString()} NewsContent={Props.CompetitionDetail} key={Props.CompetitionID} Cid={Props.CompetitionID} apiserver={props.apiserver}/>
                        )
                    })}
                </main>
            </>
    )
}

export default CompetitionPage