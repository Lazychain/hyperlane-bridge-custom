'use client'
import React, { useState } from 'react';
//import Image from 'next/image';
import menuIcon from '../../../public/icons/menu-4.svg';
import './menu.css';
import Image from 'next/image';

const MenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    alert("funciona");
  };
  return (
    < button onClick={handleClick} className=''>
      <Image src={menuIcon} alt="menu" className='hamburger-icon'></Image>
    </button >
  )
}

export default MenuIcon;

