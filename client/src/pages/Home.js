import '../components/CSS/Home.css';
import Headers from '../components/Header';
import ContentNews from '../components/News';
import TopNav from '../components/TopNav';
import ContentLastmatch from '../components/Lastmatch';

let pagetitle = 'หน้าหลัก';
const Home = () => {
  return (
    <>
        <Headers pagetitle={pagetitle}/>
            <main className="col-12">
                <TopNav/>
                <ContentNews/>
                <ContentLastmatch/>
            </main>
    </>
    );
}

export default Home
