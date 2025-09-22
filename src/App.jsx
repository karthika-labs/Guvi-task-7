import React, { useContext, useState } from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import { Navigate } from 'react-router-dom'
import Home from './Home'
import OverView from './OverView'
import Favorites from './Favorites'
import {UserProvider} from './MoviesContext'



function App() {
const [favorites,setFavorites]=useState([])



  let handleFavorites =  (movie) => {
    
    


   let isAlreadyIn=favorites.some((fav)=>fav.imdbID===movie.imdbID) 
  
   if(isAlreadyIn){
   
    console.log("already in favorites")
    
   }

   else{
     
    setFavorites([...favorites,movie])
    
  };
}

let handleRemove=(movie)=>{
    let copy = [...favorites];
  let index= copy.findIndex(fav=>{
      return fav.imdbID===movie.imdbID
    })
   copy.splice(index,1)
    setFavorites(copy)
    console.log("favorites removed",copy)

}


  return (
  <>
   <UserProvider>
  < BrowserRouter>
  <Routes>
     {/* Redirect from "/" to "/movies" */}
    <Route path="/"  element={<Navigate to="movies" replace />}/>

    {/* Home route with nested routes */}
     <Route  path="movies" element={<Home handleFavorites={handleFavorites} favorites={favorites} handleRemove={handleRemove}/>}> </Route>
    <Route path="/movies/:imdbID" element={<OverView/>}/>
    <Route path="/movies/favorites"  element={<Favorites handleFavorites={handleFavorites} favorites={favorites} handleRemove={handleRemove} />}/>

   
  </Routes>
  </BrowserRouter>
  </ UserProvider>
  
  </>
  )
}

export default App
