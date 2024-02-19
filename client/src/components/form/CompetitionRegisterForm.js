import { useEffect,useState,useRef } from 'react'
import './form.css';
import Loader from '../Loader';

const CompetitionRegister = ({competitionid, apiserver, CompetitionCost}) => {
    const showCost = useRef(0);
    let [datas,setDatas] = useState([]);
    let [loading,setLoading] = useState([false])

    useEffect(() => {
        const countDatas = () => {
            let firstNumber = parseInt(datas.fnum);
            let lastNumber = parseInt(datas.lnum);
            let total = (lastNumber-firstNumber) + 1;
            return total
        }

        let totalNum = countDatas()
        let cost = totalNum * parseInt(CompetitionCost)
        if(isNaN(cost)){
            let value = 'คำนวณอัตโนมัติ กรุณากรอกหมายเลขคันที่ลงทะเบียน'
            showCost.current.setAttribute('value',value)
        }else{
            let value = 'ค่าลงทะเบียนทั้งหมด '+cost+' บาท'
            showCost.current.setAttribute('value',value)
        }
    },[datas,CompetitionCost])

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setDatas(values => ({...values,[name]: value}));
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try{
            const req = await fetch(apiserver+'/api/competitionregister/'+competitionid, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    'ngrok-skip-browser-warning': 'any',
                },
                body: JSON.stringify(datas),
            });
            const res = await req.json();
            //console.log("server response this :", res);
            if(res.status === 'error'){
                console.log(res.data)
                setLoading(false) 
            }else{
                setLoading(false) 
                console.log("บันทึกแล้ว", res.response_data); 
                alert("บันทึกเรียบร้อย", res.response_data); 
            }
        }
        catch(error){
            console.error("There has been a problem with your fetch operation:", error);
        }
    }
    
    if(loading === true){
        return(
            <Loader/>
        )
    }

    return(
        <div className='container-full-width pb-0' key={'score-form-container'+competitionid}>
            <div className='form-container'>
                <form className='form-control' onSubmit={HandleSubmit}>
                
                    <div className='row container contents-center px-2'>
                        <div className='container col-5' >
                            <div className='container-full-width form-row p-0'>
                                <label>หมายเลข</label>
                                <input type='text' name='fnum' onChange={handleChange} placeholder='หมายเลขคัน'/>
                            </div>          
                        </div>

                        <div className='container contents-center col-2' >
                            <div className='container-full-width form-row align-center p-0'>
                                <p>ถึง</p>
                            </div>          
                        </div>

                        <div className='container contents-center col-5' >
                            <div className='container-full-width form-row p-0'>
                                <label>หมายเลข</label>
                                <input type='text' name='lnum' onChange={handleChange} placeholder='หมายเลขคัน'/>
                            </div>          
                        </div>
                    </div>
                    <p className='small-text text-right '>กรอกหมายเลขคันแรกถึงคันสุดท้าย หากมีหมายเลขเดียวให้กรอกหมายเลขเดิมทั้งสองช่อง</p>

                    <div className='row container contents-center px-2'>
                        <div className='container col-5' >
                            <div className='container-full-width form-row p-0'>
                                <label>ชื่อ</label>
                                <input type='text' name='name' onChange={handleChange} placeholder='ชื่อนักกีฬา/ทีม'/>
                            </div>          
                        </div>

                        <div className='container contents-center col-2' >
                            <div className='container-full-width form-row align-center p-0'>
                                <p></p>
                            </div>          
                        </div>

                        <div className='container contents-center col-5' >
                            <div className='container-full-width form-row p-0'>
                                <label>ยอด</label>
                                <input type='text' className='text-center' ref={showCost} disabled  />
                            </div>          
                        </div>
                    </div>

                    <div className='row container contents-end px-2 '>
                        <div className='container col-6 pb-0' >
                            <div className='container-full-width form-row p-0'>
                            <input className='btn-submit' disabled={((datas.lnum === '') || (datas.fnum === '')
                            || (datas.name === '')) || (Object.keys(datas).length !== 3)} 
                            type='submit' value='ลงทะเบียน'/>
                            </div>          
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default CompetitionRegister