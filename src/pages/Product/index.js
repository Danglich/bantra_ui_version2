import { Row, Space, Rate, InputNumber, Button, Spin } from 'antd';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../constants';
import { marked } from 'marked';
import styles from './Product.module.scss';
import gfmHeadingId from 'marked-gfm-heading-id';
import Slide from './components/SlideImage';
import SlideProduct from './components/SlideProduct';
import numeral from 'numeral';
import { CheckCircleOutlined } from '@mui/icons-material';
import vcimg from '../../acsset/images/vcimg.png';
import { PlusOutlined } from '@ant-design/icons';
import Rating from '../../components/Rate';
import NotFound from '../../components/NotFound';
import LastView from '../../components/LastView';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { message } from 'antd';
import { OrderContext } from '../../contexts/OrderContext';
import ReviewItem from './components/ReviewItem';
import { AuthContext } from '../../contexts/AuthContext';

const cx = classNames.bind(styles);

const options = {
    prefix: '',
};

marked.use(gfmHeadingId(options));

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('0');
    const { user } = useContext(AuthContext);
    const [price, setPrice] = useState(null);

    const [reviewsFiltered, setReviewsFiltered] = useState([]);

    useEffect(() => {
        const reviews = product?.reviews;
        if (filter == '0') {
            setReviewsFiltered(reviews);
        } else {
            setReviewsFiltered(reviews.filter((r) => r.rate == filter));
        }
    }, [product, filter]);

    const navigate = useNavigate();

    const [suggest, setSuggest] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [variationId, setVariationId] = useState(null);

    const handleChangeVariation = (variationId) => {
        setVariationId(variationId);
        const price = product?.variations.find(
            (v) => v.id == variationId,
        )?.price;
        setPrice(price);
    };

    const { onAdd } = useContext(CartContext);

    const { addOrderToPay } = useContext(OrderContext);

    const handleBuyCartItem = () => {
        if (variationId == null) {
            message.error('Vui lòng chọn quy cách !');
        } else {
            const productVariation = product.variations.find(
                (variation) => variation.id === variationId,
            );

            addOrderToPay([
                {
                    variation: productVariation,
                    product: product,
                    quantity: 1,
                },
            ]);

            navigate('/pay');
        }
    };

    const handleAddCartItem = async () => {
        if (variationId === null) {
            message.error('Vui lòng chọn quy cách !');
        } else {
            let variation = product.variations.find(
                (v) => v.id === variationId,
            );
            onAdd(product, variation, quantity);
        }
    };

    // const handleBuyCartItem = () => {
    //     onAdd(product, quantity);
    // };

    function calculateAverageRating(reviews) {
        if (reviews?.length === 0 || !reviews) {
            return 0; // Trả về 0 nếu không có đánh giá nào
        }

        const totalRatings = reviews.reduce(
            (sum, review) => sum + review.rate,
            0,
        );
        const averageRating = totalRatings / reviews.length;

        return parseFloat(averageRating.toFixed(1));
    }

    useEffect(() => {
        let isCacled = false;
        const fetchData = async (req, res) => {
            setIsLoading(true);
            try {
                const product = await axios.get(`${apiUrl}/api/products/${id}`);
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

    const handleChangeRateFilter = (rate) => {
        setFilter(rate);
    };

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
                            <Slide medias={product?.medias || []} />
                        </div>
                    </div>
                    <div className="w-[58.33333%] pl-[10px] max-lg:w-[100%] max-lg:px-[0]">
                        <div className={cx('info-container')}>
                            <h1 className={cx('name')}>{product?.name}</h1>
                            <Space size="large">
                                <div className={cx('rate')}>
                                    <strong>
                                        {calculateAverageRating(
                                            product?.reviews,
                                        )}
                                    </strong>
                                    <Rate
                                        allowHalf
                                        value={calculateAverageRating(
                                            product?.reviews,
                                        )}
                                        onFocus={() => {}}
                                        onHoverChange={() => {}}
                                    ></Rate>
                                </div>
                                <div className={cx('rate-count')}>
                                    <strong>{product?.reviews.length}</strong>
                                    <span> Đánh giá</span>
                                </div>
                                <div className={cx('sale-count')}>
                                    <strong>{product?.soldNumber}</strong>
                                    <span> Đã bán</span>
                                </div>
                            </Space>
                            {!price ? (
                                <div className={cx('price')}>
                                    {numeral(
                                        product?.lowestPrice * 1000,
                                    ).format('0,0')}
                                    đ<span className="text-[24px]"> - </span>
                                    {numeral(
                                        product?.highestPrice * 1000,
                                    ).format('0,0')}
                                    đ
                                </div>
                            ) : (
                                <div className={cx('price')}>
                                    {numeral(price * 1000).format('0,0')}đ
                                </div>
                            )}

                            <div className={cx('info-more')}>
                                <h2 className={cx('info-title')}>
                                    Thông tin sản phẩm
                                </h2>
                                <ul className={cx('info-list')}>
                                    {product?.informations.map((info) => (
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
                                            <span>{info.information}</span>
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

                            {/* quy cách */}
                            <div class="flex mt-[12px]">
                                <p>Quy cách : </p>
                                <ul class="flex flex-wrap ">
                                    {product?.variations.map((variation) => (
                                        <li
                                            onClick={() =>
                                                handleChangeVariation(
                                                    variation.id,
                                                )
                                            }
                                            key={variation.id}
                                            className={`${
                                                variationId === variation.id &&
                                                'text-blue-600'
                                            } px-[12px] cursor-pointer py-[4px] rounded-[4px] border-[1px] border-[#ccc] mx-[6px]`}
                                        >
                                            {variation.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

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
                                <div onClick={handleBuyCartItem}>
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
                                </div>
                            </Space>
                        </div>
                    </div>
                </div>
                <div className="flex max-lg:block">
                    <div className="w-[66.666667%] pr-[12px] max-lg:w-[100%] max-lg:px-[0]">
                        <div className={cx('content-container')}>
                            <h1 className={`${cx('title')} mb-[16px]`}>
                                Mô tả sản phẩm
                            </h1>
                            <p>{product?.description}</p>
                        </div>
                    </div>
                    <div className="w-[33.333333%]  pl-[12px] max-lg:w-[100%] max-lg:px-[0]">
                        <h1 className="font-bold text-[24px] mb-[8px]">
                            Thông tin chi tiết
                        </h1>
                        <ul>
                            {product?.properties.map((prop, index) => (
                                <li
                                    key={prop.id}
                                    className={`${
                                        index % 2 === 0 ? 'bg-[#eaeaea]' : ''
                                    } px-[8px] py-[8px]`}
                                >
                                    <span>{prop.name}</span>
                                    <span> : </span>
                                    <span>{prop.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {suggest.length > 0 && (
                    <div className={cx('suggest-container')}>
                        <SlideProduct products={suggest} />
                    </div>
                )}

                <LastView />
                <Rating
                    title="Đánh giá sản phẩm"
                    onChange={handleChangeRateFilter}
                    rate={calculateAverageRating(product?.reviews)}
                />

                <div className="mb-[24px]">
                    {reviewsFiltered?.map((review) => {
                        if (review.user.id === user?.id) {
                            return <ReviewItem review={review} />;
                        }
                    })}
                    {reviewsFiltered?.map((review) => {
                        if (review.user.id !== user?.id) {
                            return <ReviewItem review={review} />;
                        }
                    })}
                </div>

                {reviewsFiltered?.length <= 0 && (
                    <NotFound title="Không tìm thấy đánh giá nào cho sản phẩm này" />
                )}
            </div>
        </div>
    );
}

export default Product;
