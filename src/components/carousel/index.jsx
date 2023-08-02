import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
    {
        original: "/assets/portfolio/airbnb-clone-2.webp",
        thumbnail: "/assets/portfolio/airbnb-clone-2.webp",
    },
    {
        original: "/assets/portfolio/urban-outfitters-clone.webp",
        thumbnail: "/assets/portfolio/urban-outfitters-clone.webp",
    },
    {
        original: "/assets/portfolio/nygeneralrenovation.webp",
        thumbnail: "/assets/portfolio/nygeneralrenovation.webp",
    },
    {
        original: "/assets/portfolio/blog-app.webp",
        thumbnail: "/assets/portfolio/blog-app.webp",
    },
    {
        original: "/assets/portfolio/portfolio.webp",
        thumbnail: "/assets/portfolio/portfolio.webp",
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