import React, { useState } from 'react';
import VolunteerRegistration from './volunteer/VolunteerRegistration'; 

const Login: React.FC<{ onLogin: (loginType: 'admin' | 'existing_user' | 'new_user') => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(''); 
  const [loginType, setLoginType] = useState<'admin' | 'existing' | 'new'>('existing');

  const handleSubmit = () => {
    setError(''); 
    setConfirmationMessage(''); 

    if (loginType === 'new') {
      // Simulate successful sign up
      setConfirmationMessage('We recorded your sign up, check email for further instructions!');
      return; 
    }

    // Existing login logic
    if (loginType === 'admin' && email === 'admin@example.com' && password === 'adminpassword') {
      onLogin('admin');
    } else if (loginType === 'existing' && email === 'user@example.com' && password === 'userpassword') {
      onLogin('existing_user');
    } else {
      setError('Invalid credentials or details. Please try again.');
    }
  };

  const handleSliderChange = (value: 'admin' | 'existing' | 'new') => {
    setLoginType(value);
  };

  return (
    <div className="flex min-h-screen bg-background p-4"> 
      <div className="bg-card p-10 rounded-lg shadow-lg w-full max-w-xl"> 
        <h1 className="text-3xl font-semibold mb-6 text-foreground">Login</h1>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <div className="flex flex-col items-center" style={{ width: 150 }}>
              <span 
                className={`cursor-pointer ${loginType === 'admin' ? 'font-bold' : ''}`} 
                onClick={() => handleSliderChange('admin')}
                style={{ fontSize: '12px', whiteSpace: 'nowrap' }} 
              >
                Admin Login
              </span>
            </div>
            <div className="flex flex-col items-center" style={{ width: 150 }}>
              <span 
                className={`cursor-pointer ${loginType === 'existing' ? 'font-bold' : ''}`} 
                onClick={() => handleSliderChange('existing')}
                style={{ fontSize: '12px', whiteSpace: 'nowrap' }} 
              >
                Existing Account
              </span>
            </div>
            <div className="flex flex-col items-center" style={{ width: 150 }}>
              <span 
                className={`cursor-pointer ${loginType === 'new' ? 'font-bold' : ''}`} 
                onClick={() => handleSliderChange('new')}
                style={{ fontSize: '12px', whiteSpace: 'nowrap' }} 
              >
                Create New Account
              </span>
            </div>
          </div>
          <div className="relative w-full bg-gray-300 rounded h-2">
            <div
              className={`absolute h-full bg-primary rounded transition-all duration-300 ease-in-out ${
                loginType === 'admin' ? 'w-1/3 left-0' : 
                loginType === 'existing' ? 'w-1/3 left-1/3' : 
                'w-1/3 left-2/3'
              }`}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {confirmationMessage && <p className="text-green-500 text-center mb-4">{confirmationMessage}</p>} {/* Confirmation message */}

        <form onSubmit={(e) => e.preventDefault()}>
          {loginType === 'new' ? (
            <VolunteerRegistration /> // Reference to the VolunteerRegistration component
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground">Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="mt-1 block w-full p-4 border border-muted rounded focus:outline-none focus:ring focus:ring-primary focus:border-transparent" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground">Password:</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="mt-1 block w-full p-4 border border-muted rounded focus:outline-none focus:ring focus:ring-primary focus:border-transparent" 
                />
              </div>
              <button 
                type="button" // Change to type="button"
                onClick={handleSubmit} // Call handleSubmit on click
                className="w-full py-3 bg-primary text-white font-semibold rounded hover:bg-primary-700 transition duration-200"
              >
                {loginType === 'existing' ? 'Login' : 'Admin Login'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
