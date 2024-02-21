import {useState} from 'react';
import './form.css';
import CompetitionScore from '../CompetitionScore'
import Loader from '../Loader';
const AddScoresForm= ({competitionid, apiserver, CompetitionDate}) =>{
    let [scores,setScores] = useState({});
    let [loading,setLoading] = useState([false])

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setScores(values => ({...values,[name]: value}));
    }
    const HandleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try{
            const req = await fetch(apiserver+'/api/addscore/'+competitionid, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    'ngrok-skip-browser-warning': 'any',
                },
                body: JSON.stringify(scores),
            });
            const res = await req.json();
            //console.log("server response this :", res);
            if(res.status === 'error'){
                console.error('ERROR : ', res.response_data,'\nERR_CODE : ', 
                res.response_data.code,'\nERR_MESSAGE : ',res.response_data.sqlMessage);
                alert("Error ", res.response_data.sqlMessage);
                setLoading(false) 
            }else{
                setLoading(false) 
                console.log("บันทึกแล้ว", res.response_data); 
                alert("บันทึกเรียบร้อย", res.response_data); 
            }
        }
        catch(error){
            console.error("There has been a problem with your fetch operation:", error);
        }
    }
    if(loading === true){
        return(
            <Loader/>
        )
    }
    return(
        <div className='container-full-width' key={'score-form-container'+competitionid}>
            <div className='form-container'>
                <form className='form-control' onSubmit={HandleSubmit}>
                    <div className='form-row' >
                        <label>หมายเลขคัน</label>
                        <input type='text' name='Number' onChange={handleChange} placeholder='หมายเลขคันที่บันทึก'/>              
                    </div>
                    <div className='form-row' >
                        <label>น้ำหนักปลา</label>
                        <input type='text' name='FishWeight' onChange={handleChange} placeholder='น้ำหนักปลา xx.xx'/>
                    </div>
                    <p className='small-text text-right'>กรอกตัวเลขพร้อมทศนิยมสองตำแหน่ง</p>
                    <div className='form-row'>
                        <label>ชนิดปลา</label>
                        <input type='text' name='FishType' onChange={handleChange} placeholder='ชนิดปลา'/>
                    </div>
                    <p className='small-text text-right'>ปลานิล ปลายี่สก นวลจันท์ ตะเพียน จีน สวาย ฯลฯ</p>
                    <div className='form-row'>
                        <input className='btn-submit' disabled={((scores.RodNumber === '') || (scores.FishWeight === '')
                            || (scores.FishTypes === '')) || (Object.keys(scores).length !== 3)} 
                            type='submit' value='จัดเก็บ'/>
                    </div>
                </form>
            </div>
            <div className='container-full-width p-2'>
                <div className="section-header">
                    <h2 className='section-header-text'>ตารางคะแนน</h2>
                    <p className="section-header-date">{CompetitionDate}</p>
                </div>
                    <CompetitionScore competitionid={competitionid} apiserver={apiserver} key={'score-table-'+competitionid}/>
            </div>
        </div>
    )
}

export default AddScoresForm