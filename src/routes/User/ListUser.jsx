import { useState, useEffect, useRef } from 'react';
import openModal from '../../componets/modal/OpenModal';
import Buscador from '../../componets/Buscador';
import Pagination from '../../componets/services/Pagination';
import { useFetch } from '../../hooks/useFetch';
import User from './User';

import Swal from 'sweetalert2';
import { TbEdit } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';

export default function ListUser() {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/users`;
	const ref = useRef(null);
	const [selectedItems, setSelectedItems] = useState([]);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(1);
	const [itemsPage, setItemsPage] = useState(8);
	let { data, isLoading, getData, deleteData } = useFetch();

	const filters = [
		{ id: 1, nombre: 'nombre', descrip: 'Nombre' },
		{ id: 2, nombre: 'email', descrip: 'Email' },
	];

	function handleAddUsers() {
		const modalNivel = 2;
		const tittle = 'Adición de Usuario';
		openModal(
			<User user={''} edit={false} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	function handleEdit(user) {
		const modalNivel = 2;
		const tittle = 'Edición de Usuarios';
		openModal(
			<User user={user} edit={true} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	const updateList = async () => {
		await getUsers();
	};

	const handleDel = async (id) => {
		const url = `${hostServer}/api/v2/user`;
		const delId = id;
		Swal.fire({
			title: 'ELIMINAR USUARIO',
			text: '¿Desea eliminar este registro?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '¡Sí, eliminar!',
		}).then((result) => {
			if (result.isConfirmed) {
				const borrar = async () => {
					const resp = await deleteData(url, delId);
					getUsers();
					await Swal.fire({
						title: '¡Eliminado!',
						text: 'El usuario fue eliminado.',
						icon: 'success',
					});
				};
				borrar();
			}
		});
	};

	const nextPage = (pagItems, pageCurrent) => {
		setItemsPage(pagItems);
		setPage(pageCurrent);
	};

	const handlePageChange = (newSelectedItems) => {
		setSelectedItems(newSelectedItems);
	};

	const getUsers = async () => {
		const url = `${hostServer}/api/v2/users`;
		const result = await getData(url);
	};

	useEffect(() => {
		if (data?.message || data?.message != undefined) {
			Swal.fire(data?.message);
			updateList();
		}
	}, [data]);

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<>
			{isLoading ? (
				<h3 className="mt-5 text-center">Cargando...</h3>
			) : (
				// ) : error ? (
				//   <h3>Error de comunicación con el Servidor...</h3>
				selectedItems && (
					<div className="marco w-full h-full">
						<h1 className="my-3 text-2xl font-bold">
							Gestión de Usuarios
						</h1>
						<div className="tittle-search">
							<div className="search">
								<Buscador
									filters={filters}
									registros={data?.data?.data}
									onPageChange={handlePageChange}
								/>
							</div>
							<button className="addBtn" onClick={handleAddUsers}>
								<IoMdAdd />
							</button>
						</div>
						<div className="table-responsive">
							<table className="table table-striped table-bordered">
								<thead>
									<tr className="table-dark">
										<th scope="col">#</th>
										<th scope="col">Nombre</th>
										<th scope="col">Correo Electrónico</th>
										<th scope="col">Role</th>
										<th scope="col">Status</th>
										<th scope="col" colSpan={3}>
											Acción
										</th>
									</tr>
								</thead>
								{data?.status === 500 ? (
									<tbody>
										<tr>
											<td scope="col" colSpan={7}>
												<h3 className="textCenter">
													No hay información para esta
													Entidad.
												</h3>
											</td>
										</tr>
									</tbody>
								) : (
									<tbody>
										{selectedItems.map((user) => {
											return (
												<tr key={user.id}>
													<td>{user.id}</td>
													<td>{user.nombre}</td>
													<td>{user.email}</td>
													<td>{user.role}</td>
													<td>{user.status}</td>
													<td>
														<TbEdit
															className=".btnShow"
															style={{
																fontSize:
																	'25px',
															}}
															onClick={() =>
																handleEdit(user)
															}
														/>
													</td>
												</tr>
											);
										})}
									</tbody>
								)}
							</table>
						</div>

						{data?.data?.data && (
							<Pagination
								items={data.data.data}
								page={page}
								pagItems={itemsPage}
								nextPage={nextPage}
								onPageChange={handlePageChange}
							/>
						)}
					</div>
				)
			)}
		</>
	);
}
