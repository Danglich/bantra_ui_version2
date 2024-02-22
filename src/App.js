import Layout from './layout';
import {
    Routes,
    Route,
    useLocation,
    useNavigate,
    Navigate,
} from 'react-router-dom';
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
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { useEffect } from 'react';
import UserDetail from './pages/UserDetail';
import Form from './pages/UserDetail/Form';
import ChangePasswordForm from './pages/UserDetail/ChangePWForm';
import OrderList from './pages/UserDetail/OrderList';
import ReviewableList from './pages/UserDetail/ReviewableList';
import LoginPage from './pages/LoginPage';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
function App() {
    const { login, user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            login(token); // Khôi phục trạng thái đăng nhập từ localStorage bằng AuthContext
        }
    }, [login]);

    useEffect(() => {
        if (!user) {
            if (location.pathname.includes('/thanh-vien')) {
                navigate('/login');
            }
        }
    }, [user, location, navigate]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="/oauth2/redirect"
                        element={<OAuth2RedirectHandler />}
                    ></Route>
                    <Route
                        path="/login"
                        element={
                            user ? <Navigate to="/thanh-vien" /> : <LoginPage />
                        }
                    ></Route>
                    <Route path="/product/:id" element={<Product />}></Route>
                    <Route path="/cam-nang" index element={<Post />}></Route>
                    <Route path="/cam-nang/:slug" element={<Post />}></Route>
                    <Route path="/thanh-vien" element={<UserDetail />}>
                        <Route index element={<Form />}></Route>
                        <Route
                            path="/thanh-vien/doi-mat-khau"
                            element={<ChangePasswordForm />}
                        ></Route>
                        <Route
                            path="/thanh-vien/quan-ly-don-hang"
                            element={<OrderList />}
                        ></Route>
                        <Route
                            path="/thanh-vien/danh-gia"
                            element={<ReviewableList />}
                        ></Route>
                    </Route>
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
