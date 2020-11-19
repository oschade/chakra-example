import React, { useState, useRef, useCallback } from 'react'
import { Box, Flex, chakra, useTheme } from '@chakra-ui/react'
import type { Theme } from '@chakra-ui/react'
import curve from 'svg-line-curved'
import {
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import {
  flowListState,
  nodeListState,
  settingState,
  connectorState,
  selectAllConnections,
} from '../atoms'

interface ArrowProps {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  offsetX?: number
  offsetY?: number
}

const Arrow = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  offsetX = 0,
  offsetY = 0,
  ...restProps
}: ArrowProps) => {
  const width = targetX - sourceX
  const height = targetY - sourceY

  return (
    <Box
      position="absolute"
      bg="tomato"
      left={`${sourceX + offsetX}px`}
      top={`${sourceY + offsetY}px`}
      width={`${width}px`}
      height={`${height}px`}
      {...restProps}
    />
  )
}

export default () => {
  const theme = useTheme() as Theme
  console.log('theme:', theme)
  const connectionState = useRecoilValue(selectAllConnections)
  const [newWire, setNewWire] = useState({
    source: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  })
  console.log('connectionState:', connectionState)

  const connectorRadius = 6
  const connectorColor = theme.colors.green[400]

  const innerRef = useRef(null)

  // const connectors = connectionState.connectors.flatMap((connector) => {
  //   const input = connector.input && (
  //     <circle
  //       key={`connector-input-${connector.id}`}
  //       cx={connector.input.x}
  //       cy={connector.input.y}
  //       r={connectorRadius}
  //       fill={connectorColor}
  //     />
  //   )
  //   const output = connector.output && (
  //     <circle
  //       key={`connector-output-${connector.id}`}
  //       cursor="pointer"
  //       cx={connector.output.x}
  //       cy={connector.output.y}
  //       r={connectorRadius}
  //       fill={connectorColor}
  //       onMouseDown={() =>
  //         handleConnectorMouseDown(connector.output.x, connector.output.y)
  //       }
  //       onMouseUp={() => {
  //         handleConnectorMouseUp()
  //       }}
  //     />
  //   )

  //   return (
  //     <>
  //       {input}
  //       {output}
  //     </>
  //   )
  // })

  const wires = connectionState.connections.map((c) => {
    const curvedPath = curve(c.sourceX, c.sourceY, c.targetX, c.targetY)

    return (
      <g key={c.id}>
        <path
          d={curvedPath}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeWidth="1"
        />
        <path
          d={curvedPath}
          cursor="pointer"
          stroke="transparent"
          fill="none"
          strokeLinecap="round"
          strokeWidth="20"
          onClick={(e) => {
            console.log('click on sroke')
          }}
        />
      </g>
    )
  })

  return (
    <chakra.svg w="100%" h="100%" color="gray.500">
      {wires}
      {/* {connectors} */}
    </chakra.svg>
  )
}
