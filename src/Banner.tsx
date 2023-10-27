import BANNER_IMG1 from "./assets/banner_img1.jpg"
import BANNER_IMG2 from "./assets/banner_img2.jpg"
import BANNER_IMG3 from "./assets/banner_img3.jpg"
import BANNER_IMG4 from "./assets/banner_img4.jpg"
import BANNER_IMG5 from "./assets/banner_img5.jpg"
import "./Banner.css"

export default function Banner() {
    return (
        <div id = "banner">
            <img id="banner-img" src={BANNER_IMG1}/>
            <img id="banner-img" src={BANNER_IMG2}/>
            <img id="banner-img" src={BANNER_IMG3}/>
            <img id="banner-img" src={BANNER_IMG4}/>
            <img id="banner-img" src={BANNER_IMG5}/>
        </div>
    );
}