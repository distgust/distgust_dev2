import { useState,useEffect } from "react";
import Loader from '../components/Loader'

const NumberTable = ({ itemsPerPage,apiserver,competitionid }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchdata = async () => {
            try{
                const response = await fetch(apiserver+'/api/registednumber/'+competitionid, {
                    method: 'GET',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                const result = await response.json()
                setData(result.data)
            }catch(err){
                return
            }finally{
                setLoading(false)
            }   
        }
        fetchdata()
    },[data,apiserver,competitionid])


    // Calculate total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    // Calculate start and end index of current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Slice the data to display only items for the current page
    const currentData = data.slice(startIndex, endIndex);
  
    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
  
    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    if(loading === true){
        return(
            <Loader/>
        )
    }
    if(data.length >= 0){
    return (
    <div> 
        <table className="table-control score-table">
            <thead> 
                <tr key={'NumberTableHead'}>
                    <th>ลำดับที่</th>
                    <th>หมายเลข</th>
                    <th>ชื่อทีม/นักกีฬา</th>
                </tr>
            </thead>
            <tbody>
            {currentData.map((item) => (
                <tr key={'row'+item.registerID}>
                    <td>{item.registerID}</td>
                    <td>{item.registerNumber}</td>
                    <td>{item.registerName}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="container-full-width pt-1">
            <button className="table-button-prev" onClick={prevPage} disabled={currentPage === 1}>ก่อนหน้า</button>
            <button className="table-button-next" onClick={nextPage} disabled={currentPage === totalPages}>ถัดไป</button>
        </div>
    </div>
    );
    }else{
        <div> 
        <table className="table-control score-table">
            <thead> 
                <tr key={'NumberTableHead'}>
                    <th>ลำดับที่</th>
                    <th>หมายเลข</th>
                    <th>ชื่อทีม/นักกีฬา</th>
                </tr>
            </thead>
            <tbody>

                <tr>
                    <td colSpan={3}>ยังไม่มีคะแนน</td>
                    <td></td>
                    <td></td>
                </tr>

            </tbody>
        </table>
        <div className="container-full-width pt-1">
            <button className="table-button-prev" onClick={prevPage} disabled={currentPage === 1}>ก่อนหน้า</button>
            <button className="table-button-next" onClick={nextPage} disabled={currentPage === totalPages}>ถัดไป</button>
        </div>
    </div>
    }
  }
  
  export default NumberTable;