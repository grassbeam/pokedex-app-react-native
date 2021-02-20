import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';

export const useWindowsDimensions = () => {
    const windowData = useWindowDimensions();
  
    return {
      ...windowData,
      isLandscape: windowData.width > windowData.height,
    };
}

export const useScreensDimensions = () => {
    const [screenData, setScreenData] = useState(Dimensions.get('screen'));
  
    useEffect(() => {
      const onChange = (result) => {
        setScreenData(result.screen);
      };
  
      Dimensions.addEventListener('change', onChange);
  
      return () => Dimensions.removeEventListener('change', onChange);
    });
  
    return {
      ...screenData,
      isLandscape: screenData.width > screenData.height, // DO NOT TRUST THIS
    };
  };