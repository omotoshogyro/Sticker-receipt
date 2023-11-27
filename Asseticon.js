import React from 'react'
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"



function Asseticon() {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={32}
    fill="none"
  >
    <G clipPath="url(#a)">
      <Path
        fill="#F5FBFF"
        stroke="#00A1FB"
        strokeWidth={1.522}
        d="M16.321 14.589c1.176-4.39 1.764-6.586 3.494-7.584 1.73-.998 3.924-.41 8.314.766 4.39 1.176 6.586 1.765 7.584 3.494.998 1.73.41 3.924-.766 8.315-1.176 4.39-1.765 6.585-3.494 7.583-1.73.999-3.924.41-8.314-.766-4.39-1.176-6.586-1.764-7.584-3.494-.998-1.729-.41-3.924.766-8.314Z"
      />
    </G>
    <G stroke="#00A1FB" strokeWidth={1.522} clipPath="url(#b)">
      <Path
        fill="#F5FBFF"
        d="M6.55 18.126c-1.354-4.338-2.031-6.508-1.104-8.276.927-1.769 3.097-2.446 7.436-3.8 4.338-1.354 6.508-2.03 8.276-1.103 1.768.927 2.445 3.096 3.8 7.435 1.354 4.339 2.03 6.508 1.103 8.276-.927 1.769-3.096 2.446-7.435 3.8-4.339 1.354-6.508 2.03-8.277 1.104-1.768-.928-2.445-3.097-3.799-7.436Z"
      />
      <Path d="M11.694 26.09c2.656-6.384 5.321-14.542 13.728-12.213" />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.491 13.708a1.522 1.522 0 1 0-.907-2.907 1.522 1.522 0 0 0 .907 2.907Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          d="M17.021 2.168 40.55 8.473 34.245 32l-23.528-6.305z"
        />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M.5 7.256 23.752 0l7.256 23.252-23.252 7.256z" />
      </ClipPath>
    </Defs>
  </Svg>
  )
}

export default Asseticon