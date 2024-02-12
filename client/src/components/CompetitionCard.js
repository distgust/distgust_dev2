import {useState,useEffect} from 'react'
import CardMenu from './CardMenu';

const CompetitionCard = ({CompetitionTitle,CompetitionLocation,CompetitionDate,CompetitionDetail,Cid,apiserver}) => {
    const [role,setRole] = useState(false);

    useEffect(()=>{
        let token = localStorage.getItem('token');

        fetch(apiserver+'/api/auth', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'Bearer '+token,
                'ngrok-skip-browser-warning': 'any',
            }
        })
        .then(response => response.json())
        .then((result) => {
            if(result.status === "error"){
                return
            }else{
                token = result.decode.data
                console.log(token)
                if(token.userRole === 'admin'){
                    setRole(true)
                }
            }
        })
        .catch((err) => console.log('ERROR!',err ))
    },[apiserver])

    const selectmenu_arr = [
        {
            label:'รายละเอียด',
            link:'/competition/'+Cid,
            status:'cardmenu-link',
        }
    ];

    if(role){
        selectmenu_arr.push(
            {
                label:'เริ่ม/หยุด/สรุปการแข่งขัน',
                link:'/startcompetition/'+Cid,
                status:'cardmenu-link',
            },
            {
                label:'แก้ไข/ลบ',
                link:'/editcompetition/'+Cid,
                status:'cardmenu-link',
            }
        )
    }

    return( 
            <div className='card'>
                <div className="card-header">
                    <p className='card-heading'>{CompetitionTitle}</p>
                    <p className='sub-heading'>{CompetitionLocation}</p>
                    <h5 className='card-date'>{CompetitionDate}</h5>
                </div>
                <p className='news-content'>{CompetitionDetail}</p>
                <div className='see-full' >
                    <ul className="card-select-menu">
                        <div className="card-menu see-full">ดูเพิ่ม..
                            <div className="card-menu-content">
                                {selectmenu_arr.map((selectmenu_props)=>{
                                    return(
                                        <CardMenu label={selectmenu_props.label} link={selectmenu_props.link} key={selectmenu_props.link} status={selectmenu_props.status}/>
                                    )
                                })}
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
    );
}
export default CompetitionCard;