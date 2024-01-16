import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header.jsx'
import { fetchDataFromApi } from './utils/api.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Comp from './components/Carousel.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import Details from './pages/Details.jsx'


function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home)
  console.log(url)

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res.data); 
      console.log(res)
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      // dispatch(getApiConfiguration(res.data));
      dispatch(getApiConfiguration(url));

    });
  };


  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };


  return (
    <div className=' h-full app'>
      <BrowserRouter>
        <Header />


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='*' element={<PageNotFound />} />
          {/* <Route path='/' element={<Home />} /> */}
        </Routes>

      </BrowserRouter>

      {url?.total_pages}
    </div>
  )
}

export default App
