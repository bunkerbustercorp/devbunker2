import React from 'react'
import { Modal } from 'semantic-ui-react'

const ModalContainer = ({children}) => (
  <Modal open={true}>
    <Modal.Content>
      {children}
    </Modal.Content>
    <Modal.Actions>
    </Modal.Actions>
  </Modal>
)

export default ModalContainer