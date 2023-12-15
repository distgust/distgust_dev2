const NewsContainer = ({NewsHeader,NewsLocation,NewsMatchDate,NewsContent}) => {
    return(
            <div className='card'>
                <div className="card-header">
                    <p className='card-heading'>{NewsHeader}</p>
                    <p className='sub-heading'>{NewsLocation}</p>
                    <h5 className='card-date'>{NewsMatchDate}</h5>
                </div>
                <p className='news-content'>{NewsContent}</p>
                <p className='see-full'>...ดูเพิ่ม</p>
            </div>
    );
}
export default NewsContainer;