import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { LoginRequest, LoginResponse } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  admin: LoginResponse['admin'] | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    admin: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    
    console.log('🔍 useAuth - Verificando:', { 
      token: token ? 'presente' : 'ausente', 
      admin: admin ? 'presente' : 'ausente',
      tokenLength: token?.length || 0
    });
    
    if (token && admin) {
      console.log('✅ useAuth - Usuario autenticado');
      setAuthState({
        isAuthenticated: true,
        admin: JSON.parse(admin),
        loading: false,
      });
    } else {
      console.log('❌ useAuth - Usuario NO autenticado');
      setAuthState({
        isAuthenticated: false,
        admin: null,
        loading: false,
      });
    }
  }, []);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const response = await apiService.login(credentials);
      localStorage.setItem('token', response.token);
      localStorage.setItem('admin', JSON.stringify(response.admin));
      
      setAuthState({
        isAuthenticated: true,
        admin: response.admin,
        loading: false,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setAuthState({
      isAuthenticated: false,
      admin: null,
      loading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
};

