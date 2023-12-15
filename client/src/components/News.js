import NewsContainer from "./NewsContainer";

    const Data = [
        {
            ID:'1',
            NewsHeader:'แมทท์หมื่น สองหัว ประจำเดือนธันวาคม ลงทะเบียนคันละ 350 บาท',
            NewsLocation:'บ่อตกปลา หนองโป่งนกเป้า เทศบาลตำบลโนนสูง ตำบลโนนสูง อำเภอเมือง จังหวัดอุดรธานี',
            NewsMatchDate:'วันที่: 03-12-2566',
            NewsContent:'Consequat dolore mollit veniam elit ad commodo fugiat excepteur anim deserunt.Nulla occaecat ipsum voluptate cillum voluptate reprehenderit commodo velit non est proident occaecat reprehenderit.',
        },
        {
            ID:'2',
            NewsHeader:'แมทท์แสนหนึ่งหัว ห้าหมื่นสองหัว ลงทะเบียนคันละ 700 บาท',
            NewsLocation:'บ้านสามพร้าว ตำบลหมากแข้ง อำเภอเมือง จังหวัดอุดรธานี',
            NewsMatchDate:'วันที่: วว-ดด-ปปปป',
            NewsContent:'Consequat dolore mollit veniam elit ad commodo fugiat excepteur anim deserunt.Nulla occaecat ipsum voluptate cillum voluptate reprehenderit commodo velit non est proident occaecat reprehenderit.',
        }
    ];
const ContentNews = () => {
    return (
    <div className='section'>
        <div className="section-header">
            <h1 className='section-header-text'>ประชาสัมพันธ์</h1>
            <p className="section-header-date">การแข่งขัน</p>
        </div>
        <div className='row-2'>
            {Data.map((NewsProps)=>{
                return(
                    <NewsContainer NewsHeader={NewsProps.NewsHeader} NewsLocation={NewsProps.NewsLocation} 
                    NewsMatchDate={NewsProps.NewsMatchDate} NewsContent={NewsProps.NewsContent} key={NewsProps.ID}/>
                    )
                })}
        </div>              
    </div>
    )
}
export default ContentNews;