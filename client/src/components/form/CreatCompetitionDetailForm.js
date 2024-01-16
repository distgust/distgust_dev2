import { useState } from "react";
const CreateCompetitionDetailForm = () => {
    let [inputs, setInputs] = useState({username:""});

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };
    
    const handleSubmit = async (event) => {
        //console.log(inputs);
        //console.log(inputs.username)
        event.preventDefault();
        try{
            const req = await fetch('https://6b01-49-228-169-225.ngrok-free.app/api/createcompetitiondetail', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    'ngrok-skip-browser-warning': 'any',
                },
                body: JSON.stringify(inputs),
            });

            const res = await req.json();
            //console.log("server response this :", res);
            if(res.status === 'error INSERT'){
                //console.error('ERROR : ', res.response_data.errno,'\nERR_CODE : ', 
                //res.response_data.code,'\nERR_MESSAGE : ',res.response_data.sqlMessage);
                switch(res.response_data.code){
                    default:
                        console.error(res.response_data.code)
                        break;
                    case 'ER_DUP_ENTRY':
                        alert('ERROR : กรุณาใช้ Username อื่น')
                    break;
                    case 'EMPTY_ENTRY':
                        alert('ERROR : ตรวจสอบข้อมูลที่กรอก')
                    break;
                }
            }else{
                alert("DATA STORED", res.response_data); 
            }
        }catch(error){
            console.error("There has been a problem with your fetch operation:", error);
        }
    }
    return(
        <div className='form-container'>
        <form className="form-control" onSubmit={handleSubmit}>
            <div className='form-row'>
                <label>จำนวนสายการแข่งขัน</label>
                <input type="text" name="CompetitionType" onChange={handleChange}/>
            </div>

            <div className='form-row'>
                <input className='btn-submit' disabled={((inputs.username === '') || (inputs.email === '') || (inputs.tel === '') || (inputs.password === '')) 
                    || (inputs.fullname === '') || (Object.keys(inputs).length !== 5)}  type='submit' value='ยืนยัน'/>
            </div>

            <div className='form-err-span' hidden={!(((inputs.username === '') || (inputs.email === '') || (inputs.tel === '') || (inputs.password === '')) 
                || (inputs.fullname === '') || (Object.keys(inputs).length !== 5))} >
                <p className="err-span-text">กรุณากรอกข้อมูลให้ครบทุกช่อง</p>
            </div>
        </form>
        </div>
    );

}

export default CreateCompetitionDetailForm