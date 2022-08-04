import queryString from 'query-string';
import { ropstenBaseURL, baseURL } from '../constants/global';
// console.log = function () {};  
const parseResponse = async request => {
  
  try {
    const response = await request;
    const responseJson = await response.json();
    return responseJson
  } catch (err) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log("index.js-> from" + err);
    }

  }
};

type URLParams = {
  path?: string,
  params?: object,
  token?: string,
};

const request = path => {
  const host = ropstenBaseURL;
  const route = `${host}/${path}`;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.log(route);
  }
  return {
    
    get: () => (options: URLParams) => {
      // console.log('**OPTIONS***')
      // console.log(options)
      const { path, params } = options || {};
      const requestRoute = path ? `${route}/${encodeURIComponent(path)}` : route;
      const requestParams = queryString.stringify(options);
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log("requestParams ====== ", requestParams);
      }
      return parseResponse(
        fetch(`${requestRoute}?${requestParams}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
      );

    },
  };
};


// export const transactions = request('/api?module=account&action=txlist&address=0x440dc98aae2b8954ea5893021bb84891a066ab39&startblock=0&endblock=99999999&page=1&offset=20&sort=desc&apikey=8C1WCBKHRWRW1ETMUC9JE4YBG8P7JCUSEM').get();
export const transactions = request('api').get();
export const gettokens = request('api').get();
export const tokens = request('api').get();
export const balance = request('api').get();


export default request;
