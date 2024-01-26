import CompetitionScore from './CompetitionScore'
const CompetitionDetail = ({NewsHeader,NewsLocation,NewsMatchDate,NewsContent,Cid,apiserver}) => {

    return( 
        <div className='section'>
            <div className='container-full-width'>
                <div className="section-header">
                    <h1 className='section-header-text'>{NewsHeader}</h1>
                    <p className="section-header-date">{NewsMatchDate}</p>
                </div>
                <div className='competition-content'>

                    {/*     placed     */}
                    <div className='container-full-width p-2'>
                        <div className="section-header">
                            <h3 className='section-header-text'>รางวัล</h3>
                            <p className="section-header-date">{}</p>
                        </div>
                        
                    </div>
                    {/*     ScoreTable     */}
                    <div className='container-full-width p-2'>
                        <div className="section-header">
                            <h3 className='section-header-text'>ตารางคะแนน</h3>
                            <p className="section-header-date">{NewsMatchDate}</p>
                        </div>
                        <CompetitionScore competitionid={Cid} apiserver={apiserver}/> 
                    </div>
                
                </div>
            </div>
        </div>
    );
}
export default CompetitionDetail;