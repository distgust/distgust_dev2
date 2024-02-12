import CompetitionScore from './CompetitionScore'
import CompetitionReward from './CompetitionReward';
import AddScoresForm from './form/AddScoreForm';
import StartBtn from './StartBtn';

const Competition = ({CompetitionTitle,CompetitionLocation,CompetitionDate,CompetitionDetail,CompetitionStatus,Cid,apiserver}) => {
    
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
                        <>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>บันทึกน้ำหนักปลา</h2>
                                </div>
                                <AddScoresForm competitionid={Cid} apiserver={apiserver} CompetitionDate={CompetitionDate}/>
                            </div>
                            <div className='container-full-width p-2'>
                                <div className="section-header">
                                    <h2 className='section-header-text'>รางวัล</h2>
                                </div>
                                    <CompetitionReward competitionid={Cid} apiserver={apiserver}/>
                            </div>
                        </>:CompetitionStatus === 'plan'?
                        <div className='container-full-width p-2 text-center'>
                                <div className="section-header ">
                                    <h2 className='section-header-text'>ยังไม่เริ่มแข่งขัน</h2>
                                </div>
                                <div className='section-content'>
                                    <h3 className='card-heading'>คลิกที่ปุ่มเริ่มการแข่งขันเพื่อเริ่มบันทึกคะแนน</h3>
                                    <CompetitionReward competitionid={Cid} apiserver={apiserver}/>                                           
                                </div>
                            </div>:CompetitionStatus === 'end'?
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

                </div>
            </div>
        </div>
    );
}
export default Competition;