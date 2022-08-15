import Card from 'components/Card/Card'
import React from 'react'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'

const Column = props => {
  const { column } = props

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  return (
    <div className="column">
      <header>{column.title}</header>
      <ul className="card-list">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </ul>
      <footer>Add new Item</footer>
    </div>
  )
}

export default Column
