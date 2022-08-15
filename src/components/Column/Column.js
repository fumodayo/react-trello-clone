import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import Card from 'components/Card/Card'
import './Column.scss'

const Column = props => {
  const { column } = props

  const cards = mapOrder(column.cards, column.cardOrder, 'id')
  /**
   * kéo card 1 column 1 đến vị trí card 2 column 2
   *
   *
   */
  const onCardDrop = dropResult => {
    console.log(dropResult)
  }

  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
      <div className="card-list">
        <Container
          orientation="vertical" // default
          groupName="common-columns" // Chung group để card có thể kéo thả qua các column khác nhau
          onDrop={onCardDrop}
          getChildPayload={index => cards[index]} // Trả về card vừa kéo thả (payload)
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>Add new Item</footer>
    </div>
  )
}

export default Column
