import '../components/CSS/Home-News.css';
import Headers from '../components/Header';
import News from '../components/News';
import TopNav from '../components/TopNav';
let pagetitle = 'หน้าหลัก';
const Home = () => {
  return (
    <>
        <Headers pagetitle={pagetitle}/>
            <main className="col-12">
                <TopNav/>
                <News/>
            </main>
    </>
    );
}

export default Home
