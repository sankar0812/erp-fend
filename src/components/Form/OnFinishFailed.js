import React from 'react'
import { toast } from 'react-toastify'

export const OnFinishFailed = (message) => {
  return (
    toast.warn(message || 'Please fill the details')
  )
}
