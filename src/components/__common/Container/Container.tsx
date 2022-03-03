import React from 'react'
import './Container.css'

export const Container: React.FC = ({ children }) => {
  return (
    <main className='main__container'>{children}</main>
  )
}

export default Container