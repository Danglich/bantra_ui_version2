function NotFound({ title }) {
    return (
        <div className="w-full my-[60px] flex flex-col items-center ">
            <span className="w-full text-center font-bold text-[18px] mb-[12px] text-[#555]">
                {title}
            </span>
            <img
                alt="not found"
                src="https://haitratancuong.com/skins/default/images/nothing-found.png"
            ></img>
        </div>
    );
}

export default NotFound;
