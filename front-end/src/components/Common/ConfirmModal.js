import React from 'react'
import { Modal, Button } from 'react-bootstrap'
// Change <strong>${column.title}</strong> to HTML
import HTMLReactParser from 'html-react-parser'
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

const ConfirmModal = props => {
  const { title, content, show, onAction } = props
  return (
    <Modal
      show={show}
      onHide={() => onAction(MODAL_ACTION_CLOSE)}
      backdrop="static" // when clicking out confirm modal cant close
      keyboard={false} // press ESC key cant close confirm modal
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => onAction(MODAL_ACTION_CLOSE)}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => onAction(MODAL_ACTION_CONFIRM)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal
