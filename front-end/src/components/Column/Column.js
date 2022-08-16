import React from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import Card from 'components/Card/Card'
import './Column.scss'

const Column = props => {
  const { column, onCardDrop } = props

  const cards = mapOrder(column.cards, column.cardOrder, 'id')
  /**
   * item have addedIndex and removedIndex
   * if col 1 - index 1 move col 2 - index 3
   * remove col 1 - index 1 && add col 2 - index 3
   */

  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
      <div className="card-list">
        <Container
          orientation="vertical" // default
          groupName="common-columns" // Chung group để card có thể kéo thả qua các column khác nhau
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]} // Trả về card vừa kéo thả (payload)
          // CSS khi kéo card
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
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon" />
          Add another card
        </div>
      </footer>
    </div>
  )
}

export default Column
