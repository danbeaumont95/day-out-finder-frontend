
import SimpleMap from "./SimpleMap";
import SearchBox from "./SearchBox";
import { useState } from "react";
import Filters from "./Filters";

const Home = () => {
  const [searchPlace, setSearchPlace] = useState('');
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [filter, setFilter] = useState('Food/Drink');

  const handleChange = (event: any) => {
    setFilter(event.target.value)
  }
  console.log(searchPlace, 'searchPlace123');
  return (
    <div>
      <SearchBox searchPlace={searchPlace} setSearchPlace={setSearchPlace} lat={lat} setLat={setLat} lng={lng} setLng={setLng}/>
      <Filters handleChange={handleChange} setFilter={setFilter}/>
      <SimpleMap searchPlace={searchPlace} lat={lat} setLat={setLat} lng={lng} setLng={setLng} filter={filter}/> 
    </div>
  )
};

export default Home;
