import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../menu/menu.css'; // Archivo CSS donde definiremos los estilos
import { FaHome, FaKey, FaList, FaQrcode  } from 'react-icons/fa';
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
	const menuItems = [
		{
			title: 'Home',
			route: '/',
			subItems: [],
			icon: <FaHome />,
		},
		{ title: 'Iniciar sesión', route: '/login', subItems: [], icon: <FaKey /> },
		{
			title: 'Eventos',
			subItems: [
				{ title: 'Eventos', route: '/events' },
				{ title: 'Ventas', route: '/events/ventaTicket' }
			],
			icon: <FaTicket />
		},

		{ title: 'Scaner', route: '/qrTicket', subItems: [], icon: <FaQrcode/> },
		{ title: 'Reportes', subItems: [
			{ title: 'Verificación de evento', route: '/verifyEvent' },
			{ title: 'Entradas', route: '/tickets' },
			{ title: 'Ticket Vendídos', route: '/ticketsVendido' },
		], icon: <FaList/> },
		{ title: 'Salir', route: '/logout', subItems: [], icon: <FaKey /> },

/* 		{
			title: 'Administración',
			subItems: [
				{ title: 'Academias', route: '/academias' },
				{ title: 'Estudiante', route: '/students' },
				
				{ title: 'Entradas', route: '/tickets' },
				{ title: 'Ticket Vendídos', route: '/ticketsVendido' },
				{ title: 'Usuarios', route: '/users' },
				{ title: 'Contactos', route: '/contact' },
			],
			icon: <FaGear />,
		}, */
		/* {
			title: 'Listados',
			subItems: [
				{ title: 'Gestión Administratíva', route: '/getionAdmin' },
				{ title: 'Verificación de Evento', route: '/verifyEvent' },
			],
			icon: <FaList />,
		}, */
		/* {
			title: 'Accesos',
			subItems: [
				{ title: 'Cambio de Clave', route: '/cambioClave' },
				{ title: 'Inicio de Sesión', route: '/login' },
				{ title: 'Salír', route: '/salir', icon: <FaKey /> },
			],
			icon: <FaKey />,
		}, */
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
