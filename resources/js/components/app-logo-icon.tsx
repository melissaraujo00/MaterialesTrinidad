import React from 'react';
import logo from '../../img/logo.png';  // Ajusta la ruta según la ubicación de tu imagen


export default function AppLogoIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
      <img
        {...props}
        src={logo}
        alt="App Logo"
        className="w-60 h-30 object-contain select-none pointer-events-none"
      />
    );
  }


