import React, { useState } from 'react';
import '../Styles/Filters.css';
import { FilteredPlace} from '../Interfaces/interfaces'

interface Props {
  handleChange: any;
  setFilter: any;
  map: any;
  lat: number;
  lng: number;
  filteredPlaces: FilteredPlace[];
  setFilteredPlaces: any;
  filter: string;
}

const Filters = ({handleChange, setFilter, map, lat, lng,filteredPlaces, setFilteredPlaces, filter}: Props) => {

  const handleChangeCategory = (event: any) => {
    setFilter(event.target.value)
  }

  const handleClick = () => {
    let service = new window.google.maps.places.PlacesService(map);
    const searchFilter = filter === 'Food/Drink' ? 'restaurant' : 'test';

    const req = {
      query: searchFilter, 
      type: searchFilter,
      location:{lat, lng},
      radius: 3000
    }
    const places: FilteredPlace[] = []

    service.nearbySearch(req, (results: any, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          places.push({id: results[i].place_id, pos: {lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng()}, name: results[i].name})
        }
      }

      setFilteredPlaces(places)
    })

  }

  return (
    <div className='filters_container'>
      <label style={{fontSize: 'larger', paddingRight: '5px'}} htmlFor="cars">Choose a search category:</label>
      <select className='search_category' id="search_category" name="search_category" onChange={handleChangeCategory}>
      <option value="Food/Drink"></option>
        <option value="Food/Drink">Food/Drink</option>
        <option value="Activities">Activities</option>
        <option value="Museums">Museums</option>
      </select>
      <button className='searchbox_button' onClick={handleClick}>Search</button>
    </div>
  )
};

export default Filters;
