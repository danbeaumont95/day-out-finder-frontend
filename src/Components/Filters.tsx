import React, { useState } from 'react';

interface Props {
  handleChange: any;
  setFilter: any;
}

const Filters = ({handleChange, setFilter}: Props) => {

  // const handleClick = () => {
  //   var map: any;
  //   let campsiteList: any = [];
  //   const request = {
  //     // location: map.center,
  //     query: "campsites",
  //     radius: 30000,
  //     fields: ["name", "geometry"],
  //     strictbounds: true,
  //   };
  //   const service = new window.google.maps.places.PlacesService(map);
  //   service.textSearch(request, (results: any, status) => {
  //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //       for (let i = 0; i < 10; i++) {
  //         if (
  //           window.google.maps.geometry.spherical.computeDistanceBetween(
  //             results[i].geometry.location,
  //             map.center
  //           ) < request.radius
  //         ) {
  //           if (!results[i].name.includes("Motorhome")) {
  //             campsiteList.push(results[i]);
  //           }
  //         }
  //       }
  //       console.log(campsiteList, 'campsiteList123');
  //       // this.setState({ isListLoading: false, campsiteList });
  //     }
  //   });
  //   return ''
  // }
  // }

  const handleClick = () => {
    const token = process.env.REACT_APP_google_maps_api;

// var config = {
//   method: 'get',
//   url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_google_maps_api}`,
//   headers: { }
// };

// axios(config)
// .then(function (response: any) {
//   console.log(response, 'response')
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error: any) {
//   console.log(error);
// });

  }

  return (
    <div className='filters_container'>
      <label style={{fontSize: 'larger', paddingRight: '5px'}} htmlFor="cars">Choose a search category:</label>
      <select id="search_category" name="search_category" >
        <option value="Food/Drink">Food/Drink</option>
        <option value="Activities">Activities</option>
        <option value="Museums">Museums</option>
      </select>
      <button className='searchbox_button' onClick={handleClick}>Search</button>
    </div>
  )
};

export default Filters;
