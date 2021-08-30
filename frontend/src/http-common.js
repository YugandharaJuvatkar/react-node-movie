import axios from 'axios';

axios.create({
    baseURL:"http://localhost:5000/api/v1/movies",
    headers :{
        "content-type":"application/json",
    },
});