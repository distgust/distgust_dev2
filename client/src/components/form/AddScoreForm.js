import {useState} from 'react';
import './form.css';

const AddScoresForm= () =>{
    let [scores,setScores] = useState({});

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setScores(values => ({...values,[name]: value}));
    }
    const HandleSubmit = async (event) => {
        event.preventDefault();
        try{
            const req = await fetch('https://6b01-49-228-169-225.ngrok-free.app/api/addscore', {
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
            }else{
                console.log("บันทึกแล้ว", res.response_data); 
                alert("บันทึกเรียบร้อย", res.response_data); 
            }
        }
        catch(error){
            console.error("There has been a problem with your fetch operation:", error);
        }
    }

    return(
        <div className='form-container'>
        <form className='form-control' onSubmit={HandleSubmit}>
            <div className='form-row' >
                <label>หมายเลขคัน</label>
                <input type='text' name='Number' onChange={handleChange} placeholder='หมายเลขคันที่บันทึก'/>
                <p className='small-text text-right'>หมายเลขคันเบ็ด</p>
            </div>
            <div className='form-row' >
                <label>น้ำหนักปลา</label>
                <input type='text' name='FishWeight' onChange={handleChange} placeholder='น้ำหนักปลา xx.xx'/>
                <p className='small-text text-right'>กิโลกรัม</p>
            </div>
            <div className='form-row'>
                <label>ทีมงาน</label>
                <input type='text' name='TeamName' onChange={handleChange} placeholder='ทีมงาน'/>
            </div>
            <div className='form-row'>
                <label>ชนิดปลา</label>
                <input type='text' name='FishType' onChange={handleChange} placeholder='ชนิดปลา'/>
                <p className='small-text text-right'>ปลานิล ปลายี่สก นวลจันท์ ตะเพียน จีน สวาย ฯลฯ</p>
            </div>
            <div className='form-row'>
                <input className='btn-submit' disabled={((scores.RodNumber === '') || (scores.FishWeight === '')
                    || (scores.TeamName === '') || (scores.FishTypes === '')) || (Object.keys(scores).length !== 4)} 
                    type='submit' value='จัดเก็บ'/>
            </div>
        </form>
        </div>
    )
}

export default AddScoresForm