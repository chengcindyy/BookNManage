import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilLibraryBuilding,
  cilNotes,
  // cilBell,
  // cilCalculator,
  // cilChartPie,
  // cilCursor,
  // cilDescription,
  // cilDrop,
  // cilPencil,
  // cilPuzzle,
  // cilSpeedometer,
  // cilStar,
  cilGroup,
  cilLan,
  cilCalendar,
  cilLightbulb,
  cilUser
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Store Settings',
    to: '/Store',
    icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon" />  
  },
  {
    component: CNavGroup,
    name: 'Services',
    to: '/services',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Services Setting',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Additional Services',
        to: '/Services/additionalServices',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Employees',
    to: '/employees',
    icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Working Days',
        to: '/employees/workDays',
      },
      {
        component: CNavItem,
        name: 'Available Hours',
        to: '/employees/avaliableHours',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Management',
  },
  {
    component: CNavItem,
    name: 'Bookings', 
    to: '/bookingManagement',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },  
  },
  {
    component: CNavItem,
    name: 'Orders', 
    to: '/orderManagement',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    badge: {
      color: 'warning',
      text: 'NEW', //newOrdersCount.toString()
    },  
  },
  {
    component: CNavItem,
    name: 'Members', 
    to: '/memberManagement',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />  
  },
  {
    component: CNavItem,
    name: 'Users', 
    to: '/admin/userManagement',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />     
  },
]

export default _nav