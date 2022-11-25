import React from "react";
import ReactDOM from "react-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'



import App from './App';
const Root = ReactDOM.createRoot(document.getElementById("root"))

Root.render (
    <ChakraProvider>
        <App />,
    </ChakraProvider>
)
