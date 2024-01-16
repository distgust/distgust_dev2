import {useState,useEffect} from 'react';
import Loader from '../Loader';
import React from 'react';


const AddCompetitionForm = () =>{
    const [Loading, setLoading] = useState(false);
    const [step, setStep] = useState(2);

    const Step1 = (prop) =>{
        const [competition,setCompetition] = useState([]);
        const Step1Change = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setCompetition(values => ({...values,[name]: value}));
        }
    
        const Step1Submit = async (event) => {
            event.preventDefault();
            try{
                setLoading(true)
                const req = await fetch('https://7c40-49-228-171-180.ngrok-free.app/api/addcompetition',{
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-type': 'application/json',
                            'ngrok-skip-browser-warning': 'any',
                        },
                        body: JSON.stringify(competition),
                    })
                const res = await req.json();
                if(res.status === 'error'){
                    switch(res.data.code){
                        default:
                            console.error(res.data.code)
                            alert('ERROR : '+ res.data.errno+'\nERR_CODE : '+ res.data.code+'\nERR_MESSAGE : '+res.data.sqlMessage);
                            break;                        
                        case 'ER_TRUNCATED_WRONG_VALUE':
                            alert('ERROR : ตรวจสอบข้อมูลที่กรอก\nวันที่จัดกา่รแข่งขันไม่ถูกต้อง')
                            break;
                        case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
                            alert('ERROR : ตรวจสอบข้อมูลที่กรอก\nค่าลงทะเบียนไม่ถูกต้อง')
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
            }finally{
                setLoading(false)
            }
        }
    
        const Step1Cancle = () => { 
            document.getElementById("CompetitionForm").reset();
        }
        if(Loading){
            return <Loader/>
        }else{
            return(
                <div className='form-container' key={prop.containerkey}>
                    <form id='CompetitionForm' className='form-control' onSubmit={Step1Submit} >
                        <div className='form-row'>
                            <label>หัวข้อ</label>
                            <input type='text' name='CompetitionTitle' onChange={Step1Change} placeholder='เช่น แมทท์ประจำเดือน รางวัลหมื่นสองหัว ค่าลงทะเบียน 400 บาท' />
                            <div className='form-span'>
                                <div className='small-text text-right'>ชื่อบ่อ|ประเภทการแข่งขัน|เงินรางวัล|ค่าลงเบ็ด</div>
                            </div>
                        </div>
                        <div className='form-row'>
                            <label>วันที่แข่งขัน</label>
                            <input type='text' name='CompetitionDate' onChange={Step1Change} placeholder='ปปปป-ดด-วว เช่น 2542-24-28' />
                        </div>
                        <div className='form-row' >
                            <label>ค่าคัน</label>
                            <input type='text' name='CompetitionCost' onChange={Step1Change} placeholder='แมทท์แสนสองหัว บ่อตัวอย่าง ชิงหลิว,สายยาว,โอเพ่น ค่าลงเบ็ด 999 บาท' />
                        </div>
                        <div className='form-row' >
                            <label>สถานที่</label>
                            <textarea name='CompetitionLocation' onChange={Step1Change} placeholder='หมู่บ้าน อำเภอ ตำบล จังหวัด' />
                        </div>
                        
                        <div className='form-row'>
                            <label>รายละเอียด</label>
                            <textarea name='CompetitionDetail' onChange={Step1Change} placeholder='รายละเอียด' />
                        </div>
                        <div className='form-row'>
                            <input className='btn-submit' disabled={((competition.CompetitionTitle === '') || (competition.CompetitionLocation === '')
                                || (competition.CompetitionDate === '')|| (competition.CompetitionCost === '') || !(competition?.CompetitionTitle) 
                                || !(competition?.CompetitionLocation) || !(competition?.CompetitionDate) || !(competition?.CompetitionCost) 
                                || !(competition?.CompetitionTitle))} type='submit' value={'โพสต์'}/>
                        </div>
                        <div className='form-row mt-1'>
                            <input className='btn-clear' type='button' disabled={((competition.CompetitionTitle === '') || (competition.CompetitionLocation === '')
                                || (competition.CompetitionDate === '')|| (competition.CompetitionCost === ''))} 
                                onClick={Step1Cancle} defaultValue='เคลียร์ฟอร์ม'/>
                        </div>
                    </form>
                </div>
            )
        }                        
    }

    //  START Step 2 //
    const Step2 = (prop) => {
        const [detail,setDetail] = useState([]);
        const [typename, setTypename] = useState({});
        const [competitionTypeRow, setCompetitionTypeRow] = useState([]);
        const [price, setPrice] = useState([]);
        const [priceRow,setPriceRow] = useState([]);

        const handleName = (event) => {
            let name = event.target.name;
            let value = event.target.value;            
            setTypename(values => ({...values,[name]:value}));
        }

        const handlePrice = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setPrice(values => ({...values,[name]:value}));
        }

        const handleSubmit = async (event) => {
            event.preventDefault();
            try{
                setLoading(true)
                const req = await fetch('https://6b01-49-228-169-225.ngrok-free.app/api/createcompetitiontype', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    },
                    body: JSON.stringify(),
                });
    
                const res = await req.json();
                //console.log("server response this :", res);
                if(res.status === 'error INSERT'){
                    //console.error('ERROR : ', res.response_data.errno,'\nERR_CODE : ', 
                    //res.response_data.code,'\nERR_MESSAGE : ',res.response_data.sqlMessage);
                    switch(res.data.code){
                        default:
                            console.error(res.data.code ) 
                            break;
                        case 'ER_DUP_ENTRY':
                            alert('ERROR : กรุณาใช้ Username อื่น')
                        break;
                        case 'EMPTY_ENTRY':
                            alert('ERROR : ตรวจสอบข้อมูลที่กรอก')
                        break;
                    }
                }else{
                    alert("DATA STORED", res.data); 
                }
            }catch(error){
                console.error("There has been a problem with your fetch operation:", error);
            }
        }

        const appendTypeForm = () => {
            const CompetitionTypeRow = (props) =>{
                const TypeInput = (typeprops) => {
                    return(
                        <div key={typeprops.typeinputkey}>
                            <label>สายการแข่งขันที่ : {typeprops.no}</label>
                            <input type="text" name={typeprops.name} key={typeprops.name+'Name'}  onChange={handleName} placeholder='ชื่อสายการแข่งขัน'/>
                            <input type="text" name={typeprops.name+'Price'} key={typeprops.name+'Price'} onChange={handlePrice} placeholder='จำนวนรางวัล'/>
                            <input className='btn-type' type='button'  onClick={appendPriceDetail} value='เพิ่มเงินรางวัล'/>                         
                        </div>    
                    )
                }
                return(
                    <TypeInput no={props.no} name={props.name} typeinputkey={props.competitionkey}/>   
                )
            }
            setCompetitionTypeRow(prevComponents => [
                ...prevComponents,
                <div className='form-row' key={'RowType'+(prevComponents.length)}> 
                    <CompetitionTypeRow 
                        no={(prevComponents.length+1)} 
                        name={'Type'+(prevComponents.length+1)}
                        competitionkey={'TypeInputKey'+(prevComponents.length+1)} 
                        key={'Type'+(prevComponents.length+1)}
                    />
                </div>
            ])
        }
        
        const appendPriceDetail = () =>{
            const PriceRow = (props) => {
                const PriceInput = (priceprops) =>{
                    return(
                        <>
                            <label>{priceprops.pricename}</label>
                            <input type="text" placeholder='ชื่อสายการแข่งขัน'/>
                        </>
                    )
                }
                return(
                    <PriceInput pricename={props.index} pricekey={props.index}/>
                )
            }
            
            setPriceRow(prevComponents => [
                ...prevComponents,
                    <div className='form-row' key={'PriceRow'+(prevComponents.length)}> 
                        
                            <PriceRow/>
                        
                    </div>       
            ])
        }

        return(
            <div className='form-container' key={prop.containerkey}>
            <form className="form-control" onSubmit={handleSubmit}>
                <div className='form-row' >
                    <span className='section-header-text text-right'>จำนวนสายทั้งหมด : {competitionTypeRow.length} สาย</span>                
                    <input className='btn-type' type='button'  onClick={appendTypeForm} value='เพิ่มสายการแข่งขัน'/>                         
                </div>
                {competitionTypeRow}
                {priceRow}
                <div className='form-row'>
                    <input className='btn-submit' type='submit' value='ยืนยัน' key='submit'/>
                </div>
            </form>
            </div>
        );
    
    }
    //  END Step 2  //

    //      Start Render Switcher   //
    switch(step){
        default:   
            return(
                <Step1 containerkey='step1'/>
            ) 
        case 2:
            return(
                <Step2 containerkey='step2'/>
            )
    }
    //      End Render Switcher     //
}

export default AddCompetitionForm