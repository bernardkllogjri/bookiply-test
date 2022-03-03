import { API_URL } from "config";

export const request = (uri: string) => {
  return fetch(`${API_URL}/${uri}`)
  .then((response) => {
    const totalCount = response.headers.get('X-total-count')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${ response.status }`);
    }
    
    return response.json().then((data) => ({
      data,
      totalCount: totalCount ? parseInt(totalCount, 10): 0
    }));
  })
}

export default request