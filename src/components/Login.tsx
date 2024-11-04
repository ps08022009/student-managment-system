import React, { useState } from 'react';

const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
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
    } else if (loginType === 'new' && email && password) {
      setError('');
      alert('Account created successfully!');
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

        <div className="relative mb-4">
          <div className="flex justify-between mb-1">
            <span className={`cursor-pointer ${loginType === 'admin' ? 'font-bold' : ''}`} onClick={() => handleSliderChange('admin')}>Admin Login</span>
            <span className={`cursor-pointer ${loginType === 'existing' ? 'font-bold' : ''}`} onClick={() => handleSliderChange('existing')}>Existing Account</span>
            <span className={`cursor-pointer ${loginType === 'new' ? 'font-bold' : ''}`} onClick={() => handleSliderChange('new')}>Create New Account</span>
          </div>
          <div className="relative w-full bg-gray-300 rounded h-2">
            <div
              className={`absolute h-full bg-primary rounded transition-all duration-300 ease-in-out ${
                loginType === 'admin' ? 'w-1/3 left-0' : loginType === 'existing' ? 'w-1/3 left-1/3' : 'w-1/3 left-2/3'
              }`}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
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
            {loginType !== 'new' && (
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="mt-1 block w-full p-4 border border-muted rounded focus:outline-none focus:ring focus:ring-primary focus:border-transparent" 
              />
            )}
            {loginType === 'new' && (
              <p className="mt-1 text-sm text-foreground">Set your password:</p>
            )}
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-primary text-white font-semibold rounded hover:bg-primary-700 transition duration-200"
          >
            {loginType === 'new' ? 'Create Account' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
