import { useState,useEffect } from "react";
import './CSS/Table.css'
const UsersTable = (ResultData) => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
      // Fetch data from the server
        fetch('http://localhost:3000/api/showuser', {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
        }
        })
        .then((response) => response.json())
        .then((result) => setDatas(result.data))
        .catch((error) => console.error('Error fetching data:', error));
    },[]);
    //const dataobj = JSON.parse(datas);
    //console.log(data)
    return(
        <table className="table-control users-table">
            <thead>
                <tr>
                <td className="id">UserID</td>
                <td className="username">Username</td>
                <td>role</td>
                </tr> 
            </thead>
            <tbody>
                {datas.map((item) => (
                    <tr key={"User"+item.UserID}>
                        <td>{item.UserID}</td>
                        <td>{item.UserUN}</td>
                        <td>{item.UserR}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UsersTable