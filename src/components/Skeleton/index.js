import classNames from 'classnames/bind';
import styles from './Skeleton.module.scss';

const cx = classNames.bind(styles);

function Skeleton({ type, count }) {
    const SkeletonCategory = () => <div className={cx('category-item')}></div>;
    const SkeletonProduct = () => (
        <div className="w-[25%] px-[7px] mb-[16px]">
            <div className="xl:h-[388px] sm:h-[346px] rounded-[10px] bg-[#999] skeleton"></div>
        </div>
    );

    if (type === 'category')
        return Array(count)
            .fill(1)
            .map((item, index) => {
                return <SkeletonCategory key={index} />;
            });
    if (type === 'product') {
        return Array(count)
            .fill(1)
            .map((item, index) => {
                return <SkeletonProduct key={index} />;
            });
    }
}

export default Skeleton;
