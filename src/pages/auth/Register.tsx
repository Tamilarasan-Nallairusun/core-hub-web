import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <p>Welcome! Please register in.</p>
      <Link to="/login" className="text-blue-500">Go to Log in</Link>
    </div>
  );
};

export default Register;
