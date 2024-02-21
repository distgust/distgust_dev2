import { useEffect,useState } from 'react';
import DashHeaders from '../components/DashHeader';
import SideBar from '../components/SideBar';
import Loader from "../components/Loader";
import StartedCompetitionUserView from '../components/StartedCompetitionUserView';

const DashBoard = (props) => {
    const pagetitle = 'แดชบอร์ด';
    const [loading, setLoading] = useState(true);
    const [adminLogged,setAdminLogged] = useState(false);
    // get query string test
    //const queryParams = new URLSearchParams(window.location.search);
    //const paramValue = queryParams.get('param');
    //console.log(paramValue)

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
                    localStorage.removeItem('token');
                    alert('please login',res.message);
                    window.location = '/login';
                }else{
                    console.log(res.decode)
                    const user = res.decode.data
                        if(user.userRole === "admin"){
                            setAdminLogged(true)
                        }else if(user.userRole === "user"){
                            return
                        }else{
                            localStorage.removeItem('token');
                            alert('ข้อมูลผู้ใช้ไม่ถูกต้อง\n');
                            window.location = '/login';
                        }
                }
            }catch(error){
                localStorage.removeItem('token');
                alert('please re login\n'+error);
                window.location = '/login';
            }finally{
                setLoading(false)
            }                   
        }
        auth();
    },[props.apiserver])

    //menu list array
    const menu_arr = [
        {
            label:'หน้าหลัก',
            link:'/',
            status:'sidebar-link',
        },
        {
            label:'แดชบอร์ด',
            link:'/userdashboard',
            status:'sidebar-link',
        },
    ];

    menu_arr.forEach(element => {
        if(element.label === pagetitle){
            element.status += " active"
        }
    });

    if (loading) {
        console.log('loading...')
        return <Loader/>
    }
    
return (

    <>
        <DashHeaders pagetitle={pagetitle}/>
        <div className='row'>
            <div className='col-1 sidebar'>
                <SideBar menu_arr={menu_arr} pagetitle={pagetitle} adminlogged={adminLogged}/>
            </div>
            <main className="col-11 dashboard">
                <div className='section'>
                    <h1 className='section-header mb-0'>การแข่งขัน</h1>
                    <h4 className='section-header-text'>ที่กำลังแข่งขันอยู่ขณะนี้</h4>
                    <div className='container-full-width'>
                        <StartedCompetitionUserView apiserver={props.apiserver}/>
                    </div>
                </div>
                
                
            </main>
        </div>
    </>
    );
}

export default DashBoard
