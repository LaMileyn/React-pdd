import React from 'react';
import './styles/main.scss'
import './styles/variables.scss'
import MainPage from "./views/Main/MainPage/MainPage";
import Header from "./components/Header/Header";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <MainPage/>
        </div>
    );
}

export default App;
