import { useEffect } from 'react';
import DashHeaders from '../components/DashHeader';
import SideNav from '../components/Nav';

const DashBoard = () => {
  const pagetitle = 'แดชบอร์ด สมาชิก';
  useEffect(()=>{
    console.log('render');
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
          'Content-type' : 'application/json',
          'Authorization' : 'Bearer '+token
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
            alert('คำเตือน','กรุณาใช้แดชบอร์ดของผู้ดูแลระบบ')
            window.location="/dashboard";
        }else{
            return
        }
          //alert('authentication successfully');
      }
    })
    .catch((err) => console.log('ERROR!',err));
  },[])

  return (
    <>
        <DashHeaders pagetitle={pagetitle}/>
        <div className='row'>
            <nav className='col-1'>
                <SideNav />
            </nav>
            <main className="col-11 dashboard">
                <div className='section'>
                    <h3 className='mb-1'>เพิ่มโพสต์</h3>
                    <h4 className='mt-1'>นัดหมายการแข่งขัน ประชาสัมพันธ์กิจกรรม</h4>
                    <div className='container-full-width contents-center'>

                    </div>
                </div>
                <div className='section'>
                    <div className='container'>

                    </div>
                </div>
            </main>
        </div>
    </>
    
  );
}

export default DashBoard
