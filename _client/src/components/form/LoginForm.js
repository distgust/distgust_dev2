import { Link } from 'react-router-dom';
import {useState} from 'react';
import './form.css';
const LoginForm = () =>{
    let [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };
   
    const handleSubmit = (event) => {
        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify(inputs),
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            if(data.status === "error"){
                alert(data.message);
            }else{
                localStorage.setItem('token',data.token);
                alert('logged in');
                window.location="/dashboard";
            }
        })
        .catch((err) => console.log('ERROR!',err));
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
                    <label>รหัสผ่าน</label>
                    <input type="password" name="password" onChange={handleChange}/>
                </div>
                <p className='small-text text-right'>ยังไม่มีบัญชี ? <Link className='link-decor-none' to={'/register'}>สมัครสมาชิก</Link></p>
                <div className='form-row'>
                    <input className='btn-submit' disabled={(inputs.username === '') || (inputs.password === '')} type='submit' value='ยืนยัน'/>
                </div>
            </form>
        </div>
    );
}
export default LoginForm