import Layout from './layout';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ScrollToTop from './components/ScrollToTop';
import Category from './pages/Category';
import Post from './pages/Post';
import Introduce from './pages/Introduce';
import PostDetail from './pages/PostDetail';
import Pay from './pages/Pay';
import Contact from './pages/Contact';
import Search from './pages/Search';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/product/:id" element={<Product />}></Route>
                    <Route path="/cam-nang" index element={<Post />}></Route>
                    <Route path="/cam-nang/:slug" element={<Post />}></Route>
                    <Route
                        path="/gioi-thieu"
                        index
                        element={<Introduce />}
                    ></Route>
                    <Route path="/:slug" element={<Category />}></Route>
                    <Route
                        path="/cam-nang/:slug/:id"
                        element={<PostDetail />}
                    ></Route>
                    <Route path="/pay" element={<Pay />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/search" element={<Search />}></Route>
                </Route>
            </Routes>
            <ScrollToTop />
        </div>
    );
}

export default App;
