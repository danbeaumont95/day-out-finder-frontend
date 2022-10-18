
import SimpleMap from "./SimpleMap";
import SearchBox from "./SearchBox";
import { useState } from "react";
import Filters from "./Filters";

const Home = () => {
  const [searchPlace, setSearchPlace] = useState('');
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [filter, setFilter] = useState('Food/Drink');
  const [map, setMap] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const handleChange = (event: any) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <SearchBox searchPlace={searchPlace} setSearchPlace={setSearchPlace} lat={lat} setLat={setLat} lng={lng} setLng={setLng}/>
      <Filters handleChange={handleChange} setFilter={setFilter} map={map} lat={lat} lng={lng} filteredPlaces={filteredPlaces} setFilteredPlaces={setFilteredPlaces} filter={filter}/>
      <SimpleMap searchPlace={searchPlace} lat={lat} setLat={setLat} lng={lng} setLng={setLng} filter={filter} setMap={setMap} filteredPlaces={filteredPlaces} setFilteredPlaces={setFilteredPlaces}/> 
    </div>
  )
};

export default Home;
