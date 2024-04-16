import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Url from "./pages/url/list/url";
import UrlPageId from "./pages/url/urlIdPage/urlPageId";
import User from './pages/user/list/user';
import Login from "./pages/user/auth/login/login";
import Register from "./pages/user/auth/register/register";

function App() {
    return (
        <Routes>
            <Route path={`/`}>
                <Route index element={<Url/>}/>
                <Route path={`/:id`} element={<UrlPageId/>}/>
                <Route path={`/user`} element={<User/>}/>
                <Route path={`/user/login`} element={<Login/>}/>
                <Route path={`/user/register`} element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default App;