const StartBtn =({apiserver,CompetitionID,CompetitionStatus})=>{
 
    const start = () => {
        const fetchdatas = async () => {
            try{
                const response = await fetch(apiserver+'/api/startcompetition/'+CompetitionID, {
                    method: 'PUT',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                try{
                    const result = await response.json()
                    console.log(result.data)
                    if(result.status === 'error'){
                        alert(result.data.sqlMessage)
                    }
                    window.location.reload()
                }catch(err){
                    alert(err)
                    console.error(err)
                }
            }catch(err){
                console.error(err)
            }
        }
        fetchdatas()
    }

    const cancle = () => {
        const fetchdatas = async () => {
            try{
                const response = await fetch(apiserver+'/api/canclecompetition/'+CompetitionID, {
                    method: 'PUT',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                try{
                    const result = await response.json()
                    console.log(result.data)
                    if(result.status === 'error'){
                        alert(result.data.sqlMessage)
                    }
                    window.location.reload()
                }catch(err){
                    alert(err)
                    console.error(err)
                }
            }catch(err){
                console.error(err)
            }
        }
        fetchdatas()

    }

    const end = () => {
        const fetchdatas = async () => {
            try{
                const response = await fetch(apiserver+'/api/endcompetition/'+CompetitionID, {
                    method: 'PUT',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                try{
                    const result = await response.json()
                    console.log(result.data)
                    if(result.status === 'error'){
                        alert(result.data.sqlMessage)
                    }
                    window.location.reload()
                }catch(err){
                    alert(err)
                    console.error(err)
                }
            }catch(err){
                console.error(err)
            }
        }
        fetchdatas()

    }
    if(CompetitionStatus === 'end'){
        return(
            <></>
        )
    }
    else if((CompetitionStatus === 'plan')){
        return(
            <>
                <div className="container contents-end">
                    <input type="button" className="start-btn text-right" value='เริ่มการแข่งขัน' onClick={start}/>
                </div>
            </>
            )
    }else{
        return(
            <div className="container contents-end">
                <input type="button" className="cancle-btn text-right" value='ยกเลิกแข่งขัน' onClick={cancle}/>
                <input type="button" className="warnning-btn text-right" value='สิ้นสุดการแข่งขัน' onClick={end}/>
            </div>
        )
    }
}

export default StartBtn;