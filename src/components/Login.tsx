import React, { useState } from 'react';

const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add validation or API call here if needed
    onLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center text-foreground">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-1 block w-full p-2 border border-muted rounded focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="mt-1 block w-full p-2 border border-muted rounded focus:outline-none focus:ring focus:ring-primary focus:border-transparent"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 bg-primary text-white font-semibold rounded hover:bg-primary-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
