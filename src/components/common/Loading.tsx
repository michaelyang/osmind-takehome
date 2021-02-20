import React from 'react';
import Center from './Center';
import './Loading.css';

export interface LoadingProps {
  text?: React.ReactNode;
  style?: object;
  size?: number;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  text = undefined,
  size = 64,
  color = '#3151ec',
  style = {},
}) => (
  <Center>
    <div className="loading-container" style={{ width: size, height: size, ...style }}>
      <div
        className="loading"
        style={{
          borderColor: `${color} transparent`,
          borderWidth: size * 0.1,
          width: size,
          height: size,
        }}
      />
    </div>
    {text && <span style={{ marginTop: '10px' }}>{text}</span>}
  </Center>
);

export default Loading;
