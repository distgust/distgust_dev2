const CompetitionContainer = ({NewsHeader,NewsLocation,NewsMatchDate,NewsContent,apiserver}) => {
    const readmore = async (event) => {
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
    
    return( 
            <div className='card'>
                <div className="card-header">
                    <p className='card-heading'>{NewsHeader}</p>
                    <p className='sub-heading'>{NewsLocation}</p>
                    <h5 className='card-date'>{NewsMatchDate}</h5>
                </div>
                <p className='news-content'>{NewsContent}</p>
                <p className='see-full' ><button onClick={readmore}>...ดูเพิ่ม</button></p>
            </div>
    );
}
export default CompetitionContainer;