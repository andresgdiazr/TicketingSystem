import { useEffect, useRef } from 'react';
import openModal from '../../componets/modal/OpenModal';
import AccessProfil from '../../componets/services/AccessProfil';
import Pagination from '../../componets/services/Pagination';
import Buscador from '../../componets/Buscador';
import { useFetch } from '../../hooks/useFetch';
import Academy from './Academy';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';

export default function ListAcademia({ title }) {
	AccessProfil();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const url = `${hostServer}/api/v2/academys`;
	const ref = useRef(null);
	const [selectedItems, setSelectedItems] = useState([]);
	const [page, setPage] = useState(1);
	const [itemsPage, setItemsPage] = useState(8);
	let { data, isLoading, getData, deleteData } = useFetch(`${url}`);
	const filters = [
		{ id: 1, nombre: 'nombre', descrip: 'Nombre' },
		{ id: 2, nombre: 'telefono', descrip: 'Teléfono' },
		{ id: 3, nombre: 'email', descrip: 'Email' },
		{ id: 4, nombre: 'adress', descrip: 'Dirección' },
	];

	function handleAddAcademias() {
		const modalNivel = 2;
		const tittle = 'Adición de Academias';
		openModal(
			<Academy Academy={''} edit={false} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	function handleEdit(academia) {
		const modalNivel = 2;
		const tittle = 'Edición de Academias';
		openModal(
			<Academy academia={academia} edit={true} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	const updateList = async () => {
		await getAcademias();
	};

	const handleDel = async (id) => {
		const url = `${hostServer}/api/v2/academy`;
		const delId = id;
		Swal.fire({
			title: 'Está Seguro?',
			text: 'Desea eliminar este regístro?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sí, Eliminar!',
		}).then((result) => {
			if (result.isConfirmed) {
				const borrar = async () => {
					const resp = await deleteData(url, delId);
					getAcademias();
					await Swal.fire({
						title: 'Eliminádo!',
						text: 'El Estudiante fué eliminádo.',
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

	const getAcademias = async () => {
		const url = `${hostServer}/api/v2/academys`;
		const result = await getData(url);
	};

	useEffect(() => {
		if (data?.message || data?.message != undefined) {
			Swal.fire(data?.message);
		}
	}, [data]);

	useEffect(() => {
		getAcademias();
	}, []);

	return (
		<>
			{isLoading ? (
				<h3 className="mt-5 text-center">Cargando...</h3>
			) : (
				selectedItems && (
					<>
						<div className="marco h-full w-full">
							<h1 className="my-3 text-2xl font-bold">
								Gestión de Academias
							</h1>
							<div className="tittle-search">
								<div className="search">
									<Buscador
										filters={filters}
										registros={data?.data?.data}
										onPageChange={handlePageChange}
									/>
								</div>
								<button
									className="addBtn"
									onClick={handleAddAcademias}
								>
									<IoMdAdd />
								</button>
							</div>
							<div className="table-responsive">
								<table className="table table-striped table-bordered">
									<thead>
										<tr className="table-dark">
											<th scope="col">#</th>
											<th scope="col">Nombre</th>
											<th scope="col">Teléfono</th>
											<th scope="col">
												Correo Electrónico
											</th>
											<th scope="col">Dirección</th>
											<th scope="col">Url</th>
											<th scope="col" colSpan={3}>
												Acción
											</th>
										</tr>
									</thead>
									<tbody>
										{data?.status === 500 ? (
											<tr>
												<td scope="col" colSpan={12}>
													<h3 className="textCenter">
														No hay información para
														esta Entidad.
													</h3>
												</td>
											</tr>
										) : (
											selectedItems.map((academia) => {
												return (
													<tr key={academia.id}>
														<td>{academia.id}</td>
														<td>
															{academia.nombre}
														</td>
														<td>
															{academia.telefono}
														</td>
														<td>
															{academia.email}{' '}
														</td>
														<td>
															{academia.adress}{' '}
														</td>
														<td>{academia.url}</td>
														<td>
															<TbEdit
																className=".btnShow"
																style={{
																	fontSize:
																		'25px',
																}}
																onClick={() =>
																	handleEdit(
																		academia,
																	)
																}
															/>
														</td>
														<td>
															<FaTrashAlt
																style={{
																	fontSize:
																		'25px',
																}}
																onClick={() =>
																	handleDel(
																		academia.id,
																	)
																}
															/>
														</td>
													</tr>
												);
											})
										)}
									</tbody>
								</table>{' '}
							</div>

							{data?.data?.data && (
								<Pagination
									items={data?.data?.data}
									page={page}
									pagItems={itemsPage}
									nextPage={nextPage}
									onPageChange={handlePageChange}
								/>
							)}
						</div>
					</>
				)
			)}
		</>
	);
}
