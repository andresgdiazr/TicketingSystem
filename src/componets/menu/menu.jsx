import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../menu/menu.css'; // Archivo CSS donde definiremos los estilos
import { FaHome, FaKey, FaList } from 'react-icons/fa';
import { FaGear, FaTicket } from 'react-icons/fa6';

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
						isOpen && isVisible ? 'bg-blue-100 text-blue-500' : ''
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
						<Link key={i} to={subItem.route} className="w-full">
							<li className="w-full  pl-10 py-2 font-semibold text-blue-400 hover:bg-gray-50">
								{subItem.title}
							</li>
						</Link>
					))}
				</ul>
			)}
		</div>
	);
}

function Menu({ isVisible }) {
	const menuItems = [
		{
			title: 'Home',
			route: '/',
			subItems: [],
			icon: <FaHome />,
		},
		{
			title: 'Entradas',
			subItems: [
				{ title: 'Ventas', route: '/ventaTicket' },
				{ title: 'Scaner', route: '/qrTicket' },
			],
			icon: <FaTicket />,
		},
		{
			title: 'Administración',
			subItems: [
				{ title: 'Academias', route: '/academias' },
				{ title: 'Estudiante', route: '/students' },
				{ title: 'Eventos', route: '/events' },
				{ title: 'Entradas', route: '/tickets' },
				{ title: 'Ticket Vendídos', route: '/ticketsVendido' },
				{ title: 'Usuários', route: '/users' },
				{ title: 'Contactos', route: '/contact' },
			],
			icon: <FaGear />,
		},
		{
			title: 'Listados',
			subItems: [
				{ title: 'Gestión Administratíva', route: '/getionAdmin' },
				{ title: 'Verificación de Evento', route: '/verifyEvent' },
			],
			icon: <FaList />,
		},
		{
			title: 'Accesos',
			subItems: [
				{ title: 'Cámbio de Clave', route: '/cambioClave' },
				{ title: 'Inicio de Sesión', route: '/login' },
				{ title: 'Salír', route: '/salir' },
			],
			icon: <FaKey />,
		},
	];

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
