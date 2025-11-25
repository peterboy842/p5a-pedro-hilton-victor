import axios from 'axios';

// Default to localhost for web/desktop development. If you run the app on an
// Android emulator, change this to 'http://10.0.2.2:3333'. For a physical
// device use your machine LAN IP (eg 'http://192.168.x.y:3333').
const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api;