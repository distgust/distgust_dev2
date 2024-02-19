import CompetitionReward from './CompetitionReward';
import CompetitionReport from './CompetitionReport';
import CompetitionScoreUserView from './CompetitionScoreUserView';
import NumberTable from './NumberTable';
const CompetitionDetail = ({CompetitionTitle,CompetitionLocation,CompetitionDate,CompetitionDetail,CompetitionStatus,Cid, apiserver, CompetitionCost}) => {
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
                            <div className='container-full-width p-2 text-center'>
                            <div className="section-header ">
                                    <h1 className='section-header-text'>การแข่งขันจบแล้ว</h1>
                                    <h2 className='section-header-text'>สรุปผลการแข่งขัน</h2>
                                </div>
                                    <CompetitionReward competitionid={Cid} apiserver={apiserver}/> 
                            </div>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>กระดานคะแนน</h2>
                                    <p className="section-header-date">{CompetitionDate}</p>
                                </div>
                                    <CompetitionScoreUserView competitionid={Cid} apiserver={apiserver}/>
                            </div>
                        </>
                        :CompetitionStatus === 'start'?
                        <>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>ผลอันดับขณะนี้</h2>
                                </div>
                                <CompetitionReport competitionid={Cid} apiserver={apiserver}/>
                            </div>

                            
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>กระดานคะแนน</h2>
                                    <p className="section-header-date">{CompetitionDate}</p>
                                </div>
                                <CompetitionScoreUserView competitionid={Cid} apiserver={apiserver}/> 
                            </div>
                            

                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>หมายเลขที่ลงทะเบียนทั้งหมด</h2>
                                    <p className="section-header-date">{CompetitionDate}</p>
                                </div>
                                <NumberTable key={'NumberTable'+Cid} competitionid={Cid} apiserver={apiserver}  itemsPerPage={10} CompetitionCost={CompetitionCost}/> 
                            </div>
                        </>
                        :CompetitionStatus === 'plan'?
                        <div className='container-full-width p-2 text-center'>
                            <div className="section-header ">
                                <h2 className='section-header-text'>ยังไม่เริ่มแข่งขัน</h2>
                            </div>     
                            <CompetitionReward competitionid={Cid} apiserver={apiserver}/>
                        </div>   
                        :null               
                    }       
                </div>
            </div>
        </div>
    );
}
export default CompetitionDetail;