import React from 'react'
import Svg, { Path } from "react-native-svg"


function Checkicon() {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
  >
    <Path
      fill="#fff"
      fillOpacity={0.8}
      d="M6.573.5a6.5 6.5 0 1 0 6.5 6.5 6.507 6.507 0 0 0-6.5-6.5Zm2.854 5.354-3.5 3.5a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 1 1 .707-.708l1.146 1.147L8.72 5.146a.5.5 0 1 1 .707.708Z"
    />
  </Svg>
  )
}

export default Checkicon