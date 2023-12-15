import RegisterForm from "./form/RegisterForm"
const RegisterCard = () => {
    return(
        <div className="card">
            <h4 className="card-header"><b>สมัครสมาชิก</b></h4>
            <div className="container">
                <RegisterForm/>
            </div>
        </div>
    )
}
export default RegisterCard