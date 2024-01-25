import ScoresTable from './ScoresTable'
const CompetitionView = ({NewsHeader,NewsLocation,NewsMatchDate,NewsContent,Cid,apiserver}) => {

    return( 
        <div className='section'>
            <div className='container-full-width'>
                <div className="section-header">
                    <h1 className='section-header-text'>{NewsHeader}</h1>
                    <p className="section-header-date">{NewsMatchDate}</p>
                </div>
                <div className='competition-content'>
                    <div className='section'>
                        <div className='container-full-width'>
                            <ScoresTable competitionid={Cid} apiserver={apiserver}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CompetitionView;