import React, { useState } from 'react'
import { HTTP } from '../http'
import './Registration.css'

export default function Registration() { 
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const validateForm = () => {
    // Проверка ФИО (только кириллица и пробелы)
    const nameRegex = /^[а-яА-ЯёЁ\s]+$/
    if (!nameRegex.test(fullName)) {
      setMessage('ФИО должно содержать только кириллические символы и пробелы')
      return false
    }

    // Проверка телефона
    const phoneRegex = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/
    if (!phoneRegex.test(phone)) {
      setMessage('Телефон должен быть в формате +7(XXX)-XXX-XX-XX')
      return false
    }

    // Проверка email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage('Введите корректный email адрес')
      return false
    }

    // Проверка пароля
    if (password.length < 6) {
      setMessage('Пароль должен содержать минимум 6 символов')
      return false
    }

    return true
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 1) return '+7('
    if (numbers.length <= 4) return `+7(${numbers.slice(1, 4)}`
    if (numbers.length <= 7) return `+7(${numbers.slice(1, 4)})-${numbers.slice(4, 7)}`
    if (numbers.length <= 9) return `+7(${numbers.slice(1, 4)})-${numbers.slice(4, 7)}-${numbers.slice(7, 9)}`
    return `+7(${numbers.slice(1, 4)})-${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const registerUser = async () => {
    if (!fullName || !phone || !email || !login || !password) {
      setMessage('Пожалуйста, заполните все поля')
      return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setMessage('')
    
    try {
      await HTTP.post('/user/register', {
        full_name: fullName,
        phone,
        email,
        login,
        password
      })
      setMessage('Регистрация прошла успешно! Теперь вы можете войти в систему.')
      // Очистка формы
      setFullName('')
      setPhone('')
      setEmail('')
      setLogin('')
      setPassword('')
    } catch (e) {
      setMessage('Ошибка при регистрации: ' + e.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="registration-container">
      <div className="form-card">
        <h1 className="form-title">Регистрация в системе</h1>
        
        <div className="form-group">
          <label className="form-label">ФИО *</label>
          <input 
            className="form-input"
            type="text"
            onChange={e => setFullName(e.currentTarget.value)} 
            value={fullName}
            placeholder="Иванов Иван Иванович"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Телефон *</label>
          <input 
            className="form-input"
            type="tel"
            onChange={handlePhoneChange} 
            value={phone}
            placeholder="+7(XXX)-XXX-XX-XX"
            maxLength="18"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input 
            className="form-input"
            type="email"
            onChange={e => setEmail(e.currentTarget.value)} 
            value={email}
            placeholder="example@mail.com"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Логин *</label>
          <input 
            className="form-input"
            type="text"
            onChange={e => setLogin(e.currentTarget.value)} 
            value={login}
            placeholder="Придумайте уникальный логин"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Пароль *</label>
          <input 
            className="form-input"
            type="password"
            onChange={e => setPassword(e.currentTarget.value)} 
            value={password}
            placeholder="Минимум 6 символов"
          />
        </div>
        
        <button 
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
          onClick={registerUser}
          disabled={isLoading}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
        
        {message && (
          <div className={`message ${message.includes('Ошибка') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}