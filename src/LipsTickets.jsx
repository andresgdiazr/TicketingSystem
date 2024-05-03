import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Menu from './componets/menu/menu';
import routes from './routes/index';
import Footer from './routes/footer/Footer';
import { UsersProvider } from './hooks/UsersContext';

import { useEffect } from 'react';
import { FaArrowLeft, FaBars } from 'react-icons/fa';

function LipsTickets() {
	const [isMenuVisible, setIsMenuVisible] = useState(true);
	const [isVisible, setIsVisible] = useState(true);

	const toggleMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	useEffect(() => {
		setIsVisible(isMenuVisible);
	}, [isMenuVisible]);

	return (
		<UsersProvider>
			<Router>
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
					<section className="w-full h-full overflow-auto">
						<Routes>
							{routes.map((route) => (
								<Route
									key={route.path}
									path={route.path}
									element={route.element}
								/>
							))}
						</Routes>
						<Footer />
					</section>
				</main>
			</Router>
		</UsersProvider>
	);
}

export default LipsTickets;
