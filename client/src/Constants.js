let API_ENDPOINT;

if(process.env.NODE_ENV === 'development') {
    API_ENDPOINT = 'http://localhost:3000'
}

export default API_ENDPOINT;