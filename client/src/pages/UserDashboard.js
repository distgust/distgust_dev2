import { useEffect } from 'react';
import DashHeaders from '../components/DashHeader';
import SideBar from '../components/SideBar';

const UserDashBoard = () => {
  const pagetitle = 'แดชบอร์ด';
  useEffect(()=>{
    console.log('render');
    const token = localStorage.getItem('token');
    fetch('http://192.168.0.101:3000/api/auth', {
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
  return (
    <>
        <DashHeaders pagetitle={pagetitle}/>
        <div className='row'>
            <div className='col-1 sidebar'>
              <SideBar menu_arr={menu_arr}/>
            </div>
            <main className="col-11 dashboard">
                <div className='section'>
                    <h3 className='mb-1'>เพิ่มโพสต์</h3>
                    <h4 className='mt-1'>นัดหมายการแข่งขัน ประชาสัมพันธ์กิจกรรม</h4>
                    <div className='container-full-width contents-center'>
                    </div>
                </div>
                <div className='section'>
                    <div className='container-full-width contents-center'>

                    </div>
                </div>
            </main>
        </div>
    </>
    
  );
}

export default UserDashBoard
