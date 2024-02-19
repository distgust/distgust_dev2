import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import DashHeaders from '../components/DashHeader';
import Loader from '../components/Loader'
import EditCompetitionForm from '../components/form/EditCompetitionForm'

const CompetitionEditPage = (props) => {
    const { competitionid } = useParams();
    const [fetchDatas, setFetchDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    let server = props.apiserver
    let pagetitle = 'แก้ไขข้อมูลการแข่งขัน'
    const goBack = () => {
        window.history.back();
    };

    useEffect(() => {
        // Fetch data from the server
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
    //console.log(fetchDatas) 
    return(
            <>
                <DashHeaders pagetitle={pagetitle}/>
                <main className='no-topnav col-12'>
                    <div className='container-full-width pb-0 pl-3'>
                        <input type='button' className='primary-btn' onClick={goBack} value={'ย้อนกลับ'}/>
                    </div>
                    <div className='section container-fullwidth'>
                        <div className="section-header">
                            <h1 className='section-header-text'>แก้ไขข้อมูลการแข่งขัน</h1>
                        </div>
                        
                    {fetchDatas.map((Props)=>{
                        //console.log(Props.CompetitionDate)
                        return(
                            <>
                            <div className='row contents-end container'>
                            <div className='col-2'>
                            <input type='button' className='btn-remove' onClick={goBack} value={'ลบ'}/>

                            </div>

                            </div>
                           
                            <EditCompetitionForm  key={Props.CompetitionID} Cid={Props.CompetitionID} apiserver={props.apiserver}/>
                            </>
                        )
                    })}</div>
                    
                </main>
            </>
    )
}

export default CompetitionEditPage