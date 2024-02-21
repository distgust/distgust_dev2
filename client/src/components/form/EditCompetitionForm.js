import {useState,useEffect} from 'react';
import Loader from '../Loader';
import React from 'react';

const EditCompetitionForm = ({Cid,apiserver}) =>{
    const [Loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [details,setDetails] = useState([])

    const Step1 = ({containerkey,apiserver,Cid}) => {
        const [fetchDatas, setFetchDatas] = useState([]);
        const [Loading, setLoading] = useState(false);
        const [competition,setCompetition] = useState([]);
    
        useEffect(() => {
            // Fetch data from the server
            const fetchdatas = async () => {
                try{
                    const response = await fetch(apiserver+'/api/competition/'+Cid, {
                        method: 'GET',
                        mode: 'cors',
                        headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                        }
                    })
                    try{
                        const result = await response.json()
                        setFetchDatas(result.data)
                    }catch(err){
                        alert(err)
                        console.error(err)
                    }
                }catch(err){
                    console.error(err)
                }finally{
                    setLoading(false)
                }   
            }
    
            fetchdatas()
        },[apiserver,Cid])
    
        const Step1Change = (event) => {
            let name = event.target.name;
            let value = event.target.value;
            setCompetition(values => ({...values,[name]: value}));
        }
    
        const Step1Submit = async (event) => {
            event.preventDefault();
            try{
                setLoading(true)
                const req = await fetch(apiserver+'/api/editcompetition/'+Cid, {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {
                            'Content-type': 'application/json',
                            'ngrok-skip-browser-warning': 'any',
                        },
                        body: JSON.stringify(competition),
                    })
                const res = await req.json();
                if(res.status === 'error'){
                    switch(res.data){
                        default:
                            console.error(res.data)
                            //alert('ERROR : '+ res.data.errno+'\nERR_CODE : '+ res.data.code+'\nERR_MESSAGE : '+res.data.sqlMessage);
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
                    console.log(res.data);
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
                <div className='form-container' key={containerkey+Cid}>
                    {fetchDatas.map((Props)=>{
                        return(
                            <form id='CompetitionForm' className='form-control' onSubmit={Step1Submit}  key={Props.CompetitiionID+'FORM'} >
                                <div className='form-row' key={Props.CompetitiionID+'title'}>
                                    <label>หัวข้อ</label>
                                    <input type='text' defaultValue={(Props.CompetitionTitle)} name='CompetitionTitle' key='CompetitionTitle' onChange={Step1Change} placeholder='เช่น แมทท์ประจำเดือน รางวัลหมื่นสองหัว ค่าลงทะเบียน 400 บาท' />
                                </div>

                                <div className='form-row' key={Props.CompetitiionID+'date'}>
                                    <label>วันที่แข่งขัน</label>
                                    <input type='text' defaultValue={(Props.CompetitionDate)} name='CompetitionDate' key='CompetitionDate' onChange={Step1Change} placeholder='ปปปป-ดด-วว เช่น 2024-04-28' />
                                </div>

                                <div className='form-row' key={Props.CompetitiionID+'cost'}>
                                    <label>ค่าคัน</label>
                                    <input type='text' defaultValue={Props.CompetitionCost} name='CompetitionCost' key='CompetitionCost'  onChange={Step1Change} placeholder='จำนวนเงินเป็นตัวเลข' />
                                </div>
    
                                <div className='form-row' key={Props.CompetitiionID+'location'}>
                                    <label>สถานที่</label>
                                    <input type='text' defaultValue={Props.CompetitionLocation} name='CompetitionLocation'  key='CompetitionLocation' onChange={Step1Change} placeholder='หมู่บ้าน อำเภอ ตำบล จังหวัด' />
                                </div>
                        
                                <div className='form-row'>
                                    <label>รายละเอียด</label>
                                    <textarea defaultValue={Props.CompetitionDetail} name='CompetitionDetail' key='CompetitionDetail' onChange={Step1Change} placeholder='รายละเอียด(กรอกหรือไม่กรอกก็ได้)' />
                                </div>

                                <div className='form-row'>
                                    <input className='btn-submit' type='submit' value={'ตกลง'}/>
                                </div>

                                <div className='form-row mt-1'>
                                    <input className='btn-clear' type='button' disabled={((competition.CompetitionTitle === '') || (competition.CompetitionLocation === '')
                                        || (competition.CompetitionDate === '')|| (competition.CompetitionCost === ''))} 
                                     onClick={Step1Cancle} defaultValue='เคลียร์ฟอร์ม'/>
                                </div>
                            </form>
                        )
                    })}
                </div>
            )
        }                        
    }
    //  END Step 1  //

    //  START Step 2 //
    const Step2 = (prop) => {
        const [typename, setTypename] = useState({});
        const [price, setPrice] = useState([]);
        const [competitionTypeRow, setCompetitionTypeRow] = useState([]);
        const datas = []
        
        const CompetitionTypeRow = (props) =>{
            return(
                <TypeInput no={props.no} name={props.name} 
                typeinputkey={props.competitionkey} 
                value={props.value}
                reward={props.reward} />   
            )  
        }

        const TypeInput = (typeprops) => {
            return(
                <div key={typeprops.typeinputkey}>
                    <label>สายการแข่งขันที่ : {typeprops.no}</label>
                    <input type="text" name={typeprops.name} key={typeprops.name+'Name'}  onChange={handleName} placeholder='ชื่อสายการแข่งขัน' defaultValue={typeprops.value}/>
                    <input type="text" name={typeprops.name+'Price'} key={typeprops.name+'Price'} onChange={handlePrice} defaultValue={typeprops.reward} placeholder='จำนวนรางวัล'/>                         
                </div>    
            )
        }

        useEffect(() => {
            // Fetch data from the server
            const fetchdatas = async () => {
                try{
                    const response = await fetch(apiserver+'/api/competitiondetail/'+Cid, {
                        method: 'GET',
                        mode: 'cors',
                        headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                        }
                    })
                    try{
                        const result = await response.json()
                        result.data.forEach(element => {
                            console.log(element)
                            setTypename(values => ({...values,[element.CompetitionType]:element.CompetitionTypeName}));
                            setPrice(values => ({...values,[element.CompetitionType+'Price']:element.CompetitionTotalReward}));

                            setCompetitionTypeRow(prevComponents => [
                                ...prevComponents,
                                <div className='form-row' key={'RowType'+(prevComponents.length)}> 
                                    <CompetitionTypeRow 
                                        no={(prevComponents.length+1)} 
                                        name={element.CompetitionType}
                                        competitionkey={element.CompetitionType}
                                        value={element.CompetitionTypeName}
                                        reward={element.CompetitionTotalReward} 
                                        key={element.CompetitionTypeName}
                                    />
                                </div>
                            ])
                        });
                    }catch(err){
                        alert(err)
                        console.error(err)
                    }
                }catch(err){
                    console.error(err)
                }finally{
                    setLoading(false)
                }   
            }
    
            fetchdatas()
        },[])

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
            setLoading(true)
            const typekey = Object.keys(typename)
            const looping = async () => typekey.forEach((data) => {
                const pricekey = data+'Price'
                const typeprice = price[pricekey]
                const name = typename[data]
                //console.log(data)
                datas.push({[data]:{'name':[name],'price':[typeprice]}})
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

        //  append form //
        const appendTypeForm = () => {
            const CompetitionTypeRow = (props) =>{
                const TypeInput = (typeprops) => {
                    return(
                        <div key={typeprops.typeinputkey}>
                            <label>สายการแข่งขันที่ : {typeprops.no}</label>
                            <input type="text" name={typeprops.name} key={typeprops.name+'Name'}  onChange={handleName} placeholder='ชื่อสายการแข่งขัน'/>
                            <input type="text" name={typeprops.name+'Price'} key={typeprops.name+'Price'} onChange={handlePrice} placeholder='จำนวนรางวัล'/>                         
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
        //  end append form //

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
    const Step3 = ({containerkey,apiserver,Cid}) => {
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
                console.log(Price)
                setLoading(true)
                const req = await fetch(apiserver+'/api/updatecompetitionprice/'+Cid,{
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    },
                    body: JSON.stringify([details,Price])
                })
                const res = await req.json();
                    if(res.status === 'error'){
                        alert("error")
                    }else{
                        alert("บันทึกข้อมูลเรียบร้อย");
                        window.history.back()

                    }
            }catch(err){
                console.error(err)
                alert('ERROR @update')
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
            <div className='form-container' key={containerkey}>
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
                <Step1 containerkey='step1' key={'step1'} apiserver={apiserver} Cid={Cid} />
            ) 
        case 2:
            return(
                <Step2 containerkey='step2'/>
            )
        case 3:
            return(
                <Step3 containerkey='step3' key={'step3'} apiserver={apiserver} Cid={Cid} />
            )
    }
    //      End Render Switcher     //
}

export default EditCompetitionForm