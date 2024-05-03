import { useState, useEffect } from 'react';
import './BannerSlider.css'; // Estilo CSS para el slider

const BannerSlider = ({ images }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const newIndex = (currentImageIndex + 1) % images.length;
			setCurrentImageIndex(newIndex);
		}, 5000); // Cambia 5000 a la duración deseada en milisegundos
		return () => clearInterval(intervalId);
	}, [currentImageIndex, images.length]);

	const nextImage = () => {
		const newIndex = (currentImageIndex + 1) % images.length;
		setCurrentImageIndex(newIndex);
	};

	const prevImage = () => {
		const newIndex =
			(currentImageIndex - 1 + images.length) % images.length;
		setCurrentImageIndex(newIndex);
	};

	const selectImage = (index) => {
		setCurrentImageIndex(index);
	};

	return (
		<div className="banner-slider">
			<div className="slider-container rounded overflow-hidden">
				{images.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`Slide ${index + 1}`}
						className={`slider-image  ${
							index === currentImageIndex ? 'active' : ''
						}`}
					/>
				))}
				<button onClick={prevImage} className="prev-button">
					&lt;
				</button>
				<button onClick={nextImage} className="next-button">
					&gt;
				</button>
			</div>
			<div className="image-selector">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => selectImage(index)}
						className={`selector-button ${
							index === currentImageIndex ? 'active' : ''
						}`}
					>
						{index + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default BannerSlider;
