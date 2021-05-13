import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css'

const modalElement = document.getElementById('modal-root') // This element is a sibling to root. Used as a "pocket" modal whenever I need one

// Honestly do not know exactly how this works. Having on demand forms that closed automatically was difficult for me to figure out.
export function Modal({ children, fade = true, defaultOpened = false }, ref) {

  const [isOpen, setIsOpen] = useState(defaultOpened) // Set State for opening/closing modal
  const close = useCallback(() => setIsOpen(false), []) // I assume this is what is ran by components that use this Modal component

  useImperativeHandle(ref, () => ({ // Using whatever reference is given, open/close selected modal
    open: () => setIsOpen(true),
    close
  }), [close])

  const handleEscape = useCallback(event => { // Close the modal if the ESC button is pressed
    if (event.keyCode === 27) close()
  }, [close])

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false)
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  // Allows Modal to be a portal from root from modal-root
  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? 'modal-fade' : ''}`}>
        <div className="modal-overlay" onClick={close} />
        <span id="click" role="button" className="modal-close" aria-label="close" onClick={close}>
          x
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  )
}

export default forwardRef(Modal);