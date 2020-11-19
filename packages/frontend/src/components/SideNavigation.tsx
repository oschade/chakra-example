import React from 'react'
import { Box, Center, Icon, VStack, useColorModeValue } from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md'
import { TiFlowMerge } from 'react-icons/ti'
import { VscPackage } from 'react-icons/vsc'
import { GiSettingsKnobs } from 'react-icons/gi'
import { RiDashboardLine } from 'react-icons/ri'

export const SIDENAVIGATION_WIDTH = 60

interface NavItemProps {
  icon: typeof TiFlowMerge
  active?: boolean
}

const NavItem = ({ icon, active, ...props }: NavItemProps) => {
  return (
    <Center
      pos="relative"
      as="a"
      w={`${SIDENAVIGATION_WIDTH}px`}
      h={`${SIDENAVIGATION_WIDTH}px`}
      color="gray.500"
      cursor="pointer"
      transition="color 0.3s"
      {...props}
      _hover={{
        color: 'gray.400',
      }}
    >
      <Icon as={icon} fontSize="xl" />
      {active && (
        <Box
          pos="absolute"
          left="1px"
          height={`${SIDENAVIGATION_WIDTH}px`}
          width="3px"
          bg="green.700"
        />
      )}
    </Center>
  )
}

export default () => {
  const bgColor = useColorModeValue('gray.200', 'gray.900')
  return (
    <VStack w={`${SIDENAVIGATION_WIDTH}px`} bg={bgColor} paddingTop="4">
      <NavItem key="dashboard" icon={RiDashboardLine} />
      <NavItem key="flow" icon={TiFlowMerge} active />
      <NavItem key="packages" icon={VscPackage} />
      <NavItem key="settings" icon={GiSettingsKnobs} />
    </VStack>
  )
}
