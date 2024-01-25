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

    useEffect((tokens)=>{
        const token = localStorage.getItem('token');

        fetch(props.apiserver+'/api/auth', {
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
