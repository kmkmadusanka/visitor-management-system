const url = 'localhost';
const port = '5100';
const serverProtocol = 'http';
export const environment = {
  production: false,
  api_url: `${serverProtocol}://${url}:${port}/api/`,
  asserts: `${serverProtocol}://${url}:${port}/assets/`,
  imageUploadPath: `${serverProtocol}://${url}:${port}/uploads/`,
  socketUrl: `${serverProtocol}://${url}:${port}`,
  apiKey: 'api key goes to here',
};
