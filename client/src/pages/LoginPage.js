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
const LoginPage = (props) =>{

    return(
        <>
        <Headers pagetitle={pagetitle}/>
        <TopNav Li={TopNavLi}/>
        <main className="col-12">
            <div className='container-full-width contents-center'>
                <div className='section'>
                    <div className="section-header">
                        <h1 className='section-heder-text'>เข้าสู่ระบบ</h1>
                    </div>
                    <LoginForm apiserver={props.apiserver}/>
                </div>
            </div>
        </main>
        </>
    );
}
export default LoginPage