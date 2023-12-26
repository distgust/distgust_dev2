import { useEffect } from 'react';
import DashHeaders from '../components/DashHeader';
import SideNav from '../components/Nav';
import UsersTable from '../components/UsersTable';
import AddNewsForm from '../components/form/AddNewsForm';
const DashBoard = () => {
    const pagetitle = 'แดชบอร์ด';
    
    useEffect(()=>{
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
                        <AddNewsForm />
                    </div>
                </div>
                <div className='section'>
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
