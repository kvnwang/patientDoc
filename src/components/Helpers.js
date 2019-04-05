
import jwt_decode from 'jwt-decode'

export function isLoggedIn() {
  const token = localStorage.getItem('token');
  if(token===null) return false;
  return true;
}


export function isPatient() {
  if(!isLoggedIn()) return false;
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token)
  return (decoded.role===0)
}

export function isDoctor() {
  if(!isLoggedIn()) return false;
  const token =   window.localStorage.token
  const decoded = jwt_decode(token)
  return (decoded.role===1)
}
