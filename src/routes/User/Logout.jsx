import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from '../../hooks/UsersContext';

import Swal from 'sweetalert2';

import { useFetch } from '../../hooks/useFetch';

function Logout() {
	const navigate = useNavigate();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const url = `${hostServer}/api/user/logout`;
	const { setUsersContext } = useUsersContext();

	let { data, isLoading = false, getData } = useFetch(null);

	const salir = async () => {
		console.log(url);
		const result = await getData(url);
		console.log(result);
		if (result?.status === 200) {
			Swal.fire({
				position: 'top',
				icon: 'success',
				title: data?.data.message,
				showConfirmButton: false,
				timer: 3500,
			});
			setUsersContext([]);
			navigate('/login');
			window.location.reload(true);
		} else {
			Swal.fire({
				position: 'top',
				icon: 'info',
				title: 'Debes corregir la información para loguearse',
				showConfirmButton: false,
				timer: 5000,
			});
		}
	};

	useEffect(() => {
		salir();
	}, []);
	return <div className="h-full" />;
}

export default Logout;
