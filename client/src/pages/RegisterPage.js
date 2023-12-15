import '../components/CSS/RegisterPage.css';
import Headers from '../components/Header';
import TopNav from '../components/TopNav';
import RegisterForm from '../components/form/RegisterForm';

const RegisterPage = () =>{
    let pagetitle = 'สมัครสมาชิก';
    return(
        <>
        <Headers pagetitle={pagetitle}/>
            <main>
            <TopNav/>
                <div className='container contents-center'>
                    <h2 className='form-title'>สมัครสมาชิก</h2>
                    <RegisterForm/>
                </div>
            </main>
        </>
    );
}
export default RegisterPage