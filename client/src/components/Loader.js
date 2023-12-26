import { RingLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="container contents-center">
      <RingLoader color={'#F9A26C'} loading={true} size={300} />
    </div>
  );
};

export default Loader;