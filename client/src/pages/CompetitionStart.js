import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import Headers from '../components/Header'
import Loader from '../components/Loader'
import Competition from '../components/Competition'

const CompetitionStartPage = (props) => {
    const { competitionid } = useParams();
    const [fetchDatas, setFetchDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    let server = props.apiserver
    const pagetitle = 'เริ่มการแข่งขัน'
    useEffect(() => {
        const fetchdatas = async () => {
            try{
                const response = await fetch(server+'/api/competition/'+competitionid, {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                try{
                    const result = await response.json()
                    setFetchDatas(result.data)
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
    },[server,competitionid])

    if (loading) {
        console.log('loading...')
        return (
            <Loader/>
        )
    }

    return(
            <>
                <Headers pagetitle={pagetitle} logged={true}/>
                <main className='no-topnav col-12'>
                    {fetchDatas.map((Props)=>{
                        const date = Props.CompetitionDate.split("-")
                        const da = new Date(date)
                        return(
                            <Competition CompetitionTitle={Props.CompetitionTitle} CompetitionLocation={Props.CompetitionLocation} 
                                CompetitionDate={da.toDateString()} CompetitionDetail={Props.CompetitionDetail} key={Props.CompetitionID} 
                                Cid={Props.CompetitionID} apiserver={props.apiserver} CompetitionStatus={Props.CompetitionStatus}
                                CompetitionCost={Props.CompetitionCost}
                            /> 
                        )
                    })}
                </main>
            </>
    )
}

export default CompetitionStartPage