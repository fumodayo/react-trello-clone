import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './BoardContent.scss'
import Column from 'components/Column/Column'
import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'
import { mapOrder } from 'utilities/sorts'

const BoardContent = () => {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)

      // Sắp xếp column ở bên trong bằng cách sắp xếp mảng columnOrder bằng 'id'
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  if (isEmpty(board)) {
    return <div>Not Found</div>
  }

  /**
   * Kéo column 2 -> 1
   * removedIndex : 1, addIndex:0, payload: Trả column kéo thả
   */
  const onColumnDrop = dropResult => {
    console.log(dropResult)
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
            <Column column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  )
}

export default BoardContent
