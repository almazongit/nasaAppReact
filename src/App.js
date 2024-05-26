import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import {NavBar} from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Apod} from './components/Apod';
import {Epic} from './components/Epic';
import {Rover} from './components/Rover';
import Main from './components/Main';
import { Helmet } from 'react-helmet';

function App() {
    return (
        <>
            <Helmet>
                <title>Diamond and NASA</title>
            </Helmet>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Main/>} index/>
                    <Route path="/apod" element={<Apod/>}/>
                    <Route path="/epic" element={<Epic/>}/>
                    <Route path="/rover" element={<Rover/>}/>
                </Routes>
            </Router>
        </>

    );
}

export default App;