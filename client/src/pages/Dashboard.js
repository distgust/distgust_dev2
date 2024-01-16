import { useEffect,useState } from 'react';
import DashHeaders from '../components/DashHeader';
import SideBar from '../components/SideBar';
//import SideNav from '../components/Nav';
import UsersTable from '../components/UsersTable';
import AddNewsForm from '../components/form/AddNewsForm';
import AddScoresForm from '../components/form/AddScoreForm';
import Loader from "../components/Loader";
import ScoresTable from '../components/ScoresTable';

const DashBoard = () => {
    const pagetitle = 'แดชบอร์ด';
    const [loading, setLoading] = useState(true);

    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const auth = async () =>{
            try{
                const req = await fetch('https://2414-49-228-171-180.ngrok-free.app/api/auth', {
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
                    const user = res.decode
                    if(user.userRole !== "admin"){
                        alert('คำเตือน ! คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้')
                        window.location="/";
                    }else{
                        return
                    }
                }
                }catch(error){
                    alert('error : ',error)
                }finally{
                    setLoading(false)
                }                   
        }
        auth();
    },[])

    //menu list array
    const menu_arr = [
        {
            label:'หน้าหลัก',
            link:'/',
            status:'sidebar-link',
        },
        {
            label:'แดชบอร์ด',
            link:'/dashboard',
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
                <SideBar menu_arr={menu_arr} pagetitle={pagetitle}/>
            </div>
            <main className="col-11 dashboard">
                <div className='section'>
                    <h3 className='section-header mb-0'>บันทึกน้ำหนัก</h3>
                    <h4 className='section-header-text'>จดบันทึก น้ำหนักปลาที่ขึ้นชั่งน้ำหนัก</h4>
                    <div className='container-full-width contents-center'>
                        <AddScoresForm/>
                    </div>
                </div>
                <div className='section'>
                    <h3 className='section-header mb-0'>บันทึกน้ำหนัก</h3>
                    <h4 className='section-header-text'>จดบันทึก น้ำหนักปลาที่ขึ้นชั่งน้ำหนัก</h4>
                    <div className='container-full-width contents-center'>
                        <ScoresTable/>
                    </div>
                </div>
                <div className='section'>
                    <h3 className='section-header mb-0'>เพิ่มโพสต์</h3>
                    <h4 className='section-header-text'>นัดหมายการแข่งขัน ประชาสัมพันธ์กิจกรรม</h4>
                    <div className='container-full-width contents-center'>
                        <AddNewsForm />
                    </div>
                </div>
                <div className='section'>
                    <h3 className='section-header mb-0'>รายชื่อสมาชิก</h3>
                    <h4 className='section-header-text'>รายชื่อสมาชิกที่ลงทะเบียนในระบบ</h4>
                    <div className='container-full-width contents-center'>
                        <UsersTable />
                    </div>
                </div>
            </main>
        </div>
    </>
    );
}

export default DashBoard
