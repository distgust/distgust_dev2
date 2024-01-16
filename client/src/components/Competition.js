import {useState} from 'react';
import Loader from '../Loader';
import CreateCompetitionDetailForm from './CreatCompetitionDetailForm';
const AddCompetitionForm = () =>{
    const [competform,setCompetform] = useState({});
    const [Loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setCompetform(values => ({...values,[name]: value}));
    }
    const HandleSubmit = async (event) => {
        event.preventDefault();
        try{
            setLoading(true)
            const adddata = await fetch('https://7c40-49-228-171-180.ngrok-free.app/api/addcompetition',{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    },
                body: JSON.stringify(competform),
                })
            const res = await adddata.json();
            if(res.status === 'error'){
                switch(res.data.code){
                    default:
                        console.error(res.data.code)
                        alert('ERROR : '+ res.data.errno+'\nERR_CODE : '+ res.data.code+'\nERR_MESSAGE : '+res.data.sqlMessage);
                        break;                        
                    case 'ER_TRUNCATED_WRONG_VALUE':
                        alert('ERROR : ตรวจสอบข้อมูลที่กรอก\n;วันที่จัดกา่รแข่งขันไม่ถูกต้อง')
                        break;
                    case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
                        alert('ERROR : ตรวจสอบข้อมูลที่กรอก\n;ค่าลงทะเบียนไม่ถูกต้อง')
                        break;
                    case 'EMPTY_ENTRY':
                        alert('ERROR : ตรวจสอบข้อมูลที่กรอก')
                    break;
                }
            }else{
                alert("บันทึกข้อมูลเรียบร้อย");
                setStep(2);
            }  
        }catch(err){
            console.error("ERROR: ",err);
                //console.error('ERROR : ', err.data.errno,'\nERR_CODE : ',
                //err.response_data.code,'\nERR_MESSAGE : ',err.data.sqlMessage);
        }finally{
            setLoading(false)
        }
    }
    if(Loading === true){
        <>
            <Loader/>
        </>
    }
    const handleCancle = () => { 
        document.getElementById("CompetitionForm").reset();
    }
    switch(step){
        default:
            return(
                
                <div className='form-container'>
                <form id='CompetitionForm' className='form-control' onSubmit={HandleSubmit} >
                    <div className='form-row'>
                        <label>หัวข้อ</label>
                        <input type='text' name='CompetitionTitle' onChange={handleChange} placeholder='เช่น แมทท์ประจำเดือน รางวัลหมื่นสองหัว ค่าลงทะเบียน 400 บาท' />
                        <div className='form-span'>
                            <div className='small-text text-right'>ชื่อบ่อ|ประเภทการแข่งขัน|เงินรางวัล|ค่าลงเบ็ด</div>
                        </div>
                    </div>
                    <div className='form-row'>
                        <label>วันที่แข่งขัน</label>
                        <input type='text' name='CompetitionDate' onChange={handleChange} placeholder='ปปปป-ดด-วว เช่น 2542-24-28' />
                    </div>
                    <div className='form-row' >
                        <label>ค่าคัน</label>
                        <input type='text' name='CompetitionCost' onChange={handleChange} placeholder='แมทท์แสนสองหัว บ่อตัวอย่าง ชิงหลิว,สายยาว,โอเพ่น ค่าลงเบ็ด 999 บาท' />
                    </div>
                    <div className='form-row' >
                        <label>สถานที่</label>
                        <textarea name='CompetitionLocation' onChange={handleChange} placeholder='หมู่บ้าน อำเภอ ตำบล จังหวัด' />
                    </div>
                    
                    <div className='form-row'>
                        <label>รายละเอียด</label>
                        <textarea name='CompetitionDetail' onChange={handleChange} placeholder='รายละเอียด' />
                    </div>
                    <div className='form-row'>
                        <input className='btn-submit' disabled={((competform.CompetitionTitle === '') || (competform.CompetitionLocation === '')
                            || (competform.CompetitionDate === '')|| (competform.CompetitionCost === '') || !(competform?.CompetitionTitle) 
                            || !(competform?.CompetitionLocation) || !(competform?.CompetitionDate) || !(competform?.CompetitionCost) 
                            || !(competform?.CompetitionTitle))} type='submit' value={'โพสต์'}/>
                    </div>
                    <div className='form-row mt-1'>
                        <input className='btn-clear' type='botton' disabled={((competform.CompetitionTitle === '') || (competform.CompetitionLocation === '')
                            || (competform.CompetitionDate === '')|| (competform.CompetitionCost === ''))} 
                            onClick={handleCancle} defaultValue='เคลียร์ฟอร์ม'/>
                    </div>
                </form>
                </div>
                
            )                       
        case 2:
            return(
                <CreateCompetitionDetailForm/>
            )
        case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
            alert('ERROR : ตรวจสอบข้อมูลที่กรอก\n;ค่าลงทะเบียนไม่ถูกต้อง')
            break;
        case 'EMPTY_ENTRY':
            alert('ERROR : ตรวจสอบข้อมูลที่กรอก')
        break;
    }
    
}

export default AddCompetitionForm