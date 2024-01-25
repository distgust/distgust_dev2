import { useState,useEffect } from "react";
import './CSS/Table.css'
import Loader from "./Loader";
const ScoresTable = (props) => {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scoreError,setScoreError] = useState([])
    const server = props.apiserver
    let cid = props.competitionid
    useEffect(() => {
        // Fetch data from the server
        const fetchdatas = async () => {
            try{
                const response = await fetch(server+'/api/showcompetitionscore', {
                    method: 'POST',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    },
                    body:JSON.stringify({cid:[cid]}),
                })
                const result = await response.json();
                setDatas(result.data);
            }catch(error){
                setScoreError(error)
                console.error()
            }finally{
                setLoading(false)
            }   
        }
        
        fetchdatas();

    },[server,cid]);
    //const dataobj = JSON.parse(datas);
    //console.log(data)
    if (loading) {
        console.log('loading...')
        return <Loader/>
    }
    if(datas.length >= 0){
        return(
            <table className="table-control score-table">
                <thead>
                    <tr>
                        <td>เวลาที่ขึ้นชั่ง</td>
                        <td>หมายเลขคัน</td>
                        <td>ทีมงาน</td>
                        <td>ชนิดปลา</td>
                        <td>น้ำหนักปลา</td>
                    </tr> 
                </thead>
                <tbody>
                    {datas.map((item) => (
                        <tr key={"ScoresID"+item.ScoresID}>
                            <td>{new Date(item.Times).toLocaleTimeString()}</td>
                            <td>{item.Number}</td>
                            <td>{item.TeamName}</td>
                            <td>{item.FishType}</td>
                            <td>{item.FishWeight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }else{
        <h2>ยังไม่มีคะแนน</h2>
    }
}

export default ScoresTable