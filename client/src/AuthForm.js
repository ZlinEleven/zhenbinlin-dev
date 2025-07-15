import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

const AuthForm = ({ mode = 'login' }) => {
    const { login, signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (mode === 'login') {
                await login(email, password);
            } else {
                await signup(email, password);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-xs">
                <h2 className="text-xl font-bold mb-4 text-center">
                    {mode === 'login' ? 'Login' : 'Sign Up'}
                </h2>
                {error && <div className="mb-2 text-red-600 text-sm text-center">{error}</div>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                        autoComplete="username"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
                </button>
            </form>
        </div>
    );
};

export default AuthForm; 