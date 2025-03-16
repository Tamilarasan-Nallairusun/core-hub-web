import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <p>Welcome! Please log in.</p>
      <Link to="/register" className="text-blue-500">Go to Register</Link>
     
    </div>
  );
};

export default Login;
