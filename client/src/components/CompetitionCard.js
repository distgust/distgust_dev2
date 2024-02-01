import {useState,useEffect} from 'react'
import CardMenu from './CardMenu';

const CompetitionCard = ({NewsHeader,NewsLocation,NewsMatchDate,NewsContent,Cid,apiserver}) => {
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
        },
        {
            label:'คะแนน',
            link:'/score/'+Cid,
            status:'cardmenu-link',
        }
    ];

    if(role){
        selectmenu_arr.push(
            {
                label:'เริ่มการแข่งขัน',
                link:'/startcompetition/'+Cid,
                status:'topnav-li',
            },
            {
                label:'แก้ไข/ลบ',
                link:'/editcompetition/'+Cid,
                status:'topnav-li',
            }
        )
    }

    return( 
            <div className='card'>
                <div className="card-header">
                    <p className='card-heading'>{NewsHeader}</p>
                    <p className='sub-heading'>{NewsLocation}</p>
                    <h5 className='card-date'>{NewsMatchDate}</h5>
                </div>
                <p className='news-content'>{NewsContent}</p>
                <div className='see-full' >
                    <ul className="card-select-menu">
                        <div className="card-menu see-full">การจัดการ
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