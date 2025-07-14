import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
    const baseURL = API_BASE_URL;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Signup
    async function signup(email, password) {
        const res = await fetch(`${baseURL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Signup failed');
        const data = await res.json();
        setUser(data.user);
        return data;
    }

    // Login
    async function login(email, password) {
        const res = await fetch(`${baseURL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
        const data = await res.json();
        setUser(data.user);
        return data;
    }

    // Logout
    async function logout() {
        await fetch(`${baseURL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        setUser(null);
    }

    const value = { user, loading, login, signup, logout, isAuthenticated: !!user };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 