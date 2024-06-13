import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (ev) => {
    setValue(ev.target.value)
  }

  const onReset = () => setValue('')

  return {
    type, value,
    onChange,
    onReset
  }
}

export { useField }