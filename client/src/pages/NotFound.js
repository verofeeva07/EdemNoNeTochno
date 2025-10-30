import React from 'react'
import './NotFound.css'

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Страница не найдена</h2>
        <p>Извините, запрашиваемая страница не существует.</p>
        <a href="/" className="home-link">Вернуться на главную</a>
      </div>
    </div>
  )
}