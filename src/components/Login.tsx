import React, { useState } from 'react';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState<'admin' | 'existing' | 'new'>('existing');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginType === 'admin' && email === 'admin@example.com' && password === 'adminpassword') {
      setError('');
      onLogin();
    } else if (loginType === 'existing' && email === 'user@example.com' && password === 'userpassword') {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials or details. Please try again.');
    }
  };

  const handleGoToHome = () => {
    onLogin();
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

        <form onSubmit={handleSubmit}>
          {loginType === 'new' ? (
            <div className="mb-4 text-center">
              <button 
                type="button" 
                onClick={handleGoToHome} 
                className="w-full py-3 bg-primary text-white font-semibold rounded hover:bg-primary-700 transition duration-200"
              >
                Go to Home
              </button>
            </div>
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
                type="submit" 
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
