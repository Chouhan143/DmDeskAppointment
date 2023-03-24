import axios from 'axios';
import {NewLogoutUrl} from '../Constants/UrlConstants';

// export const Uselogout = async (id,access_token) => {
//   // console.log("as")
//   // AsyncStorage.clear()
//   // navigation.replace('login');
//   const result = await axios.post(
//     NewLogoutUrl,
//     {id: id}, // include id in the request body
//     {
//       headers: {Authorization: `Bearer ${access_token}`},

//     },
//   );
//   return result

// };


export const Uselogout = ({navigation}) => {
  // console.log("as")
  AsyncStorage.clear()
  navigation.replace('login');
}