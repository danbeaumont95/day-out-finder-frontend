import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import HomeIcon from '../Images/Home-icon.png'
import UserService from '../Services/user';
import MapService from '../Services/map';
import Helpers from '../Helpers/helper';

const containerStyle = {
  width: '700px',
  height: '700px'
};

function SimpleMap() {
  
  const { isLoaded } = useJsApiLoader({
    // id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_google_maps_api
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLat(lat)
      setLng(lng)
      setPlaces([...places, {name: 'home', 'pos': {lat, lng}, id: Math.floor(Math.random() * (10000000 - 0 + 1)) + 0}])
    });

    const token = localStorage.getItem('accessToken')

    UserService.getMySavedAddresses(token)
      .then((res) => {
        if (res.data.Success) {
          // eslint-disable-next-line array-callback-return
          res.data.Success.map((el) => {
            places.push({id: el.pk, 'pos': {lat: el.fields.lat, lng: el.fields.lng}, name: el.fields.name})
          })
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [key, setKey] = useState(Math.floor(Math.random() * (10000000 - 0 + 1)) + 0)
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [markerMap, setMarkerMap] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState({ lat: 44.076613, lng: -98.362239833 });
  const [showInfoWindow, setShowInfoWindow]=  useState(false)
  const [places, setPlaces] = useState([])
  const [idOfActiveMarker, setIdOfActiveMarker] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [showPopUp, setShowPopUp] = useState(false)
  const [showCreateNewForm, setShowCreateNewForm] = useState(false)
  const [eventLatLng, setEventLatLng] = useState({})
  const [formName, setFormName] = useState({name: ''})


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleClick = (event) => {

    const lat = event.latLng.lat()
    const lng = event.latLng.lng()
    setEventLatLng({lat, lng})
    // places.push({name: 'your mum', id: Math.floor(Math.random() * (10000000 - 0 + 1)) + 0, 'pos': {lat, lng}})

    // const newAddress = {name: 'test123', 'pos': {lat, lng}, id: Math.floor(Math.random() * (10000000 - 0 + 1)) + 0}

    // MapService.saveAddressesWithLatLng(lat, lng, 'test', localStorage.getItem('accessToken'))
    //   .then((res) => {
    //     if (res.data.Success) {
          // setPlaces([...places, newAddress])
    //       setShowPopUp(true)
    //     }
    //   })
    setShowPopUp(true)
    setShowCreateNewForm(true)
  }

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13);
    }

    // if you want to center the selected Marker
    setCenter(place.pos)
  };

  const handleMouseOver = (e, place) => {
    setShowInfoWindow(true)
    setIdOfActiveMarker(place.id)
};

const handleCloseClick = () => {
    setShowInfoWindow(false)
  setIdOfActiveMarker(null)
}

const handleChangeFormName = (event) => {
  setFormName({
    ...formName,
    [event.target.name]: event.target.value,
  });
};

const handleFormSubmit = (e) => {

  e.preventDefault()
  const newAddress = {name: formName.Place, 'pos': {lat: eventLatLng.lat, lng: eventLatLng.lng}, id: Math.floor(Math.random() * (10000000 - 0 + 1)) + 0}

    MapService.saveAddressesWithLatLng(eventLatLng.lat, eventLatLng.lng, formName.Place, localStorage.getItem('accessToken'))
      .then((res) => {
        if (res.data.Success) {
          setPlaces([...places, newAddress])
          setShowPopUp(true)
          setShowCreateNewForm(false)
        }
      })
}

  return isLoaded ? (
    <div>

      <GoogleMap
        key={key}
        mapContainerStyle={containerStyle}
        // center={center}
        center={{lat, lng}}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={event => handleClick(event)}
      >
        {showCreateNewForm ? (
  <div  style={{ height: '400px', width: '300px'}}>

  <div style={{border: '2px solid red', height: '400px', width: '300px', position: 'fixed', backgroundColor: 'aliceblue'}}>
    <h3>Save place</h3>
    <form action="" onSubmit={handleFormSubmit}>
      <label htmlFor="Place" className="place_label">Place</label>
      <input type="text" placeholder='Place' name="Place" onChange={handleChangeFormName}/>
      <button>Save</button>
    </form>
  </div>
  </div>
        ) :<></>}

          {Helpers.removeNonUniqueObjectsFromArrayBasedOnObjectValue(places).map(place => (
            <Marker
            color="blue"
            onMouseOver={event => handleMouseOver(event, place)}
              key={place.id}
              position={place.pos}
              onLoad={marker => markerLoadHandler(marker, place)}
              onClick={event => markerClickHandler(event, place)}
              icon={{
                url: HomeIcon,
                scale: 0.05,
                fillOpacity: 0.5,
                strokeWeight: 0,
                scaledSize: new window.google.maps.Size(20, 22)
              }}
            >
              {showInfoWindow && (
                    place.id === idOfActiveMarker ? 
                    <InfoWindow onCloseClick={handleCloseClick}>
                      <div  style={{  width: '100px'}}>
                        <h4>{place.name}</h4>
                    </div>
                    </InfoWindow>
                    : null
                )}
              </Marker>
          ))}
      </GoogleMap>

    </div>
  ) : null
}

export default React.memo(SimpleMap)
