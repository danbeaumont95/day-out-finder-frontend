import React, { useState } from 'react';
import '../Styles/SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction} from 'react';

interface Props {
  searchPlace: string;
  setSearchPlace: Dispatch<SetStateAction<string>>;
  lat: number;
  setLat: any;
  lng: number;
  setLng: any;
}

const SearchBox: React.FC<Props> = ({searchPlace, setSearchPlace, lat, setLat, lng, setLng}: Props) => {
  
  const handleChangeSearchPlace = (event: any) => {
    setSearchPlace(event.target.value)
  };

  const handleClick = () => {
      fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+searchPlace+'&key='+process.env.REACT_APP_google_maps_api)
        .then(response => response.json())
        .then(data => {
          const latitude = data.results[0].geometry.location.lat;
          const longitude = data.results[0].geometry.location.lng;
          setLat(latitude)
          setLng(longitude)
        })
  }

  return (
    <div className="searchbox_container">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbox_icon"/> 
      <input type="text" placeholder='Enter a location here' className="searchbox_input" onChange={handleChangeSearchPlace} name="search_place"/>
      <button className='searchbox_button' onClick={handleClick}>Search</button>
    </div> 
  )
}

export default SearchBox
