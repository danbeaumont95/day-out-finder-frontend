import React from 'react';
import './Styles/SearchBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBox = () => {
  return (
    <div className="searchbox_container">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbox_icon"/> 
      <input type="text" placeholder='Enter a location here'  className="searchbox_input" />
    </div> 
  )
}
export default SearchBox
