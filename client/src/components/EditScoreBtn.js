
const RemoveScoreBtn = ({Sid,apiserver}) => {

    const HandleClick = () =>{
        const FetchData = async () =>{
            try{
                const request = await fetch(apiserver+'/api/editcore/'+Sid, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers:{
                        'Content-Type' : 'application/json',
                        'ngrok-skip-browser-warning': 'any',
                    }
                })
                const result = await request.json()
                if(result.status === 'success'){
                    console.log(result.data)
                    alert('ลบแล้ว')
                    window.location.reload()
                }
            }catch(err){
                console.error(err)
                return(err)
            }
        }
        FetchData()
    }

    return(
        <>
            <input type="button" className="edit-btn float-none" key={'delete'+Sid} onClick={HandleClick} value={'แก้ไข'}/>
        </>
    )
}
export default RemoveScoreBtn