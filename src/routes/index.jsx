import Home from '../routes/Hone/home';
import ReadScanner from './QR/ReadScanner';
import Contact from './Contacts/ListContacts';
import Students from './Estudiantes/ListStudents';
import Academys from './Academy/ListAcademys';
import Entradas from './Entradas/ListEntradas';
import ListEventos from './Eventos/ListEventos';
import Users from './User/ListUser';
import VentaEntrada from './Entradas/VentaEntrada';
import TicketsVendido from './Entradas/ListVentaEntradas';
import GetionAdmin from './Administrativo/ListGestionAdmin';
import VerifyEvent from './Administrativo/ListVerifyEvent';
import Cambio from '../routes/User/CambioClave';
import Login from '../routes/Login/Login';
import Logout from '../routes/User/Logout';
import PrivateRoute from './PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';
import FunkTickets from '../FunkTickets';

const routes = [
	{ 	
		path: '/',
		element: <FunkTickets />,
		children: [
			{ index: true, element: <Home title={'Home'} /> },
			{
				path: 'students',
				element: <Students title={'Gestión de Estudiantes'} />,
			},
			{
				path: 'academias',
				element: <Academys title={'Registro de Academias'} />,
			},
			{
				path: 'events',
				element: <PrivateRoute roles={['admin', 'staff']} />,
				children: [
					{ index: true, element: <ListEventos title={'Gestion de Eventos'} /> },
					{ 
						path: 'ventaTicket',
						element: <VentaEntrada title={'Venta de Entradas'} />
					},
				]
			},
			{
				path: 'tickets',
				element: <Entradas title={'Gestión de Entradas'} />,
			},
			{
				path: 'ticketsVendido',
				element: <TicketsVendido title={'Gestión de Entradas Vendidas'} />,
			},
			{
				path: 'users',
				element: <Users title={'Gestión de Usuários'} />,
			},
			{
				path: 'qrTicket',
				element: <PrivateRoute roles={['admin', 'staff']} />,
				// creo que el children está mal hecho
				children: [
					{ index: true, element: <ReadScanner title={'Escaneo de Entradas'} /> },
				]
			},
			{
				path: 'getionAdmin',
				element: <GetionAdmin title={'Escaneo de Entradas'} />,
			},
			{
				path: 'verifyEvent',
				element: <PrivateRoute roles={['admin', 'staff']} />,
				children: [
					{ index: true, element: <VerifyEvent title={'Escaneo de Entradas'} /> },
				]
			},
			{
				path: 'contact',
				element: <Contact title={'Contactos'} />,
			},
			{
				path: 'login',
				element: <Login title={'Login'} />,
			},
			{ path: 'cambioClave', element: <Cambio /> },
			{ path: 'logout', element: <Logout /> },
		]
	},
];

const router = createBrowserRouter(routes);

export default router;
