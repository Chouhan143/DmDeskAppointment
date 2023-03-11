import axios from 'axios';
import {NewLogoutUrl} from '../Constants/UrlConstants';

export const Uselogout = async id => {
  // console.log("as")
  // AsyncStorage.clear()
  // navigation.replace('login');
  const result = await axios.post(
    NewLogoutUrl,
    {id: id}, // include id in the request body
    {
      headers: {Authorization: `Bearer ${userInformation.access_token}`},
    },
  );
  return result

};
