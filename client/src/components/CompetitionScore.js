import { useState,useEffect } from "react";
import './CSS/Table.css'
import Loader from "./Loader";
import RemoveScoreBtn from "./RemoveScoreBtn";

const CompetitionScore = (props) => {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const server = props.apiserver
    let cid = props.competitionid
    
    useEffect(() => {
        // Fetch data from the server
        const fetchdatas = async () => {
            try{
                const response = await fetch(server+'/api/showcompetitionscore/'+cid, {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                try{
                    const result = await response.json()
                    setDatas(result.data)
                }catch(err){
                    setDatas(err)
                }
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }   
        }

        fetchdatas()
    },[server,cid])

    if (loading) {
        console.log('loading...')
        return <Loader/>
    }

    if(datas.length >= 1){
        return(
            <table className="table-control score-table">
                <thead>
                    <tr>
                        <td>เวลาที่ขึ้นชั่ง</td>
                        <td>หมายเลขคัน</td>
                        <td>ทีมงาน</td>
                        <td>ชนิดปลา</td>
                        <td>น้ำหนักปลา</td>
                        <td>แก้ไข</td>
                        <td>ลบ</td>
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
                            <td>{item.ScoresID}</td>
                            <td><RemoveScoreBtn Sid={item.ScoresID} apiserver={server}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }else{
        return(
            <table className="table-control score-table">
                <thead>
                    <tr>
                        <td>เวลาที่ขึ้นชั่ง</td>
                        <td>หมายเลขคัน</td>
                        <td>ทีมงาน</td>
                        <td>ชนิดปลา</td>
                        <td>น้ำหนักปลา</td>
                        <td>แก้ไข</td>
                        <td>ลบ</td>
                    </tr> 
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={7}>ยังไม่มีคะแนน</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default CompetitionScore