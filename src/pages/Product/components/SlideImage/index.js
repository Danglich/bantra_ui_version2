import { useState } from 'react';
import Slider from 'react-slick';
import styles from './Slide.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Slide({ imageUrls }) {
    const [slide1, setSlide1] = useState();
    const [slide2, setSlide2] = useState();

    return (
        <div>
            <Slider
                asNavFor={slide2}
                ref={(slider) => {
                    setSlide1(slider);
                }}
                classNames={cx('slide1')}
            >
                {imageUrls.map((image) => (
                    <div style={{}}>
                        <img
                            style={{
                                width: '100%',
                                height: '430px',
                                cursor: 'pointer',
                            }}
                            className="max-lg:h-[650px!important] max-sm:h-[360px!important]"
                            key={image}
                            src={image}
                            alt="ảnh"
                        ></img>
                    </div>
                ))}
            </Slider>
            <Slider
                asNavFor={slide1}
                ref={(slider) => {
                    setSlide2(slider);
                }}
                slidesToShow={4}
                swipeToSlide={true}
                focusOnSelect={true}
                className={cx('slider2-container')}
            >
                {imageUrls.map((image) => (
                    <div>
                        <img
                            style={{
                                height: '90px',
                                width: '100%',
                                cursor: 'pointer',
                            }}
                            className="max-lg:h-[155px!important] max-sm:h-[80px!important]"
                            key={image}
                            src={image}
                            alt="ảnh"
                        ></img>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Slide;
