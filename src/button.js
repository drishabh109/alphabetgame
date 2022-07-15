import React from 'react'

const Button = (props) => {
  return (
    <>
      <button className="btn btn-color text-white" type="button" onClick={() => {
        props.isActive ? props.handleReset() : props.handleStart()
      }} >
        {props.isActive ? 'Reset' : 'Start'}
      </button>
    </>
  )
}

export default Button;