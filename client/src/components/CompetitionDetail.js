import CompetitionScore from './CompetitionScore'
import CompetitionReward from './CompetitionReward';
const CompetitionDetail = ({CompetitionTitle,CompetitionLocation,CompetitionDate,CompetitionDetail,CompetitionStatus,Cid,apiserver}) => {
    const goBack = () => {
        window.history.back();
    };
    return( 
        <div className='section'>
            <div className='container-full-width'>
                <input type='button' className='primary-btn' onClick={goBack} value={'ย้อนกลับ'}/>
                <div className='container-full-width align-center pt-0'>
                    <div className="section-header ">
                        <h1 className='section-header-text'>{CompetitionTitle}</h1>
                        <p className="section-header-text">{CompetitionDate}</p>
                    </div>
                </div>
                <div className='competition-content mt-0'>
                {
                        CompetitionStatus === 'end'?
                        <>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>สรุปผลการแข่งขัน</h2>
                                </div>
                                    <CompetitionReward competitionid={Cid} apiserver={apiserver}/> 
                            </div>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>ตารางคะแนน</h2>
                                    <p className="section-header-date">{CompetitionDate}</p>
                                </div>
                                    <CompetitionScore competitionid={Cid} apiserver={apiserver}/>
                            </div>
                        </>:null
                    }
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
                            <p className="section-header-date">{CompetitionDate}</p>
                        </div>
                        <CompetitionScore competitionid={Cid} apiserver={apiserver}/> 
                    </div>

                </div>
            </div>
        </div>
    );
}
export default CompetitionDetail;