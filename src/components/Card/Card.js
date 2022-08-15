import React from 'react'
import './Card.scss'

const Card = props => {
  const { card } = props

  return (
    <li className="card-item">
      {card.cover && <img className="card-cover" src={card.cover} alt="SEO" />}
      {card.title}
    </li>
  )
}

export default Card
