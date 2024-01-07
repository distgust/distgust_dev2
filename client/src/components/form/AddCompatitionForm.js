import {useState} from 'react';
import './form.css';

const AddCompatitionForm = () =>{
    let [compeform,setCompeform] = useState({});

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setCompeform(values => ({...values,[name]: value}));
    }
    const HandleSubmit = (event) => new Promise ((resolve,reject) => {
        fetch('https://https://6b01-49-228-169-225.ngrok-free.app/api/addcompetition',{
            method: 'POST',
            mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    'ngrok-skip-browser-warning': 'any',
                },
            body: JSON.stringify(compeform),
        })    
        .then((res) => {
            if(res.status === "success"){
                console.log(res.data);
                return resolve(res.data);
            }
        })
        .catch((err) => {
                console.log(err.data);
                return reject(err.data);
        })
        event.preventDefault();
    })

    return(
        <div className='form-container'>
        <form className='form-control form-w-700' onSubmit={HandleSubmit}>
            <div className='form-row'>
                <label>หัวข้อ</label>
                <input type='text' name='CompeTitle' onChange={handleChange} placeholder='วว-ดด-ปป เช่น 28-04-66'/>
            </div>
            <div className='form-row'>
                <label>วันที่แข่งขัน</label>
                <input type='text' name='ComeDate' onChange={handleChange} placeholder='วว-ดด-ปป เช่น 28-04-66'/>
            </div>
            <div className='form-row' >
                <label>ค่าคัน</label>
                <input type='text' name='CompeCost' onChange={handleChange} placeholder='แมทท์แสนสองหัว บ่อตัวอย่าง ชิงหลิว,สายยาว,โอเพ่น ค่าลงเบ็ด 999 บาท'/>
                <p className='small-text text-right'>ชื่อบ่อ|ประเภทการแข่งขัน|เงินรางวัล|ค่าลงเบ็ด</p>
            </div>
            <div className='form-row' >
                <label>สถานที่</label>
                <textarea name='CompeLocation' onChange={handleChange} placeholder='หมู่บ้าน อำเภอ ตำบล จังหวัด'/>
            </div>
            
            <div className='form-row'>
                <label>รายละเอียด</label>
                <textarea name='CompeDetail' onChange={handleChange} placeholder='รายละเอียด'/>
            </div>

            <div className='form-row'>
                <input className='btn-submit' disabled={((compeform.CompeTitle === '') || (compeform.CompeLocation === '')
                    || (compeform.CompeDate === '') || (compeform.ComeDetail === '')) || (Object.keys(compeform).length !== 4)} 
                    type='submit' value='โพสต์'/>
            </div>
        </form>
        </div>
    )
}

export default AddCompatitionForm