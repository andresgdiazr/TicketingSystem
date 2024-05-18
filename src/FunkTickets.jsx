import { useState } from 'react';
import Menu from './componets/menu/menu';
import Footer from './routes/footer/Footer';

import { useEffect } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';

function FunkTickets() {
	const [isMenuVisible, setIsMenuVisible] = useState(true);
	const [isVisible, setIsVisible] = useState(true);

	const toggleMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	useEffect(() => {
		setIsVisible(isMenuVisible);
	}, [isMenuVisible]);

	return (
		<main className="w-full h-screen flex">
			<aside
				className="bg-blue-500 h-full flex flex-col"
				style={{ width: isMenuVisible ? 320 : 50 }}
			>
				<header className="w-full flex justify-end p-2 mb-6">
					<button
						className="text-xl rounded-circle text-gray-50 p-2 hover:bg-white hover:text-blue-500"
						onClick={toggleMenu}
					>
						{isMenuVisible ? <FaArrowLeft /> : <FaBars />}
					</button>
				</header>
				<Menu isVisible={isVisible} />
			</aside>
			<section className="relative flex flex-col justify-between w-full overflow-auto">
				<Outlet /> {/* contenido */}
				<Footer />
			</section>
		</main>
	);
}

export default FunkTickets;
