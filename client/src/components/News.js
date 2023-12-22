import { useState } from "react";
import NewsContainer from "./NewsContainer";
import { useEffect } from "react";
    
const ContentNews = () => {
    const [NewsDatas, setNewsDatas] = useState([]);
    
    //fetch newstable
    useEffect(() => {
        fetch('http://localhost:3000/api/news', {
            method: 'GET',
            headers:{
                'Content-type' : 'application/json'
            }
        })
        .then((response) => response.json())
        .then((result) => setNewsDatas(result.data))
        .catch((error) => console.error('Error fetching data:', error));
    },[]);
    return (
    <div className='section'>
        <div className="section-header">
            <h1 className='section-header-text'>ประชาสัมพันธ์</h1>
            <p className="section-header-date">การแข่งขัน</p>
        </div>
        <div className='row-2'>
            {NewsDatas.map((NewsProps)=>{
                return(
                    <NewsContainer NewsHeader={NewsProps.NewsHeader} NewsLocation={NewsProps.NewsLocation} 
                    NewsMatchDate={NewsProps.NewsMatchDate} NewsContent={NewsProps.NewsContent} key={NewsProps.NewsID}/>
                    )
                })}
        </div>              
    </div>
    )
}
export default ContentNews;