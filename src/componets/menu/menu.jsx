import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../menu/menu.css'; // Archivo CSS donde definiremos los estilos
import { FaHome, FaKey, FaList, FaQrcode  } from 'react-icons/fa';
import { FaGear, FaTicket } from 'react-icons/fa6';
import { useUsersContext } from "../../hooks/UsersContext";

function MenuItem({ item, isVisible, icon }) {
	const [isOpen, setIsOpen] = useState(false);
	
	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="w-full flex flex-col">
			<Link to={item.route} className="w-full">
				<div
					role="button"
					onClick={handleToggle}
					className={`text-gray-50 w-full flex gap-3 p-3 items-center hover:bg-white hover:text-blue-500 ${
						isOpen && isVisible ? 'bg-blue-100 text-blue-600' : ''
					}`}
				>
					<figure className="text-xl">{icon}</figure>
					{isVisible && (
						<span className="font-semibold">{item.title}</span>
					)}
				</div>
			</Link>
			{isOpen && isVisible && (
				<ul className="bg-blue-100">
					{item.subItems.map((subItem, i) => (
						<>
							<Link key={i} to={subItem.route} className="w-full">
								<li className="w-full  pl-10 py-2 font-semibold text-blue-400 hover:bg-gray-50">
									{subItem.title}
								</li>
							</Link>
						</>
					))}
				</ul>
			)}
		</div>
	);
}

function Menu({ isVisible }) {

	const usersContext = useUsersContext();
	var menuItems = [];

	if(usersContext.token){
		const initMenu = [
			{	title: 'Home', route: '/', subItems: [], icon: <FaHome /> },			
			{ 	title: 'Salir', route: '/logout', subItems: [], icon: <FaKey /> },
		];
		var auxi = [];
		if(usersContext.role == 'admin'){
			auxi = [
				initMenu[0],
				{ 	title: 'Eventos',
					subItems: [
						{ title: 'Eventos', route: '/events' },
						{ title: 'Ventas', route: '/events/ventaTicket' }
					],
					icon: <FaTicket />
				},
				{ title: 'Reportes', subItems: [], route: '/verifyEvent', icon: <FaList/> },
				{ title: 'Scaner', route: '/qrTicket', subItems: [], icon: <FaQrcode/> },
				{ title: 'Gestión de Usuarios',	route: '/users', subItems: [], icon: <FaGear />	},
				initMenu[1]
			];

		}
		if(usersContext.role == 'staff'){
			auxi = [
				initMenu[0],
				{ title: 'Scaner', route: '/qrTicket', subItems: [], icon: <FaQrcode/> },
				initMenu[1]
			];
		}
		menuItems = auxi;
	}else{
		menuItems = [
			{	title: 'Home', route: '/', subItems: [], icon: <FaHome />},
			{ 	title: 'Iniciar sesión', route: '/login', subItems: [], icon: <FaKey /> },
		];
	}


	return (
		<div className="menu overflow-auto">
			{menuItems.map((item) => (
				<MenuItem
					key={item.title}
					item={item}
					isVisible={isVisible}
					icon={item.icon}
				/>
			))}
		</div>
	);
}

export default Menu;
