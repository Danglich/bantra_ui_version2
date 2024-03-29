import { Navigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { message } from 'antd';

function OAuth2RedirectHandler() {
    const location = useLocation();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(location.search);
        return results === null
            ? ''
            : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        message.success('Đã đăng nhập thành công');
        return (
            <Navigate
                to={{
                    pathname: '/',
                }}
            />
        );
    } else {
        message.error('Đăng nhập thất bại');
        return (
            <Navigate
                to={{
                    pathname: '/login',
                    state: error,
                }}
            />
        );
    }
}

export default OAuth2RedirectHandler;
