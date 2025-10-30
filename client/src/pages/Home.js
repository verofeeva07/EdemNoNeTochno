 
import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() { 
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Едем, но это не точно</h1>
          <p className="hero-subtitle">
            Запишитесь на тест-драйв автомобиля вашей мечты и почувствуйте все преимущества перед покупкой
          </p>
          <div className="hero-actions">
            <Link to="/registration" className="cta-button primary">
              Начать регистрацию
            </Link>
            <Link to="/test-drive" className="cta-button secondary">
              Записаться на тест-драйв
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚗</div>
            <h3>Широкий выбор авто</h3>
            <p>Тест-драйвы популярных марок и моделей автомобилей</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Удобное время</h3>
            <p>Выбирайте удобные дату и время для тест-драйва</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Разные способы оплаты</h3>
            <p>Оплачивайте наличными или банковской картой</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Безопасно и надежно</h3>
            <p>Все автомобили застрахованы и проходят регулярное ТО</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>Как это работает</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Регистрация</h4>
            <p>Заполните простую форму регистрации в системе</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Выбор авто</h4>
            <p>Выберите марку и модель автомобиля для тест-драйва</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Запись</h4>
            <p>Укажите удобные дату, время и способ оплаты</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h4>Тест-драйв</h4>
            <p>Приходите в назначенное время и наслаждайтесь поездкой</p>
          </div>
        </div>
      </div>
    </div>
  )
}
 