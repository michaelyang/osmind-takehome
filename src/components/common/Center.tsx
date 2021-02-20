import React from 'react';

export interface CenterProps {
  children: React.ReactNode;
  style?: object;
}

const Center: React.FC<CenterProps> = ({ children, style = {}, ...rest }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flexGrow: 1,
      height: '100%',
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

export default Center;
