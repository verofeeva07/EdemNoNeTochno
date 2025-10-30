import React, { useEffect, useState } from 'react'
import { HTTP } from '../http'
import './TestDrives.css'

export default function TestDrives() {
  const [testDrives, setTestDrives] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [address, setAddress] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [licenseSeries, setLicenseSeries] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [licenseDate, setLicenseDate] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [testDate, setTestDate] = useState('')
  const [testTime, setTestTime] = useState('')
  const [paymentType, setPaymentType] = useState('cash')
  const [message, setMessage] = useState('')

  const carBrands = {
    'Toyota': ['Camry', 'RAV4', 'Corolla'],
    'Honda': ['Civic', 'Accord', 'CR-V'],
    'Ford': ['Focus', 'Mondeo', 'Kuga'],
    'BMW': ['X5', '3 Series', '5 Series'],
    'Mercedes': ['C-Class', 'E-Class', 'GLC']
  }

  useEffect(() => {
    getTestDrives()
  }, [])

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
    setContactPhone(formatted)
  }
  
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

  const createTestDrive = async () => {
    if (!address || !contactPhone || !licenseSeries || !licenseNumber || !licenseDate || !selectedBrand || !selectedModel || !testDate || !testTime) {
      setMessage('Пожалуйста, заполните все обязательные поля')
      return
    }

    // Проверка телефона
    const phoneRegex = /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/
    if (!phoneRegex.test(contactPhone)) {
      setMessage('Телефон должен быть в формате +7(XXX)-XXX-XX-XX')
      return
    }

    setIsLoading(true)
    setMessage('')
    
    try {
      await HTTP.post('/test-drive/create', {
        address,
        contact_phone: contactPhone,
        license_series: licenseSeries,
        license_number: licenseNumber,
        license_date: licenseDate,
        car_brand: selectedBrand,
        car_model: selectedModel,
        test_date: testDate,
        test_time: testTime,
        payment_type: paymentType
      })
      setMessage('Заявка на тест-драйв успешно создана!')
      // Очистка формы
      setAddress('')
      setContactPhone('')
      setLicenseSeries('')
      setLicenseNumber('')
      setLicenseDate('')
      setSelectedBrand('')
      setSelectedModel('')
      setTestDate('')
      setTestTime('')
      setPaymentType('cash')
      // Обновление списка
      getTestDrives()
    } catch (e) {
      setMessage('Ошибка при создании заявки: ' + e.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && testDrives.length === 0) {
    return (
      <div className="test-drives-container">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="test-drives-container">
      <div className="test-drive-form-section">
        <div className="form-card">
          <h1 className="form-title">Заявка на тест-драйв</h1>
          
          <div className="form-group">
            <label className="form-label">Адрес *</label>
            <input 
              className="form-input"
              type="text"
              onChange={e => setAddress(e.currentTarget.value)} 
              value={address}
              placeholder="Введите ваш адрес"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Контактный телефон *</label>
            <input 
              className="form-input"
              type="tel"
              onChange={handlePhoneChange} 
              value={contactPhone}
              placeholder="+7(XXX)-XXX-XX-XX"
              maxLength="18"
            />
          </div>

          <div className="form-section">
            <h3 className="section-title">Водительское удостоверение</h3>
            <div className="license-fields">
              <div className="form-group">
                <label className="form-label">Серия *</label>
                <input 
                  className="form-input"
                  type="text"
                  onChange={e => setLicenseSeries(e.currentTarget.value)} 
                  value={licenseSeries}
                  placeholder="1234"
                  maxLength="4"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Номер *</label>
                <input 
                  className="form-input"
                  type="text"
                  onChange={e => setLicenseNumber(e.currentTarget.value)} 
                  value={licenseNumber}
                  placeholder="567890"
                  maxLength="6"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Дата выдачи *</label>
                <input 
                  className="form-input"
                  type="date"
                  onChange={e => setLicenseDate(e.currentTarget.value)} 
                  value={licenseDate}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Марка автомобиля *</label>
            <select 
              className="form-input"
              onChange={e => {
                setSelectedBrand(e.target.value)
                setSelectedModel('')
              }} 
              value={selectedBrand}
            >
              <option value="">Выберите марку</option>
              {Object.keys(carBrands).map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Модель автомобиля *</label>
            <select 
              className="form-input"
              onChange={e => setSelectedModel(e.target.value)} 
              value={selectedModel}
              disabled={!selectedBrand}
            >
              <option value="">Выберите модель</option>
              {selectedBrand && carBrands[selectedBrand].map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Желаемая дата *</label>
              <input 
                className="form-input"
                type="date"
                onChange={e => setTestDate(e.currentTarget.value)} 
                value={testDate}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Желаемое время *</label>
              <input 
                className="form-input"
                type="time"
                onChange={e => setTestTime(e.currentTarget.value)} 
                value={testTime}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Способ оплаты *</label>
            <div className="radio-group">
              <label className="radio-label">
                <input 
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentType === 'cash'}
                  onChange={e => setPaymentType(e.target.value)}
                />
                Наличными
              </label>
              <label className="radio-label">
                <input 
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentType === 'card'}
                  onChange={e => setPaymentType(e.target.value)}
                />
                Банковской картой
              </label>
            </div>
          </div>
          
          <button 
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            onClick={createTestDrive}
            disabled={isLoading}
          >
            {isLoading ? 'Создание заявки...' : 'Создать заявку'}
          </button>
          
          {message && (
            <div className={`message ${message.includes('Ошибка') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="test-drives-list-section">
        <div className="test-drives-header">
          <h2>Мои заявки на тест-драйв</h2>
          <div className="test-drives-count">Всего заявок: {testDrives.length}</div>
        </div>
        
        {testDrives.length === 0 ? (
          <div className="empty-state">
            <h3>Заявки не найдены</h3>
            <p>Создайте первую заявку на тест-драйв</p>
          </div>
        ) : (
          <div className="test-drives-grid">
            {testDrives.map((testDrive, idx) => (
              <div key={testDrive.id || idx} className="test-drive-card">
                <div className="test-drive-id">Заявка №{testDrive.id}</div>
                <div className="test-drive-info">
                  <div className="info-item">
                    <span className="info-label">Автомобиль:</span>
                    <span className="info-value">{testDrive.car_brand} {testDrive.car_model}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Дата и время:</span>
                    <span className="info-value">{testDrive.test_date} в {testDrive.test_time}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Статус:</span>
                    <span className={`status ${testDrive.status || 'pending'}`}>
                      {testDrive.status === 'approved' ? 'Одобрено' : 
                       testDrive.status === 'completed' ? 'Выполнено' : 
                       testDrive.status === 'rejected' ? 'Отклонено' : 'В обработке'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}