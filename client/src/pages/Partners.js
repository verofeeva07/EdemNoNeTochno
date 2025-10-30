import React, { useEffect, useState } from 'react'
import { HTTP } from '../http'
import './Partners.css'

export default function Partners() {
  const [partners, setPartners] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPartners()
  }, [])
  
  const getPartners = async() => {
    try {
      const data = await HTTP.get('/partner/all')
      setPartners(data.partners || [])
    } catch (error) {
      console.error('Error fetching partners:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="partners-container">
        <div className="loading-spinner">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="partners-container">
      <div className="partners-header">
        <h1>Список партнеров</h1>
        <div className="partners-count">Всего партнеров: {partners.length}</div>
      </div>
      
      {partners.length === 0 ? (
        <div className="empty-state">
          <h3>Партнеры не найдены</h3>
          <p>Начните с создания первого партнера</p>
        </div>
      ) : (
        <div className="partners-grid">
          {partners.map((partner, idx) => (
            <div key={partner.id || idx} className="partner-card">
              <div className="partner-id">ID: {partner.id}</div>
              <div className="partner-info">
                <div className="info-item">
                  <span className="info-label">Контактное лицо:</span>
                  <span className="info-value">{partner.contact}</span>
                </div>
                {partner.phone && (
                  <div className="info-item">
                    <span className="info-label">Телефон:</span>
                    <span className="info-value">{partner.phone}</span>
                  </div>
                )}
                {partner.email && (
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{partner.email}</span>
                  </div>
                )}
                {partner.reg_date && (
                  <div className="info-item">
                    <span className="info-label">Дата регистрации:</span>
                    <span className="info-value">{partner.reg_date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}