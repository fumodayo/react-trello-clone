import Card from 'components/Card/Card'
import React from 'react'
import './Column.scss'

const Column = () => {
  return (
    <div className="column">
      <header>Test 1</header>
      <ul className="card-list">
        <Card />
        <Card />
        <Card />
        <Card />
      </ul>
      <footer>Add new Item</footer>
    </div>
  )
}

export default Column
