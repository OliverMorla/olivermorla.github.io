import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    {
        original: "/public/assets/portfolio/airbnb-clone-2.webp",
        thumbnail: "/public/assets/portfolio/airbnb-clone-2.webp",
    },
    {
        original: "/public/assets/portfolio/urban-outfitters-clone.webp",
        thumbnail: "/public/assets/portfolio/urban-outfitters-clone.webp",
    },
    {
        original: "/public/assets/portfolio/nygeneralrenovation.webp",
        thumbnail: "/public/assets/portfolio/nygeneralrenovation.webp",
    },
    {
        original: "/public/assets/portfolio/blog-app.webp",
        thumbnail: "/public/assets/portfolio/blog-app.webp",
    },
    {
        original: "/public/assets/portfolio/portfolio.webp",
        thumbnail: "/public/assets/portfolio/portfolio.webp",
    },
];

const Carousel = () => {
    return (
        <main style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexGrow: 1,
        }}>
            <ReactImageGallery
                items={images}
                autoPlay={true}
            />
        </main>
    );
}

export default Carousel;