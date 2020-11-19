import React, { memo, useState } from 'react'
import type { BoxProps } from '@chakra-ui/react'
import curve from 'svg-line-curved'

interface WireProps extends React.SVGProps<SVGPathElement> {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  color: string
  selectedColor: string
  isSelected: boolean
}

export default ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  color,
  selectedColor,
  isSelected,
  ...restProps
}: WireProps) => {
  const curvedPath = curve(sourceX, sourceY, targetX, targetY)
  const wireColor = isSelected ? selectedColor : color

  return (
    <g fill="none" strokeLinecap="round">
      <path d={curvedPath} stroke={wireColor} strokeWidth="1" />
      <path
        pointerEvents="stroke"
        d={curvedPath}
        cursor="pointer"
        stroke="transparent"
        strokeWidth="20"
        {...restProps}
      />
    </g>
  )
}
