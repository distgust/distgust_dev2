import { Link } from 'react-router-dom';
import {useState} from 'react';
import './form.css';
import Loader from '../Loader';
const LoginForm = (props) =>{
    let [inputs, setInputs] = useState([]);
    let [loading,setLoading] = useState([])
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };
   
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        const auth = async () =>{
            const gettoken = localStorage.getItem('token');
            try{
                const req = await fetch(props.apiserver+'/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer '+gettoken,
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                const res = await req.json()
                if(res.status === "error"){
                    localStorage.removeItem('token');
                    alert('please login'+res.message);
                    window.location = '/login';
                }else{
                    setLoading(true)
                    //console.log(res.decode.data)
                    const user = res.decode.data
                        if(user.userRole === "admin"){
                            window.location="/dashboard";
                        }else{
                            window.location="/userdashboard";
                        }
                }
            }catch(error){
                localStorage.removeItem('token');
                alert('กรุณาเข้าสู้ระบบใหม่อีกครั้ง\n'+error);
                window.location = '/login';
            }finally{
                setLoading(false)
            }                   
        }

        const login = async () => {
            try{
                const req = await fetch(props.apiserver+'/api/login', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                      },
                    body: JSON.stringify(inputs),
                })
                const res = await req.json()
                if(res.status === 'error'){
                    alert(': ผิดพลาด :\n'+res.message)
                    setLoading(false)
                }else{
                    localStorage.setItem('token',res.token);
                    auth()
                }
            }catch(e){
                alert(': ERROR ON FETCH :\n'+e)
                setLoading(false)
            }
        }
        login();
    }
    if(loading === true){
        return(
            <>
                <Loader/>
            </>
        )
    }else{
        return(
            <div className='form-container'>
                <form className="form-control" onSubmit={handleSubmit}>
                    <div className='form-row'>
                        <label>ชื่อผู้ใช้งาน</label>
                        <input type="text" name="username" onChange={handleChange}/>
                    </div>
                    <div className='form-row'>
                        <label>รหัสผ่าน</label>
                        <input type="password" name="password" autoComplete="on" onChange={handleChange}/>
                    </div>
                    <p className='small-text text-right'>ยังไม่มีบัญชี ? <Link className='link-decor-none' to={'/register'}>สมัครสมาชิก</Link></p>
                    <div className='form-row'>
                        <input className='btn-submit' disabled={(inputs.username === '') || (inputs.password === '')} type='submit' value='ยืนยัน'/>
                    </div>
                </form>
            </div>
        );
    }
    
}
export default LoginForm