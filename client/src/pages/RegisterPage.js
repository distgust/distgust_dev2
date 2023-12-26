import '../components/CSS/RegisterPage.css';
import Headers from '../components/Header';
import TopNav from '../components/TopNav';
import RegisterForm from '../components/form/RegisterForm';

const RegisterPage = () =>{
    let pagetitle = 'สมัครสมาชิก';
    return(
        <>
        <Headers pagetitle={pagetitle}/>
        
            <main className="col-12">
            <TopNav/>
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