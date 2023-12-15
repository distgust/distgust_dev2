import { useEffect } from 'react';
import DashHeaders from '../components/DashHeader';
import SideNav from '../components/Nav';
import UsersTable from '../components/UsersTable';
import AddNewsForm from '../components/form/AddNewsForm';
const DashBoard = () => {
  const pagetitle = 'แดชบอร์ด';
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
          //alert('authentication successfully');
      }
    })
    .catch((err) => console.log('ERROR!',err));
  })

  return (
    <>
      <DashHeaders pagetitle={pagetitle}/>
      <div className='row'>
        <SideNav />
        <main className="col-11 dashboard">
          <div className='container'>
            <h3 className='mb-1'>เพิ่มโพสต์</h3>
            <h4 className='mt-1'>นัดหมายการแข่งขัน ประชาสัมพันธ์กิจกรรม</h4>
            <div className='contents-center container-border-0'>
              <AddNewsForm />
            </div>
          </div>

          <div className='card-row-1'>
            <div className='container-full-width'>
              <UsersTable />
            </div>
          </div>
        </main>
      </div>
    </>
    
  );
}

export default DashBoard
