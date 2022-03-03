import React from 'react'
import './Tag.css'

export const Tag: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className="tag__container">
      <span className="tag__container_rating">{score}</span>/
      <span className="tag__container_rating_max">10</span>
    </div>
  )
}