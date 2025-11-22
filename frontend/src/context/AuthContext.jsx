import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('medbay_user');
    const token = localStorage.getItem('medbay_token');

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await api.post('/login', { email, senha });
      
      const { token, id, nome, tipo } = response.data;
      const loggedUser = { id, nome, email, tipo };

      localStorage.setItem('medbay_user', JSON.stringify(loggedUser));
      localStorage.setItem('medbay_token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(loggedUser);
      return true;
    } catch (error) {
        console.error(error);
        return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('medbay_user');
    localStorage.removeItem('medbay_token');
    api.defaults.headers.common['Authorization'] = null;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};