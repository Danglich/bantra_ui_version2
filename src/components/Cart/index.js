import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import ItemCart from '../ItemCart';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import NotFound from '../NotFound';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../contexts/OrderContext';

function Cart({ isShowing, toggle }) {
    const { cartItems } = useContext(CartContext);

    const { addOrderToPay } = useContext(OrderContext);
    const navigate = useNavigate();

    const handleRedirectPay = () => {
        addOrderToPay(cartItems);
        toggle();
        navigate('/pay');
    };

    return isShowing
        ? ReactDOM.createPortal(
              <div className="w-[100vw]  top-[0] fixed right-[0] h-[100vh]">
                  <div className="w-[420px] pb-[50px] animate-[fakeToLeft_0.5s_ease-in-out] max-w-[100%] bg-[white] fixed z-[10000] h-full right-[0] top-[0]">
                      <div className="h-[58px] flex items-center justify-between px-[20px] border-b-[1px] border-[#ccc]">
                          <h1 className="text-[17px] font-[800]">GIỎ HÀNG</h1>
                          <div
                              onClick={toggle}
                              className="w-[30px] h-[30px] bg-[#006837] cursor-pointer rounded-full flex items-center justify-center"
                          >
                              <CloseIcon className=" text-white dark:text-[#555] text-[22px]" />
                          </div>
                      </div>

                      {cartItems.length > 0 ? (
                          <>
                              <div className="h-[calc(100%-138px)] overflow-y-auto">
                                  {cartItems.map((item) => (
                                      <ItemCart key={item.id} cartItem={item} />
                                  ))}
                              </div>

                              {/* Footer */}
                              <div
                                  className="px-[20px] py-[20px] block"
                                  onClick={handleRedirectPay}
                              >
                                  <div className="h-[40px] hover:opacity-[0.8] flex items-center justify-center cursor-pointer bg-[#006837] text-white dark:text-[#555] text-[17px] font-[900]">
                                      THANH TOÁN
                                  </div>
                              </div>
                          </>
                      ) : (
                          <NotFound title="Giỏ hàng của bạn chưa có sản phẩm nào " />
                      )}
                  </div>

                  {/* Overlay */}
                  <div
                      onClick={toggle}
                      className="w-[100vw] animate-[light_0.5s_ease-in-out] top-[0] fixed right-[0] h-[100vh] bg-[rgba(0,0,0,0.7)] z-[1]"
                  ></div>
              </div>,
              document.body,
          )
        : null;
}

export default Cart;
