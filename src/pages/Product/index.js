import { Row, Space, Rate, InputNumber, Button, Spin } from 'antd';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiUrl } from '../../constants';
import { marked } from 'marked';
import styles from './Product.module.scss';
import gfmHeadingId from 'marked-gfm-heading-id';
import Slide from './components/SlideImage';
import SlideProduct from './components/SlideProduct';
import numeral from 'numeral';
import { CheckCircleOutlined } from '@mui/icons-material';
import vcimg from '../../acsset/images/vcimg.png';
import { PlusOutlined, CaretDownOutlined } from '@ant-design/icons';
import Rating from '../../components/Rate';
import NotFound from '../../components/NotFound';
import LastView from '../../components/LastView';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { message } from 'antd';

const cx = classNames.bind(styles);

const options = {
    prefix: '',
};

marked.use(gfmHeadingId(options));

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [viewMore, setViewMore] = useState(false);
    const [suggest, setSuggest] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { onAdd, toggleShowCart } = useContext(CartContext);

    const handleAddCartItem = () => {
        onAdd(product, quantity);
        message.success('Đã thêm vào giỏ hàng!');
        toggleShowCart();
    };

    const handleBuyCartItem = () => {
        onAdd(product, quantity);
    };

    useEffect(() => {
        let isCacled = false;
        const fetchData = async (req, res) => {
            setIsLoading(true);
            try {
                const product = await axios.get(`${apiUrl}/product/${id}`);
                if (product.data) {
                    setProduct(product.data);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        if (!isCacled) {
            fetchData();
        }

        return () => (isCacled = true);
    }, [id]);

    useEffect(() => {
        document.title = product?.name;
    }, [product]);

    useEffect(() => {
        let isCacled = false;
        const fetchData = async (req, res) => {
            try {
                const products = await axios.get(
                    `${apiUrl}/product?categoryId=${product.category}&&type=less`,
                );
                if (products.data) {
                    setSuggest(products.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (!isCacled && product) {
            fetchData();
        }

        return () => (isCacled = true);
    }, [product]);

    const handleSetViewMore = () => {
        setViewMore(true);
    };

    const descRef = useCallback(
        (node) => {
            if (node) {
                node.innerHTML = marked.parse(product?.desc || '');
            }
        },
        [product],
    );

    if (isLoading) {
        return (
            <div className="my-[80px] w-full flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className={cx('container')}>
            <div className="xl:w-[1190px] xl:px-[0] w-[100%] px-[16px]">
                <div
                    className="flex  max-lg:block"
                    style={{ padding: '24px 0' }}
                >
                    <div className="w-[41.666667%] pr-[10px] max-lg:w-[100%] max-lg:px-[0]">
                        <div className={cx('images-container')}>
                            <Slide imageUrls={product?.images || []} />
                        </div>
                    </div>
                    <div className="w-[58.33333%] pl-[10px] max-lg:w-[100%] max-lg:px-[0]">
                        <div className={cx('info-container')}>
                            <h1 className={cx('name')}>{product?.name}</h1>
                            <Space size="large">
                                <div className={cx('rate')}>
                                    <strong>
                                        {product?.rate.reduce(
                                            (a, b) => a + b,
                                            0,
                                        ) / (product?.rate.length || 1)}
                                    </strong>
                                    <Rate
                                        allowHalf
                                        value={
                                            product?.rate.reduce(
                                                (a, b) => a + b,
                                                0,
                                            ) / (product?.rate.length || 1)
                                        }
                                        onFocus={() => {}}
                                        onHoverChange={() => {}}
                                    ></Rate>
                                </div>
                                <div className={cx('rate-count')}>
                                    <strong>{product?.rate.length}</strong>
                                    <span> Đánh giá</span>
                                </div>
                                <div className={cx('sale-count')}>
                                    <strong>{product?.saled}</strong>
                                    <span> Đã bán</span>
                                </div>
                            </Space>
                            <div className={cx('price')}>
                                {numeral(product?.price * 1000).format('0,0')}đ
                            </div>
                            <div className={cx('info-more')}>
                                <h2 className={cx('info-title')}>
                                    Thông tin sản phẩm
                                </h2>
                                <ul className={cx('info-list')}>
                                    {product?.infos.map((info) => (
                                        <li
                                            key={info}
                                            className={cx('info-item')}
                                        >
                                            <CheckCircleOutlined
                                                style={{
                                                    color: 'green',
                                                    fontSize: '1.8rem',
                                                }}
                                            />
                                            <span>{info}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Space
                                align="start"
                                style={{
                                    paddingLeft: '12px',
                                    marginTop: '16px',
                                }}
                                size="middle"
                            >
                                Vận chuyển:
                                <img src={vcimg} alt=""></img>
                                <strong
                                    style={{
                                        maxWidth: '160px',
                                        display: 'inline-block',
                                    }}
                                >
                                    Vận chuyển miễn phí trên toàn quốc
                                </strong>
                            </Space>
                            <Row>
                                <Space
                                    style={{
                                        paddingLeft: '12px',
                                        marginTop: '18px',
                                    }}
                                >
                                    Số lượng:{' '}
                                    <InputNumber
                                        min={1}
                                        value={quantity}
                                        onChange={setQuantity}
                                    ></InputNumber>
                                </Space>
                            </Row>
                            <Space size="large" style={{ marginTop: '20px' }}>
                                <Button
                                    icon={<PlusOutlined />}
                                    size="large"
                                    danger
                                    onClick={handleAddCartItem}
                                >
                                    Thêm vào giỏ hàng
                                </Button>
                                <Link to="/pay" onClick={handleBuyCartItem}>
                                    <Button
                                        style={{
                                            fontWeight: 'bold',
                                            minWidth: '150px',
                                        }}
                                        size="large"
                                        type="primary"
                                        danger
                                    >
                                        Mua ngay
                                    </Button>
                                </Link>
                            </Space>
                        </div>
                    </div>
                </div>
                <div className="flex max-lg:block">
                    <div className="w-[66.666667%]  pr-[12px] max-lg:w-[100%] max-lg:px-[0]">
                        <div className={cx('content-container')}>
                            <h1 className={cx('title')}>Mô tả sản phẩm</h1>
                            <div
                                ref={descRef}
                                className={cx(
                                    'desc-container',
                                    viewMore && 'viewMore',
                                )}
                            ></div>
                            {!viewMore && (
                                <button
                                    className={cx('view-more-btn')}
                                    onClick={handleSetViewMore}
                                >
                                    Xem thêm
                                    <CaretDownOutlined className="ml-[3px]" />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="w-[33.333333%]  pl-[12px] max-lg:w-[100%] max-lg:px-[0]"></div>
                </div>
                {suggest.length > 0 && (
                    <div className={cx('suggest-container')}>
                        <SlideProduct products={suggest} />
                    </div>
                )}

                <LastView />
                <Rating title="Đánh giá sản phẩm" />
                <NotFound title="Không tìm thấy đánh giá nào cho sản phẩm này" />
            </div>
        </div>
    );
}

export default Product;
