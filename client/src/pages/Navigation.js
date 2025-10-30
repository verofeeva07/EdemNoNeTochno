import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>Едем, но это не точно</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Главная
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/registration" 
              className={`nav-link ${location.pathname === '/registration' ? 'active' : ''}`}
            >
              Регистрация
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/test-drive" 
              className={`nav-link ${location.pathname === '/test-drive' ? 'active' : ''}`}
            >
              Заявка на тест-драйв
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/admin" 
              className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
            >
              Админ-панель
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}