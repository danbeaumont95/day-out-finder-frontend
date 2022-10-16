import axios from "axios";
import { url } from "./url";

// const getSavedAddresses = async (address: string, name: string, token: string) => {
const saveAddresses = async (address: string, name: string, token: string) => {
  const res = await axios.post(`${url}/map-app/save_details`, {
    address,
    name
  }, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return res;
}

const saveAddressesWithLatLng = async (lat: string, lng: string, name: string, token: string) => {
  const res = await axios.post(`${url}/map-app/save_details`, {
    lat,
    lng,
    name
  }, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return res;
}

const MapService = {
  saveAddresses,
  saveAddressesWithLatLng
};

export default MapService;
