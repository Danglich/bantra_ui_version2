import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../constants';
import CloseIcon from '@mui/icons-material/Close';
function ModalCategory({ isShowing, toggle }) {
    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        let isCacled = false;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/category`);
                setCategorys(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (!isCacled) {
            fetchData();
        }

        return () => (isCacled = true);
    }, []);
    return isShowing
        ? ReactDOM.createPortal(
              <div>
                  <div className=" animate-[fakeToRight_0.5s_ease-in-out] w-[320px] pt-[16px] bg-white fixed top-0 bottom-0 left-0 z-[10]">
                      <ul>
                          {categorys.map((item) => (
                              <li
                                  className="uppercase font-[900] text-[17px] border-b-[1px] border-[#ccc] py-[10px] px-[20px] cursor-pointer"
                                  key={item._id}
                                  onClick={toggle}
                              >
                                  <Link to={`/${item.slug}`}>{item.name}</Link>
                              </li>
                          ))}
                      </ul>
                      <ul>
                          <li className="pt-[12px] px-[20px]" onClick={toggle}>
                              <Link
                                  className="text-[13px] font-[400]"
                                  to="/gioi-thieu"
                              >
                                  Giới thiệu
                              </Link>
                          </li>
                          <li className="pt-[3px] px-[20px]" onClick={toggle}>
                              <Link
                                  className="text-[13px] font-[400]"
                                  to="/cam-nang"
                              >
                                  Cẩm nang
                              </Link>
                          </li>
                          <li className="pt-[3px] px-[20px]" onClick={toggle}>
                              <Link
                                  className="text-[13px] font-[400]"
                                  to="/contact"
                              >
                                  Liên hệ
                              </Link>
                          </li>
                      </ul>
                      <div
                          onClick={toggle}
                          className="absolute top-[0px] right-[-50px] cursor-pointer w-[48px] h-[48px] flex items-center justify-center"
                      >
                          <CloseIcon className="icon-close text-white dark:text-[#555]" />
                      </div>
                  </div>
                  <div
                      onClick={toggle}
                      className=" animate-[light_0.5s_ease-in-out]  fixed z-[9] bg-[rgba(0,0,0,0.7)] top-[0] right-0 left-0 bottom-0"
                  ></div>
              </div>,
              document.body,
          )
        : null;
}

export default ModalCategory;
