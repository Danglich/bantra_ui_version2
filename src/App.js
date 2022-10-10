import Layout from './layout';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
