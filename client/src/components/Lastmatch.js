import EventCalendar from "./EventCalendar";

const ContentLastmatch = () => {
    const currentDate = new Date();
    const thisDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

    return(
        <div className='section'>
            <div className="section-header">
                <h1 className="section-header-text">ปฏิทินการแข่งขัน</h1>
                <p className='section-header-date'>{thisDay} {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</p>
            </div>
            <div className="container-border-0">
                <EventCalendar/>
            </div>
        </div>
    )}
export default ContentLastmatch;