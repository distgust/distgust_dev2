import { SyncLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="container contents-center">
      <SyncLoader color={'#F9A26C'} loading={true} size={50} margin={10}/>
    </div>
  );
};

export default Loader;