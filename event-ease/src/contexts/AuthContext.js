import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage if available
  const savedUser = JSON.parse(localStorage.getItem('currentUser'));
  const [user, setUser] = useState(savedUser || {
    isAuthenticated: false,
    role: 'user',
    username: ''
  });

  const login = async (username, password) => {
    try {
      // First check if it's an admin login
      if (username === 'admin' && password === 'admin123') {
        const adminUser = {
          isAuthenticated: true,
          role: 'admin',
          username: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        return true;
      }

      // If not admin, check if it's a student login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.studentId === username);

      if (user && user.password === password) {
        const studentUser = {
          isAuthenticated: true,
          role: 'student',
          username: user.studentId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          program: user.program
        };
        setUser(studentUser);
        localStorage.setItem('currentUser', JSON.stringify(studentUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Add a method to get the current user
  const getCurrentUser = () => {
    return user;
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      role: 'user',
      username: ''
    });
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
