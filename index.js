import axios from 'axios'
import {getTokenCookie} from '../../store/AuthActions'

export async function getRequest(url) {
  try {
    let res = await axios.get(url)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export const isAuthenticated = () => {
  const token = getTokenCookie()
  return token !== undefined && token !== null && token !== ''
}

export async function getBearerRequest(url) {
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getTokenCookie(),
      },
    }

    let res = await axios.get(url, options)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function postRequest(url, data) {
  try {
    let res = await axios.post(url, data)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function postBearerRequest(url, data) {
  try {
    const options = {
      headers: {
        Authorization: getTokenCookie(),
      },
    }
    let res = await axios.post(url, data, options)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function deleteRequest(url) {
  try {
    let res = await axios.delete(url)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function postFormDataRequest(url, data) {
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: getTokenCookie(),
      },
    }

    let res = await axios.post(`${url}`, data, options)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function putFormDataRequest(url, data) {
  try {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: getTokenCookie(),
      },
    }

    const form_data = new FormData()
    for (let key in data) form_data.append(key, data[key])

    let res = await axios.put(`${url}`, form_data, options)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export function handler(err) {
  let error = err

  if (err.response && err.response.data.hasOwnProperty('message')) error = err.response.data
  else if (!err.hasOwnProperty('message')) error = err.toJSON()

  // console.log("hex", error.message);
  return error.message
}
