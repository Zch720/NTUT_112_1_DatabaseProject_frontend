import BANNER_IMG1 from "../assets/banner_img1.jpg"
import BANNER_IMG2 from "../assets/banner_img2.jpg"
import BANNER_IMG3 from "../assets/banner_img3.jpg"
import BANNER_IMG4 from "../assets/banner_img4.jpg"
import BANNER_IMG5 from "../assets/banner_img5.jpg"
import "./Banner.css"

export default function Banner() {
    return (
        <div className="banner">
            <img src={BANNER_IMG1}/>
            <img src={BANNER_IMG2}/>
            <img src={BANNER_IMG3}/>
            <img src={BANNER_IMG4}/>
            <img src={BANNER_IMG5}/>
            <img src={BANNER_IMG1}/>
        </div>
    );
}