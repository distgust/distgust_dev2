import '../components/CSS/RegisterPage.css';
import Headers from '../components/Header';
import TopNav from '../components/TopNav';
import RegisterForm from '../components/form/RegisterForm';
    let pagetitle = 'สมัครสมาชิก';
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
const RegisterPage = ({apiserver}) =>{

    return(
        <>
        <Headers pagetitle={pagetitle}/>
        <TopNav Li={TopNavLi}/>
            <main className="col-12">
                <div className='container-full-width contents-center'>
                    <div className='section'>
                        <div className="section-header">
                            <h1 className='section-heder-text'>สมัครสมาชิก</h1>
                        </div>
                        <RegisterForm apiserver={apiserver}/>
                    </div> 
                </div>
            </main>
        </>
    );
}
export default RegisterPage