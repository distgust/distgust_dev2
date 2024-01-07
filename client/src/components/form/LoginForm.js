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
        fetch('https://6b01-49-228-169-225.ngrok-free.app/api/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'ngrok-skip-browser-warning': 'any',
              },
            body: JSON.stringify(inputs),
        })
        .then(res => res.json())
        .then(async (data) => {
            console.log(data);
            if(data.status === "error"){
                alert(data.message);
            }else{
                localStorage.setItem('token',data.token);
                //alert('logged in');
                //window.location="/usersdashboard";
                const token = localStorage.getItem('token');
                
                await fetch('https://6b01-49-228-169-225.ngrok-free.app/api/auth', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer '+token,
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                .then(res => res.json())
                .then((data) => {
                    if(data.status === "error"){
                        localStorage.removeItem('token');
                        alert('please login',data.message);
                        window.location = '/login';
                    }else{
                        console.log(data.decode)
                        const user = data.decode
                        if(user.userRole === "admin"){
                            window.location="/dashboard";
                        }else{
                            window.location="/userdashboard";
                        }
                        //alert('authentication successfully');
                    }
                })
                .catch((err) => console.error('ERROR!',err));
            }
        })
        .catch((err) => console.error('ERROR!',err));
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