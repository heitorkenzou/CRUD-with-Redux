import React, {useEffect} from "react";
import "./_assets/App.css";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { fetchPosts } from './redux/posts.slice.js'

export default function App() {
  const dispatch=useDispatch()
  
 useEffect(() => {
  dispatch(fetchPosts());
}, [dispatch]);
  return (
    <Router>
      <Routes />
    </Router>
  );
}
