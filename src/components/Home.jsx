import { Input } from 'antd';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleRedirect = async () => {
    navigate('/feature');
  };

  return (
    <div className="app-container">
      <video autoPlay loop muted className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content w-full">
        <Input
          placeholder="Enter your word"
          className="home_input_text"
          onPressEnter={handleRedirect}
          style={{
            background: 'transparent',
            width: '60%',
            height: '100px',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '72px',
            margin: 'auto',
          }}
        />
      </div>
    </div>
  );
};

export default Home;
