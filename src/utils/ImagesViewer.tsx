import { useState, useEffect, useRef } from "react";
import "./ImagesViewer.css";

export default function ImagesViewer({ images }: { images: string[] }) {
    const [imageIndex, setImageIndex] = useState<number>(0);
    const imageBoxRef = useRef<HTMLDivElement>(null);

    const imageIndexAdd = () => {
        if (imageIndex + 1 >= images.length) return;
        setImageIndex(imageIndex + 1);
    }
    const imageIndexSub = () => {
        if (imageIndex - 1 < 0) return;
        setImageIndex(imageIndex - 1);
    }

    useEffect(() => {
        if (imageBoxRef.current) {
            const imageBoxHeight = imageBoxRef.current.clientHeight;
            const newPosition = -imageIndex * imageBoxHeight;
            imageBoxRef.current.style.transform = `translateX(${newPosition}px)`;
            imageBoxRef.current.style.transition = "transform 0.3s ease-in-out";
        }
    }, [imageIndex]);

    return (
        <div className="images-viewer-container">
            <div className="images-viewer-image">
                <div className="images-viewer-image-box" ref={imageBoxRef}>
                    {images.map((image, index) => (
                        <div key={`images-viewer-img-${index}`} className="images-viewer-image-container">
                            <img className="images-viewer-image-item" src={image} alt="image" />
                        </div>
                    ))}
                </div>
            </div>
            <button className="images-viewer-prev-button" onClick={imageIndexSub}></button>
            <button className="images-viewer-next-button" onClick={imageIndexAdd}></button>

            <div className="images-viewer-index">
                {images.map((_, index) => (
                    index === imageIndex ?
                        <img key={`images-viewer-dot-${index}`} className="images-viewer-image-dot" src="/images/images_viewer_dot_choosed.svg"></img>
                    :
                        <img key={`images-viewer-dot-${index}`} className="images-viewer-image-dot" src="/images/images_viewer_dot.svg"></img>
                ))}
            </div>
        </div>
    );
}