import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header/Header'


type Props = {}

export default function HomeTemplate({}: Props) {
  return (
    <>
     <Header/>
     <Outlet/> 
     <Footer/>
    </>
  )
}