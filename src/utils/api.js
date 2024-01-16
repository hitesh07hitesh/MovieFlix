import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2QzNTZlYWU3ODZkYzczY2U0MmJlYTk1N2IwMjA3ZSIsInN1YiI6IjY1OWY5MmE2MWJmODc2MDEyYWFjNjViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._AxObceJCafN4xBNL4r-duzCO2YXJxTyrZlYYGJFXoQ"

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};


// import axios from 'axios'

// const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2QzNTZlYWU3ODZkYzczY2U0MmJlYTk1N2IwMjA3ZSIsInN1YiI6IjY1OWY5MmE2MWJmODc2MDEyYWFjNjViYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._AxObceJCafN4xBNL4r-duzCO2YXJxTyrZlYYGJFXoQ"

// export const fetchDataFromApi = async (url, params) => {
//     try {
//         const data = await axios.get("https://api.themoviedb.org/3" + url, {
//             headers: {
//                 Authorization: "bearer " + TMDB_TOKEN,
//                 params
//             },

//         })
//         return data
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// } 