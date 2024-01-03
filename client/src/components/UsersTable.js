import { useState,useEffect } from "react";
import './CSS/Table.css'
import Loader from "./Loader";
const UsersTable = (ResultData) => {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Fetch data from the server
        fetch('http://192.168.0.101:3000/api/showuser', {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
        }
        })
        .then((response) => response.json())
        .then((result) => setDatas(result.data))
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setLoading(false));

    },[]);
    //const dataobj = JSON.parse(datas);
    //console.log(data)
    if (loading) {
        console.log('loading...')
        return <Loader/>
    }
    return(
        <table className="table-control users-table">
            <thead>
                <tr>
                <td className="username">Username</td>
                <td className="password">Password</td>
                <td>Role</td>
                </tr> 
            </thead>
            <tbody>
                {datas.map((item) => (
                    <tr key={"User"+item.UserID}>
                        <td>{item.UserUN}</td>
                        <td>{item.UserPW}</td>
                        <td>{item.UserR}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UsersTable