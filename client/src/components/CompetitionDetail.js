import CompetitionScore from './CompetitionScore'
import CompetitionReward from './CompetitionReward';
const CompetitionDetail = ({NewsHeader,NewsLocation,NewsMatchDate,NewsContent,Cid,apiserver}) => {
    const goBack = () => {
        window.history.back();
    };
    return( 
        <div className='section'>
            <div className='container-full-width'>
                <input type='button' className='primary-btn' onClick={goBack} value={'ย้อนกลับ'}/>
                <div className='container-full-width align-center pt-0'>
                    <div className="section-header ">
                        <h1 className='section-header-text'>{NewsHeader}</h1>
                        <p className="section-header-text">{NewsMatchDate}</p>
                    </div>
                </div>
                <div className='competition-content mt-0'>

                    {/*     reward     */}
                    <div className='container-full-width p-2'>
                        <div className="section-header">
                            <h2 className='section-header-text'>รางวัล</h2>
                        </div>
                        <CompetitionReward competitionid={Cid} apiserver={apiserver}/>
                    </div>

                    {/*     ScoreTable     */}
                    <div className='container-full-width p-2'>
                        <div className="section-header">
                            <h2 className='section-header-text'>ตารางคะแนน</h2>
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