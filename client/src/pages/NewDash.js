import '../components/CSS/Dashboard.css'
import DashHeaders from '../components/DashHeader';
import Sidebar from '../components/Sidebar';
import AddNewsForm from '../components/form/AddNewsForm';
const NewDash = () => {
    const pagetitle = 'แดชบอร์ดใหม่';
    return(
        <>
            <DashHeaders pagetitle={pagetitle}/> 
            <menu className='sector-menu'>
                <Sidebar/>
            </menu> 
            <main className="sector-main">
                <div className='section'>
                    <h3 className='mb-1'>เพิ่มโพสต์</h3>
                    <h4 className='mt-1'>นัดหมายการแข่งขัน ประชาสัมพันธ์กิจกรรม</h4>
                    <div className='container-full-width contents-center'>
                        <AddNewsForm />
                    </div>
                </div>
            </main>
            
            
        </>

    )
}

export default NewDash