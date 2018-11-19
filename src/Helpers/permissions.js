/**
 * YOPO - Red de Intercambio Social El Yopo
 * https://github.com/jalcfer/yopo
 * @flow
 */

import { 
  PermissionsAndroid
} from 'react-native';

export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Red de Intercambio Social El Yopo',
        'message': 'El Yopo quiere acceder a su ubicación'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      //alert("You can use the location");
    } else {
      console.log("location permission denied")
      //alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}