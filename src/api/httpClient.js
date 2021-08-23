import axios from "axios";

const _httpClient = _initHttpClient();

function formatQueryString(params) {
  return Object.keys(params)
    .map(key => key + "=" + params[key])
    .join("&");
}

export function genericGet(resourceUrl, params) {
  return _httpClient
    .get(resourceUrl + "?" + formatQueryString(params))
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function genericPost(resourceUrl, params) {
  return _httpClient
    .post(resourceUrl + "?" + formatQueryString(params))
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

function _initHttpClient() {
  const httpClient = axios.create({
    baseURL: "https://api.snowdata.info",
    timeout: 1000,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    token:
      "__;!!CKZwjTOV!lVxK8EZJqs-J54lKkda5xdQyXJOTVrmCLNegZYt5mqIs8aiqZVFrwim64TE$"
  });
  return httpClient;
}
