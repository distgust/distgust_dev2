import '../components/CSS/LoginPage.css';
import LoginForm from "../components/form/LoginForm";
import Headers from '../components/Header';
import TopNav from '../components/TopNav';
let pagetitle = 'เข้าสู่ระบบ';

const LoginPage = () =>{
    return(
        <>
        <Headers pagetitle={pagetitle}/>
        <main className="col-12">
        <TopNav/>
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