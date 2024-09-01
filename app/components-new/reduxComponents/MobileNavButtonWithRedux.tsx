// src/components/MobileNavButtonWithRedux.js
'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import MobileNavButton from '../MobileNavButton';
import { toggleMobileMenu } from '../../../store/reducers/MobileNavSlice';


const MobileNavButtonWithRedux = () => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleMobileMenu());
  };

  return <MobileNavButton onClick={handleToggle} />;
};

export default MobileNavButtonWithRedux;
