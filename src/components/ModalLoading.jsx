import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

const ModalLoading = ({modalLoading}) => {

    const Loading = (props) => {
        return (
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-loading"
            >
                
                <Modal.Body>
                    <Spinner animation="border" variant="light" />
                </Modal.Body>
            </Modal>
        );
    }

  return (
    <Loading
        show={modalLoading}
    />
  )
}

export default ModalLoading



