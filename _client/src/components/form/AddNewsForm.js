import {useState} from 'react';
import './form.css';

const AddNewsForm= () =>{
    let [newsform,setNewsform] = useState({});

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setNewsform(values => ({...values,[name]: value}));
    }
    const HandleSubmit = (event) => new Promise ((resolve,reject) => {
        fetch('http://localhost:3001/api/addnewspost',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newsform),
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
        <form className='form-control form-w-700' onSubmit={HandleSubmit}>
            <div className='form-row' >
                <label>หัวข้อ</label>
                <input type='text' name='NewsHeader' onChange={handleChange} placeholder='แมทท์แสนสองหัว บ่อตัวอย่าง ชิงหลิว,สายยาว,โอเพ่น ค่าลงเบ็ด 999 บาท'/>
                <p className='small-text text-right'>ชื่อบ่อ|ประเภทการแข่งขัน|เงินรางวัล|ค่าลงเบ็ด</p>
            </div>
            <div className='form-row' >
                <label>สถานที่</label>
                <textarea name='NewsLocation' onChange={handleChange} placeholder='หมู่บ้าน อำเภอ ตำบล จังหวัด'/>
            </div>
            <div className='form-row'>
                <label>วันที่</label>
                <input type='text' name='NewsMatchDate' onChange={handleChange} placeholder='วว-ดด-ปป เช่น 28-04-66'/>
            </div>
            <div className='form-row'>
                <label>รายละเอียด</label>
                <textarea name='NewsContent' onChange={handleChange} placeholder='รายละเอียด'/>
            </div>
            <div className='form-row'>
                <input className='btn-submit' disabled={((newsform.NewsHeader === '') || (newsform.NewsLocation === '')
                    || (newsform.NewsDate === '') || (newsform.NewsContent === '')) || (Object.keys(newsform).length !== 4)} 
                    type='submit' value='โพสต์'/>
            </div>
        </form>
    )
}

export default AddNewsForm