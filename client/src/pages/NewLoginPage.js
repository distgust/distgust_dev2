import Headers from '../components/Header';
import LoginForm from '../components/form/LoginForm'
import TopNav from '../components/TopNav'
const NewLoginPage = () => {
    const pagetitle = "เข้าสู่ระบ"
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
    TopNavLi.forEach(element => {
        if(element.label === pagetitle){
            element.status += " active"
        }
    }); 
    return(
        <>
            <Headers pagetitle={pagetitle}/>
                <TopNav Li={TopNavLi}/>
                <main className='col-12'>
                    <div className='section'>
                        <div className='container-full-width'>
                            <div className="section-header">
                                <h1 className='section-header-text'>เข้าสู่ระบบ</h1>
                                <p className="section-header-date">ระบบจัดการแข่งขันตกปลา</p>
                            </div>
                            <LoginForm/>
                        </div>
                    </div>
                </main>
        </>
        
    )
}
export default NewLoginPage