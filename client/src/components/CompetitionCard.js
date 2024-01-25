import CardMenu from './CardMenu';

const CompetitionCard = ({NewsHeader,NewsLocation,NewsMatchDate,NewsContent,Cid,apiserver}) => {
/*    const readmore = async (event) => {
        try {
            // Replace the URL with your actual API endpoint
            const response = await fetch(apiserver+'/api/news');
            const data = await response.json();
        
            // Open a new window or tab and display the fetched data
            const newWindow = window.open('', '_blank');
            newWindow.document.write(JSON.stringify(data));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
*/
        const selectmenu_arr = [
            {
                label:'รายละเอียด',
                link:'/competition/'+Cid,
                status:'cardmenu-link',
            },
            {
                label:'คะแนน',
                link:'/dashboard',
                status:'cardmenu-link',
            },
        ];

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