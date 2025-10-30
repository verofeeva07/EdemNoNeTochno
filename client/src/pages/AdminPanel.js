import React, { useEffect, useState } from 'react'
import { HTTP } from '../http'
import './AdminPanel.css'

export default function AdminPanel() {
  const [testDrives, setTestDrives] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      getTestDrives()
    }
  }, [isAuthenticated])

  const getTestDrives = async() => {
    try {
      const data = await HTTP.get('/test-drive/all')
      setTestDrives(data.testDrives || [])
    } catch (error) {
      console.error('Error fetching test drives:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (login === 'avto2024' && password === 'poehali') {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Неверный логин или пароль')
    }
  }

  const updateStatus = async (id, newStatus) => {
    try {
      await HTTP.post('/test-drive/update-status', {
        id,
        status: newStatus
      })
      // Обновляем локальное состояние
      setTestDrives(prev => prev.map(td => 
        td.id === id ? {...td, status: newStatus} : td
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Вход в панель администратора</h1>
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label className="form-label">Логин</label>
              <input 
                className="form-input"
                type="text"
                value={login}
                onChange={e => setLogin(e.target.value)}
                placeholder="Введите логин"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Пароль</label>
              <input 
                className="form-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </div>
            {authError && (
              <div className="message error">{authError}</div>
            )}
            <button type="submit" className="submit-btn">
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">Загрузка заявок...</div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Панель администратора</h1>
        <div className="admin-stats">
          <div className="stat-item">
            <span className="stat-number">{testDrives.length}</span>
            <span className="stat-label">Всего заявок</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {testDrives.filter(td => td.status === 'pending').length}
            </span>
            <span className="stat-label">В обработке</span>
          </div>
        </div>
      </div>
      
      {testDrives.length === 0 ? (
        <div className="empty-state">
          <h3>Заявки не найдены</h3>
          <p>Нет заявок на тест-драйв</p>
        </div>
      ) : (
        <div className="admin-test-drives-list">
          {testDrives.map((testDrive) => (
            <div key={testDrive.id} className="admin-test-drive-card">
              <div className="test-drive-header">
                <div className="test-drive-id">Заявка №{testDrive.id}</div>
                <div className={`status-badge ${testDrive.status || 'pending'}`}>
                  {testDrive.status === 'approved' ? 'Одобрено' : 
                   testDrive.status === 'completed' ? 'Выполнено' : 
                   testDrive.status === 'rejected' ? 'Отклонено' : 'В обработке'}
                </div>
              </div>
              
              <div className="test-drive-details">
                <div className="detail-section">
                  <h4>Клиент</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">ФИО:</span>
                      <span className="detail-value">{testDrive.full_name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Телефон:</span>
                      <span className="detail-value">{testDrive.contact_phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{testDrive.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Адрес:</span>
                      <span className="detail-value">{testDrive.address}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Водительское удостоверение</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Серия и номер:</span>
                      <span className="detail-value">{testDrive.license_series} {testDrive.license_number}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Дата выдачи:</span>
                      <span className="detail-value">{testDrive.license_date}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Автомобиль</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Марка и модель:</span>
                      <span className="detail-value">{testDrive.car_brand} {testDrive.car_model}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Дата тест-драйва:</span>
                      <span className="detail-value">{testDrive.test_date}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Время тест-драйва:</span>
                      <span className="detail-value">{testDrive.test_time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Способ оплаты:</span>
                      <span className="detail-value">
                        {testDrive.payment_type === 'cash' ? 'Наличными' : 'Банковской картой'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-actions">
                <h4>Изменить статус:</h4>
                <div className="action-buttons">
                  <button 
                    className={`action-btn ${testDrive.status === 'approved' ? 'active' : ''}`}
                    onClick={() => updateStatus(testDrive.id, 'approved')}
                  >
                    Одобрить
                  </button>
                  <button 
                    className={`action-btn ${testDrive.status === 'completed' ? 'active' : ''}`}
                    onClick={() => updateStatus(testDrive.id, 'completed')}
                  >
                    Выполнено
                  </button>
                  <button 
                    className={`action-btn ${testDrive.status === 'rejected' ? 'active' : ''}`}
                    onClick={() => updateStatus(testDrive.id, 'rejected')}
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
 