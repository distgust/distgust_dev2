import { useState,useEffect } from "react";
import './CSS/Table.css'
import Loader from "./Loader";
const ScoresTable = () => {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the server
        const fetchdatas = async () => {
            try{
                const response = await fetch('https://6b01-49-228-169-225.ngrok-free.app/api/showscore', {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                const result = await response.json();
                setDatas(result.data);
            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            } 
            
        }
        
        fetchdatas();

    },[]);
    //const dataobj = JSON.parse(datas);
    //console.log(data)
    if (loading) {
        console.log('loading...')
        return <Loader/>
    }
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
}

export default ScoresTable