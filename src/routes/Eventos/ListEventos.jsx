import { useState, useEffect, useRef } from 'react';
import openModal from '../../componets/modal/OpenModal';
import Pagination from '../../componets/services/Pagination';
import AccessProfil from '../../componets/services/AccessProfil';
import Buscador from '../../componets/Buscador';
import { useFetch } from '../../hooks/useFetch';
import Eventos from './Eventos';

import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';

export default function ListEvento({ title }) {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const url = `${hostServer}/api/v2/events`;
	const [selectedItems, setSelectedItems] = useState([]);
	const [page, setPage] = useState(1);
	const [itemsPage, setItemsPage] = useState(8);
	const [error, setError] = useState(false);
	
	AccessProfil(); // Acceso por rol

	let { data, isLoading, getData, deleteData } = useFetch(`${url}`);
	const filters = [
		{ id: 1, nombre: 'evento', descrip: 'Evento' },
		{ id: 2, nombre: 'ubicacion', descrip: 'Ubicación' },
		// fecha?
	];

	function handleAddEventos() {
		const modalNivel = 2;
		const tittle = 'Creación de Evento';
		openModal(
			<Eventos Evento={''} edit={false} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	function handleEdit(evento) {
		const modalNivel = 2;
		const tittle = 'Edición de Eventos';
		openModal(
			<Eventos evento={evento} edit={true} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	const updateList = async () => {
		if(!error){
			await getEventos();
		}
	};

	const handleDel = async (id) => {
		const url = `${hostServer}/api/v2/event`;
		const delId = id;
		Swal.fire({
			title: '¿Está Seguro?',
			text: '¿Desea eliminar este regístro?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				const borrar = async () => {
					const resp = await deleteData(url, delId);
					getEventos();
					await Swal.fire({
						title: 'Evento eliminado',
						text: 'El Eventos fue eliminado.',
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

	const getEventos = async () => {
		const url = `${hostServer}/api/v2/events`;
		const result = await getData(url);
		if(result === null){
			setError(true);
		}
	};

	useEffect(() => {
		if (data?.message || data?.message != undefined) {
			Swal.fire(data?.message);
		}
	}, [data]);

	useEffect(() => {
		if(!error){
			getEventos();
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<h3 className="mt-5 text-center">Cargando...</h3>
			) : (
				selectedItems && (
					<>
						<div className="marco w-full h-full px-5">
							<h1 className="my-3 text-2xl font-bold text-gray-800">
								Gestión de Eventos
							</h1>
							<div className="tittle-search">
								<div className="search">
									<Buscador
										filters={filters}
										registros={data?.data?.data}
										onPageChange={handlePageChange}
									/>
								</div>
								{
									!error ? <button
									className="addBtn font-medium"
									onClick={handleAddEventos}
								>
									Agregar
									<IoMdAdd />
								</button> : null
								}
							</div>
							<div className="table-responsive">
								<table className="table table-striped table-bordered">
									<thead>
										<tr className="table-dark">
											<th scope="col">#</th>
											<th scope="col">Eventos</th>
											<th scope="col">ubicacion</th>
											<th scope="col">Costo</th>
											<th scope="col">Fecha</th>
											<th scope="col">Hora</th>
{/* 											<th scope="col" colSpan={3}>
												Acción
											</th> */}
										</tr>
									</thead>
									<tbody>
										{data?.status === 500 | data?.status === 403 ? (
											<tr>
												<td scope="col" colSpan={12}>
													<h3 className="textCenter">
													{!error ? "No hay información para esta Entidad" : "Usuario no tiene permiso"}
													</h3>
												</td>
											</tr>
										) : (
											selectedItems.map((evento) => {
												return (
													<tr key={evento.id}>
														<td>{evento.id}</td>
														<td>
															{evento.descripcion}
														</td>
														<td>
															{evento.ubicacion}
														</td>
														<td>{evento.costo}</td>
														<td>{evento.fecha} </td>
														<td>{evento.hora} </td>
{/* 														<td>
															<TbEdit
																className=".btnShow"
																style={{
																	fontSize:
																		'25px',
																}}
																onClick={() =>
																	handleEdit(
																		evento,
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
																		evento.id,
																	)
																}
															/>
														</td> */}
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
