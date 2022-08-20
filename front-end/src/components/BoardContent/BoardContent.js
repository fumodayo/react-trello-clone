import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
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
import { isEmpty, cloneDeep } from 'lodash'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'
import {
  fetchBoardDetails,
  createNewColumn,
  updateBoard,
  updateColumn,
  updateCard
} from 'actions/ApiCall'

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
    let newColumns = cloneDeep(columns)
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = cloneDeep(board)
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)

    /**
     * Khi có lỗi sẽ trả về state cũ
     * Call API update columnOrder in board details
     */
    updateBoard(newBoard._id, newBoard).catch(() => {
      setColumns(columns)
      setBoard(board)
    })
  }

  // State column -> board
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = cloneDeep(columns)

      let currentColumn = newColumns.find(c => c._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i._id)

      /**
       * Automatic batching for fewer renders in React 18
       * https://github.com/reactwg/react-18/discussions/21
       * fix dont batching react-dom v18
       */
      flushSync(() => setColumns(newColumns))

      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         *  Action: Move card inside its column
         *  1 - Call API update cardOrder in current column
         */
        updateColumn(currentColumn._id, currentColumn).catch(() =>
          setColumns(columns)
        )
      } else {
        /**
         * Action: Move card between two column
         */
        // 1 - Call API update cardOrder in current column
        updateColumn(currentColumn._id, currentColumn).catch(() =>
          setColumns(columns)
        )

        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload)
          currentCard.columnId = currentColumn._id
          //2 - Call API update columnId in current card
          updateCard(currentCard._id, currentCard)
        }
      }
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
