import Headers from '../components/Header';
import ContentNews from '../components/News';
import TopNav from '../components/TopNav';
import ContentLastmatch from '../components/Lastmatch';
import Loader from '../components/Loader';
import { useState,useEffect } from 'react';

const Home = () => {
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

    useEffect((tokens)=>{
        const token = localStorage.getItem('token');
        fetch('https://6b01-49-228-169-225.ngrok-free.app/api/auth', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'Bearer '+token,
                'ngrok-skip-browser-warning': 'any',
            }
        })
        .then(response => response.json())
        .then((result) => {
            if(result.status === "error"){
                return
            }else{
                tokens = result.decode
                console.log(tokens)
                setLogged(true)
            }
        })
        .catch((err) => console.log('ERROR!',err ))
        .finally(() => setLoading(false))
    },[])
    
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
            <main className="col-12">
                <TopNav Li={TopNavLi}/>
                <div className='container-full-width mt-100'>
                    <ContentNews/>
                    <ContentLastmatch/>
                </div>
            </main>
    </>
    );
}

export default Home
