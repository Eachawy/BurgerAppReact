import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-my-burger-eddda.firebaseio.com/'
});


export default instance;

