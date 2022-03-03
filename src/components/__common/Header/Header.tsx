import React from 'react'
import './Header.css'

export const Header: React.FC = ({ children }) => {
  return (
    <div className='header__container'>
      {children}
    </div>
  )
}

export default Header