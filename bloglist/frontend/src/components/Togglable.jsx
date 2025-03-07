import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div className='my-4'>
      <div style={hideWhenVisible}>
        <Button variant='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <Button className='mb-3' variant='dark' onClick={toggleVisibility}>Cancel</Button>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable