import LoginForm from "./form/LoginForm"
const LoginCard = () => {
    return(
        <div className="card">
            <h4 className="card-header"><b>เข้าสู่ระบบ</b></h4>
            <div className="container">
                <LoginForm/>
            </div>
        </div>
    )
}
export default LoginCard