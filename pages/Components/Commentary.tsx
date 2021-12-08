import React from 'react'
import { Challenge } from '../../types/index'

const Commentary = (props: Challenge) => {
  console.log(props)
  return (
    <div>
      {props.commentary}
    </div>
  )
}

export default Commentary
