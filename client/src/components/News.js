import { useState } from "react";
import NewsContainer from "./NewsContainer";
import { useEffect } from "react";
import Loader from "./Loader";

const ContentNews = () => {
    const [NewsDatas, setNewsDatas] = useState([]);
    const [loading, setLoading] = useState(true);
    //fetch newstable
    useEffect(() => {
        fetch('http://192.168.0.101:3000/api/news', {
            method: 'GET',
            mode: 'cors',
            headers:{
                'Content-type' : 'application/json'
            }
        })
        .then((response) => response.json())
        .then((result) => setNewsDatas(result.data))
        .catch((error) => alert('Error fetching data:', error))
        .finally(() => setLoading(false));
    },[]);
    if (loading) {
        console.log('loading...')
        return (
        <div className='section'>
            <div className="section-header">
                <h1 className='section-header-text'>ประชาสัมพันธ์</h1>
                <p className="section-header-date">การแข่งขัน</p>
            </div>
            <Loader/>
        </div>
        )
    }
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