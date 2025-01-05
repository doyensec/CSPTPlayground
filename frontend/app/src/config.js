
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST ? process.env.REACT_APP_BACKEND_HOST : "localhost"
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT ? process.env.REACT_APP_BACKEND_PORT : "8000"

const config = {
  apiBaseUrl: `http://${BACKEND_HOST}:${BACKEND_PORT}`
};

export default config;