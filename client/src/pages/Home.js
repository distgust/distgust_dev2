import Headers from '../components/Header';
import ContentCompetition from '../components/ContentCompetition'
import TopNav from '../components/TopNav';
import ContentLastmatch from '../components/Lastmatch';
import Loader from '../components/Loader';
import { useState,useEffect } from 'react';

const Home = (props) => {
    const [loading, setLoading] = useState(true);
    const [logged,setLogged] = useState(false);

    let pagetitle = 'หน้าหลัก';
    const TopNavLi = [
        {
            label:'หน้าหลัก',
            link:'/',
            status:'topnav-li',
        },
        {
            label:'เข้าสู่ระบบ',
            link:'/login',
            status:'topnav-li',
        },
        {
            label:'สมัครสมาชิก',
            link:'/register',
            status:'topnav-li',
        }
    ];

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token === ''){
            localStorage.removeItem('token');
            alert('please login');
            window.location = '/login';
        }
        
        const auth = async () =>{
            try{
                const req = await fetch(props.apiserver+'/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                        'Authorization' : 'Bearer '+token,
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                const res = await req.json()
                if(res.status === "error"){
                    return
                }else{
                    console.log(res.decode.data);
                    setLogged(true)
                }
            }catch(error){
                console.log(error);
            }finally{
                    setLoading(false)
            }                   
        }
        auth();
    },[props.apiserver])
    
    if (loading) {
        console.log('loading...')
        return <Loader/>
    }
    
    if(logged){
        TopNavLi.splice(1,2,{
            label:'แดชบอร์ด',
            link:'/dashboard',
            status:'topnav-li',
        })
    }
    TopNavLi.forEach(element => {
        if(element.label === pagetitle){
            element.status += " active"
        }
    });
    
  return (
    <>
        <Headers pagetitle={pagetitle} logged={logged}/>
        <TopNav Li={TopNavLi}/>
            <main className='col-12'>
                <div className='section'>
                    <h3 className='section-header mb-0'>การแข่งขัน</h3>
                    <h4 className='section-header-text'>การแข่งขันที่กำลังจะมาถึง</h4>
                    <div className='container-full-width'>
                        <ContentCompetition apiserver={props.apiserver}/>
                    </div>
                </div>
                <div className='container-full-width'>
                    <ContentLastmatch/>
                </div>
            </main>
    </>
    );
}

export default Home
