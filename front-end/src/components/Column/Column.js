import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { mapOrder } from 'utilities/sorts'
import Card from 'components/Card/Card'
import './Column.scss'
import { Dropdown, Form, Button } from 'react-bootstrap'
import ConfirmModal from 'components/Common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import {
  saveContentAfterPressEnter,
  selectAllInlineText
} from 'utilities/contentEditable'
import { cloneDeep } from 'lodash'

const Column = props => {
  const { column, onCardDrop, onUpdateColumn } = props

  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const [columnTitle, setColumnTitle] = useState('')
  const handleColumnTitleChange = e => {
    setColumnTitle(e.target.value)
  }

  const [newCardTitle, setNewCardTitle] = useState('')
  const onNewCardTitleChange = e => {
    setNewCardTitle(e.target.value)
  }

  const newCardTextareaRef = useRef(null)

  // Change title column khi blur ra
  const handleColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  // focus/ select input mỗi lần openNewCardForm thay đổi
  useEffect(() => {
    if (newCardTextareaRef && newCardTextareaRef.current) {
      newCardTextareaRef.current.focus()
      newCardTextareaRef.current.select()
    }
  }, [openNewCardForm])

  // Remove column
  const onConfirmModalAction = type => {
    if (type === MODAL_ACTION_CONFIRM) {
      // Remove column
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextareaRef.current.focus()
      return
    }

    const newCardToAdd = {
      // 5 Random characters, will remove when we implement code API
      id: Math.random().toString(36).substring(2, 5),
      boarId: column.boarId,
      columnId: column.id,
      title: newCardTitle.trim(),
      cover: null
    }

    // Giống với let newColumn = { ...column } nhưng newColumn được tạo mới không liên quan đến column cũ
    let newColumn = cloneDeep(column)

    newColumn.cards.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd.id)

    onUpdateColumn(newColumn)
    setNewCardTitle('')
    toggleOpenNewCardForm()
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            // Đổi title thành input title
            size="sm"
            type="text"
            className="trello-clone-content-editable"
            value={columnTitle}
            onClick={selectAllInlineText}
            onChange={handleColumnTitleChange}
            onBlur={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={e => e.preventDefault()} // Khi kéo column không bị blur vào input title column
            spellCheck="false" // Tắt kiểm tra chính tả tự động của Chrome
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            />

            <Dropdown.Menu>
              <Dropdown.Item>Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>
                Remove column...
              </Dropdown.Item>
              <Dropdown.Item disabled>
                Move all card in this column...
              </Dropdown.Item>
              <Dropdown.Item disabled>
                Archive all card in this column...
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
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
        {openNewCardForm && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter a title for this card.."
              className="textarea-enter-new-card"
              ref={newCardTextareaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              // Press enter to add new card
              onKeyDown={event => event.key === 'Enter' && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className="add-new-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add card
            </Button>
            <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-trash icon" />
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon" />
            Add another card
          </div>
        )}
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure you want to remove <strong>${column.title}</strong>. <br/> All related card will also be removed!`}
      />
    </div>
  )
}

export default Column
