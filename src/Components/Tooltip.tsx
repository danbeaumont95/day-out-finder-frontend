import React from 'react';
import { InfoWindow } from '@react-google-maps/api';

interface Props {
  label: string;
  lat: number;
  lng: number;
}
const Tooltip: React.FC<Props> = ({label, lat, lng}: Props) => {
  return (
    <div style={{ position: 'absolute', zIndex: 9999, display: 'inline', top: '130px', boxSizing: 'border-box', border: '6px solid #32202000', borderRadius: '9px', boxShadow: '4px 3px 45px 2px rgb(0 0 0 / 35%)', width: '20%', backgroundColor: 'white'}}>
      <InfoWindow position={{lat, lng}}>
        <h4>{label}</h4>
      </InfoWindow>
    </div>
  )
};

export default Tooltip
