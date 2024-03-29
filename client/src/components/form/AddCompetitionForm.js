import {useState} from 'react';
import Loader from '../Loader';
import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddCompetitionForm = ({apiserver}) =>{
    const [Loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [details,setDetails] = useState([])
    const [CompDate,setCompDate] = useState([])
    const Step1 = (prop) =>{
        const [competition,setCompetition] = useState([]);
        const Step1Change = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setCompetition(values => ({...values,[name]: value}));
        }
         const handleDateChange = (date) => {
        // Assuming 'date' here is the selected date from the DatePicker
        setCompetition(values => ({ ...values, CompetitionDate: date }));
        }

        const Step1Submit = async (event) => {
            const date = competition.CompetitionDate
            setCompDate({Date:date})
            event.preventDefault();
            try{
                setLoading(true)
                const req = await fetch(apiserver+'/api/addcompetition',{
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
                        </div>
                        <div className='form-row'>
                            <label>วันที่แข่งขัน</label>
                            <DatePicker name='CompetitionDate' selected={competition.CompetitionDate} onChange={handleDateChange} />
                        </div>
                        <div className='form-row' >
                            <label>ค่าคัน</label>
                            <input type='text' name='CompetitionCost' onChange={Step1Change} placeholder='จำนวนเงินเป็นตัวเลข' />
                        </div>
                        <div className='form-row' >
                            <label>สถานที่</label>
                            <input type='text' name='CompetitionLocation' onChange={Step1Change} placeholder='หมู่บ้าน อำเภอ ตำบล จังหวัด' />
                        </div>
                        
                        <div className='form-row'>
                            <label>รายละเอียด</label>
                            <textarea name='CompetitionDetail' onChange={Step1Change} placeholder='รายละเอียด(กรอกหรือไม่กรอกก็ได้)' />
                        </div>
                        <div className='form-row'>
                            <input className='btn-submit' disabled={((competition.CompetitionTitle === '') || (competition.CompetitionLocation === '')
                                || (competition.CompetitionDate === '')|| (competition.CompetitionCost === '') || !(competition?.CompetitionTitle) 
                                || !(competition?.CompetitionLocation) || !(competition?.CompetitionDate) || !(competition?.CompetitionCost) 
                                || !(competition?.CompetitionTitle))} type='submit' value={'ตกลง'}/>
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
        const [typename, setTypename] = useState({});
        const [price, setPrice] = useState([]);
        const [weight, setWeight] = useState([]);
        const [competitionTypeRow, setCompetitionTypeRow] = useState([]);
        const datas = []
        
        const handleName = (event) => {
            let name = event.target.name;
            let value = event.target.value;            
            setTypename(values => ({...values,[name]:value}));
        }
        const handleWeight = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setWeight(values => ({...values,[name]:value}));
        }

        const handlePrice = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setPrice(values => ({...values,[name]:value}));
        }

        const handleSubmit = async (event) => {
            event.preventDefault();
            setLoading(true)
            
            const typekey = Object.keys(typename)
            const looping = async () => typekey.forEach((data) => {
                const pricekey = data+'Price'
                const typeprice = price[pricekey]
                const name = typename[data]
                const typeweight = weight[data+'Weight']
                console.log(data)
                datas.push({[data]:{'name':[name],'price':[typeprice],'weight':[typeweight]}})
                //console.log(datas)                   
            })

            try{
                await looping()
                setDetails(datas)
                setStep(3)
            }catch(error){
                alert('error: '+error)
            }finally{
                console.log(datas)
                setLoading(false)
            }
        }

        const appendTypeForm = () => {
            const CompetitionTypeRow = (props) =>{
                const TypeInput = (typeprops) => {
                    return(
                        <div key={typeprops.typeinputkey} className='container contents-center'>
                            <label>สายการแข่งขันที่ : {typeprops.no}</label>
                            <input type="text" name={typeprops.name} key={typeprops.name+'Name'}  onChange={handleName} placeholder='ชื่อสายการแข่งขัน'/>
                            <input type="text" name={typeprops.name+'Weight'} key={typeprops.name+'Weight'}  onChange={handleWeight} placeholder='พิกัดน้ำหนักที่ใช้ ปล่อยว่างเพื่อใช้น้ำหนักสูงสุด'/>
                            <input type="text"  name={typeprops.name+'Price'} key={typeprops.name+'Price'} onChange={handlePrice} placeholder='จำนวนรางวัล'/>                         
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
        if(Loading){
            return <Loader/>
        }else{
            return(
                <div className='form-container' key={prop.containerkey}>
                    <form className="form-control" onSubmit={handleSubmit}>
                        <div className='form-row' >
                            <span className='section-header-text text-right'>จำนวนสายทั้งหมด : {competitionTypeRow.length} สาย</span>                
                            <input className='btn-type' type='button'  onClick={appendTypeForm} value='เพิ่มสายการแข่งขัน'/>                         
                        </div>
                        {competitionTypeRow}
                        <div className='form-row'>
                            <input className='btn-submit' type='submit' value='ยืนยัน' key='submit'/>
                        </div>
                    </form>
                </div>
            );
        }
    
    }
    //  END Step 2  //
    // START STEP 3 //
    const Step3 = (props) => {
        const [priceRow,setPriceRow] = useState([]);
        // eslint-disable-next-line
        const [Price,setPrice] = useState([]);

        //console.log(details)
        const handlePrice = (event) => {
            let name = event.target.name;
            let value = event.target.value;            
            setPrice(values => ({...values,[name]:value}));
        }
        const Step3Submit = async (event) => {
            event.preventDefault()
            try{
                const getid = await fetch(apiserver+'/api/getcompetitionid/'+CompDate.Date,{
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-type': 'application/json',
                            'ngrok-skip-browser-warning': 'any',
                        }
                    })
                    console.log(Price)
                        const res = await getid.json()
                        const Cid = res.data
                        if(res.status === 'error'){
                            console.log(res.data.CompetitionID)
                            alert(res)
                        }else{
                            try{
                                setLoading(true)

                                const req = await fetch(apiserver+'/api/addcompetitionprice',{
                                    method: 'POST',
                                    mode: 'cors',
                                    headers: {
                                        'Content-type': 'application/json',
                                        'ngrok-skip-browser-warning': 'any',
                                    },
                                    body: JSON.stringify([CompDate,details,Price,Cid])
                                })

                                const res = await req.json()
                                if(res.status === 'error'){
                                    alert("error")
                                }else{
                                    alert("บันทึกข้อมูลเรียบร้อย")
                                    window.location.reload()
                                }
                            }catch(err){
                                alert('ERROR @adddata')
                            }
                        }
            }catch(e){
                alert('ERROR @getid')
            }
        }

        const appendPriceDetail = (event) =>{
            event.preventDefault();
            const PriceRow = (props) => {
                const PriceInput = (priceprops) =>{
                    return(
                        <>
                            <label>{priceprops.no}</label>
                            <input type="text" placeholder='เงินรางวัล' key={priceprops.inputKey} name={priceprops.name} onChange={handlePrice}/>
                        </>
                    )
                }
                return(
                    <PriceInput no={props.no} key={props.inputKey} name={props.name}/>
                )
            }
            let count = 1
            details.forEach((values,index,array) => {
                const data = values['Type'+count]
                const price = parseInt(data.price)
                count++
                
                console.log(data,price)    
                console.log('***********')
                for(let i = 0 ;i < price; i++){
                    setPriceRow(prevComponents => [
                        ...prevComponents,
                            <div className='form-row' key={'ROWtype'+(index+1)+'price' + (i+1)}> 
                                <PriceRow 
                                    no={'ประเภทที่ : ' + (index+1) + ' รางวัลที่ : ' + (i+1)}
                                    name={'type'+(index+1)+'price' + (i+1)}
                                    key={'ROWtype'+(index+1)+'price' + (i+1)}
                                    inputKey={'type'+(index+1)+'price' + (i+1)}
                                />     
                            </div>         
                    ])
                }
            })
        }
        return(
            <div className='form-container' key={props.containerkey}>
                <form className="form-control" onSubmit={Step3Submit}>
                    <div className='form-row' >
                        <span className='section-header-text text-right'>จำนวนเงินรางวัล : {priceRow.length} รางวัล</span>                
                        <input className='btn-type' type='button'  onClick={appendPriceDetail} value='เพิ่มเงินรางวัล'/>                       
                    </div>
                    {priceRow}
                    <div className='form-row'>
                        <input className='btn-submit' type='submit' value='ยืนยัน' key='submit'/>
                    </div>
                </form>
            </div>
        )
    }
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
        case 3:
            return(
                <Step3 containerkey='step3' />
            )
    }
    //      End Render Switcher     //
}

export default AddCompetitionForm