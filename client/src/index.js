import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ updated import
import App from './App';
import {BrowserRouter} from "react-router";

const root = ReactDOM.createRoot(document.getElementById('root')); // ✅ updated syntax
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
