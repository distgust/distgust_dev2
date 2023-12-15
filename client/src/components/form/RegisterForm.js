
import './form.css';
import { useState } from 'react';
const RegisterForm = () =>{
    let [inputs, setInputs] = useState({username:""});

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };
   
    const handleSubmit = (event) => {
        //console.log(inputs);
        //console.log(inputs.username)
        fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(inputs),
        })
        .then((res) => {
            if(!res.ok) throw new Error(res.status);
            else return res.json();
        })
        .then((data) => {
            if(data.code){
                console.log('ERROR : ',data.errno,'\nERR_CODE : ',data.code,'\nERR_MESSAGE : ',data.sqlMessage);
                alert('ERROR : '+data.sqlMessage);
            }else{
                console.log("DATA STORED",data.response); 
            }
        })
        .catch((err) => {
            console.log('ERROR!',err);
        });
        event.preventDefault();
    }
    return(
        <div className='form-container'>
        <form className="form-control" onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>ชื่อผู้ใช้งาน</label>
                <input type="text" name="username" onChange={handleChange}/>
            </div>
            <div className='form-row'>
                <label>อีเมล์</label>
                <input type="email" name="email" onChange={handleChange}/>
            </div>
            <div className='form-row'>
                <label>เบอร์โทรศัพท์</label>
                <input type="text" name="tel" onChange={handleChange}/>
            </div>
            <div className='form-row'>
                <label>รหัสผ่าน</label>
                <input type="password" name="password" onChange={handleChange}/>
            </div>
            <div className='form-row'>
                <label>ชื่อ-นามสกุล</label>
                <input type="text" name="fullname" onChange={handleChange}/>
            </div>

            <div className='form-row'>
            <div className='form-err-span' hidden={!(((inputs.username === '') || (inputs.email === '') || (inputs.tel === '') || (inputs.password === '')) 
                    || (inputs.fullname === '') || (Object.keys(inputs).length !== 5))} ><p className="err-span-text">กรุณากรอกข้อมูลให้ครบทุกช่อง</p></div>
                <input className='btn-submit' disabled={((inputs.username === '') || (inputs.email === '') || (inputs.tel === '') || (inputs.password === '')) 
                    || (inputs.fullname === '') || (Object.keys(inputs).length !== 5)}  type='submit' value='ยืนยัน'/>
            </div>
        </form>
        </div>
    );
}
export default RegisterForm
