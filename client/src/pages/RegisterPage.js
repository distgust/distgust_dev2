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
const RegisterPage = () =>{

    return(
        <>
        <Headers pagetitle={pagetitle}/>
            <main className="col-12">
            <TopNav Li={TopNavLi}/>
                <div className='container-full-width contents-center mt-100'>
                    <div className='section'>
                        <h2 className='form-title'>สมัครสมาชิก</h2>
                        <RegisterForm/>
                    </div> 
                </div>
            </main>
        </>
    );
}
export default RegisterPage