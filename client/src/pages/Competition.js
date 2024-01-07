import DashHeaders from '../components/DashHeader'
import SideBar from '../components/SideBar';

const CompetitionManage = () => {
    const pagetitle = 'การแข่งขัน'
//  menu list array //
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
//                  //
    return(
        <>
            <DashHeaders pagetitle={pagetitle}/>
            <div className='row'>
            <div className='col-1 sidebar'>
                <SideBar menu_arr={menu_arr} pagetitle={pagetitle}/>
            </div>
            <main className="col-11 dashboard">
                <div className='section'>
                    <h3 className='section-header mb-0'>การแข่งขันที่กำลังจะมาถึง</h3>
                    <h4 className='section-header-text'>เริ่มการแข่งขัน/แก้ไขการแข่งขัน ที่กำลังจะมาถึง</h4>
                    <div className='container-full-width contents-center'> 
                    </div>
                </div>
                <div className='section'>
                    <h3 className='section-header mb-0'>กำหนดการแข่งขันใหม่</h3>
                    <h4 className='section-header-text'>เพิ่มกำหนดการแข่งขันใหม่</h4>
                    <div className='container-full-width contents-center'> 
                    </div>
                </div>
            </main>
        </div>
        </>
    )
}

export default CompetitionManage