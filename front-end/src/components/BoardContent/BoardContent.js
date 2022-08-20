import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import { fetchBoardDetails, createNewColumn } from 'actions/ApiCall'

const BoardContent = () => {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewColumnTitleChange = e => {
    setNewColumnTitle(e.target.value)
  }

  const newColumnInputRef = useRef(null)

  // focus/ select input mỗi lần openNewColumnForm thay đổi
  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  useEffect(() => {
    const boardId = '62fdb768babe9dd20348b0ba'
    fetchBoardDetails(boardId).then(board => {
      setBoard(board)
      // Sắp xếp column ở bên trong bằng cách sắp xếp mảng columnOrder bằng '_id'
      setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
    })
  }, [])

  if (isEmpty(board)) {
    return <div>Not Found</div>
  }

  /**
   * Kéo column 2 -> 1
   * removedIndex : 1, addIndex:0, payload: Trả column kéo thả
   */
  const onColumnDrop = dropResult => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  // State column -> board
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]

      let currentColumn = newColumns.find(c => c._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i._id)

      setColumns(newColumns)
    }
  }

  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
    }

    /**
     * Sau khi add new column trong database thì nhận column từ database về để xuất ra
     * Call API
     */
    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)

      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(c => c._id)
      newBoard.columns = newColumns

      setColumns(newColumns)
      setBoard(newBoard)
      setNewColumnTitle('')
      toggleOpenNewColumnForm()
    })
  }

  // State column -> board
  const onUpdateColumnState = newColumnToUpdate => {
    const columnIdToUpdate = newColumnToUpdate._id

    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(
      i => i._id === columnIdToUpdate
    )

    if (newColumnToUpdate._destroy) {
      // remove column
      // xóa 1 phần tử tại vị trí column
      newColumns.splice(columnIndexToUpdate, 1)
    } else {
      // update column info
      // xóa 1 phần tử tại vị trí column chỉnh sửa, thêm vào new column đã sửa
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal" // xếp theo chiều ngang
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]} // Trả về column vừa kéo thả (payload)
        dragHandleSelector=".column-drag-handle" // Kéo mỗi column
        // Khi kéo đây sẽ là class CSS ẩn đằng sau
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key={index}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumnState={onUpdateColumnState}
            />
          </Draggable>
        ))}
      </Container>
      <BootstrapContainer className="trello-clone-container">
        {!openNewColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" />
              Add another column
            </Col>
          </Row>
        )}
        {openNewColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter column title..."
                className="input-enter-new-column"
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                // Press enter to add new column
                onKeyDown={event => event.key === 'Enter' && addNewColumn()}
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add Column
              </Button>
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
                <i className="fa fa-trash icon" />
              </span>
            </Col>
          </Row>
        )}
      </BootstrapContainer>
    </div>
  )
}

export default BoardContent
