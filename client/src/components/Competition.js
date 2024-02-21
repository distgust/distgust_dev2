import CompetitionScoreUserView from './CompetitionScoreUserView'
import CompetitionReward from './CompetitionReward';
import CompetitionReport from './CompetitionReport';
import AddScoresForm from './form/AddScoreForm';
import StartBtn from './StartBtn';
import CompetitionRegister from './form/CompetitionRegisterForm';
import NumberTable from './NumberTable';

const Competition = ({CompetitionTitle,CompetitionLocation,CompetitionDate,CompetitionDetail,CompetitionStatus,CompetitionCost,Cid,apiserver}) => {
    
    const goBack = () => {
        window.history.back();
    };

    return( 
        <div className='section'>
            
            <div className='container-full-width'>
                
                <div className='container-full-width align-center pt-0'>
                    <div className="section-header ">
                        <h1 className='section-header-text'>{CompetitionTitle}</h1>
                        <p className="section-header-text">{CompetitionDate}</p>
                    </div>
                    <div className='row-2'>
                        <div className='container'>
                            <input type='button' className='back-btn' onClick={goBack} value={'ย้อนกลับ'}/>
                        </div>
                            <StartBtn CompetitionID={Cid} CompetitionStatus={CompetitionStatus} apiserver={apiserver}/>           
                    </div>
                </div>
                <div className='competition-content mt-0'>
                    {
                        CompetitionStatus === 'start'?
                        <>  <div className='container-full-width p-2 pb-0'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>ผลอันดับปัจจุบัน</h2>
                                </div>
                                <CompetitionReport competitionid={Cid} apiserver={apiserver}/>
                            </div>
                            <div className='container-full-width p-2 pb-0'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>ลงทะเบียนแข่งขัน</h2>
                                </div>
                                <CompetitionRegister competitionid={Cid} apiserver={apiserver} CompetitionCost={CompetitionCost}/>
                            </div>
                            <div className='container-full-width p-2 pb-0'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>เบอร์ที่ลงทะเบียน</h2>
                                </div>
                                <NumberTable key={'NumberTable'+Cid} competitionid={Cid} apiserver={apiserver}  itemsPerPage={5}/>
                            </div>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>บันทึกน้ำหนักปลา</h2>
                                </div>
                                <AddScoresForm competitionid={Cid} apiserver={apiserver}  CompetitionDate={CompetitionDate}/>
                            </div>
                        </>
                        :CompetitionStatus === 'plan'?
                        <div className='container-full-width p-2 text-center'>
                                <div className="section-header ">
                                    <h2 className='section-header-text'>ยังไม่เริ่มแข่งขัน</h2>
                                </div>
                                <div className='section-content'>
                                    <h3 className='card-heading'>คลิกที่ปุ่มเริ่มการแข่งขันเพื่อเริ่มบันทึกคะแนน</h3>
                                    <CompetitionReward competitionid={Cid} apiserver={apiserver}/>                                           
                                </div>
                            </div>
                            :CompetitionStatus === 'end'?
                        <>
                            <div className='container-full-width p-2 text-center'>
                                <div className="section-header ">
                                    <h1 className='section-header-text'>การแข่งขันจบแล้ว</h1>
                                    
                                    <h2 className='section-header-text'>สรุปผลการแข่งขัน</h2>
                                </div>
                                <CompetitionReport competitionid={Cid} apiserver={apiserver}/>
                            </div>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>ตารางคะแนน</h2>
                                    <p className="section-header-date">{CompetitionDate}</p>
                                </div>
                                    <CompetitionScoreUserView competitionid={Cid} apiserver={apiserver}/>
                            </div>
                        </>
                        :null
                    }                   

                </div>
            </div>
        </div>
    );
}
export default Competition;