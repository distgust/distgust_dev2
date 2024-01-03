import '../components/CSS/LoginPage.css';
import LoginForm from "../components/form/LoginForm";
import Headers from '../components/Header';
import TopNav from '../components/TopNav';
let pagetitle = 'เข้าสู่ระบบ';
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
const LoginPage = () =>{

    return(
        <>
        <Headers pagetitle={pagetitle}/>
        <main className="col-12">
        <TopNav Li={TopNavLi}/>
            <div className='container-full-width contents-center mt-100'>
                <div className='section'>
                    <h2 className="">เข้าสู่ระบบ</h2>
                    <LoginForm/>
                </div>
            </div>
        </main>
        </>
    );
}
export default LoginPage