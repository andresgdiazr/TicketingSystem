import { useState, useEffect, useRef } from 'react';
import openModal from '../../componets/modal/OpenModal';
import Pagination from '../../componets/services/Pagination';
import Buscador from '../../componets/Buscador';
import { useFetch } from '../../hooks/useFetch';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';

import Staffs from './Staffs';

export default function ListEvento({ title }) {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const urlHistory = `${hostServer}/api/v2/history/`;
	const [selectedItems, setSelectedItems] = useState([]);
	const [page, setPage] = useState(1);
	const [itemsPage, setItemsPage] = useState(8);
	const [error, setError] = useState(false);
	
	let { data, isLoading, getData } = useFetch(`${urlHistory}`);
	// TODO arreglar filtros
	const filters = [
		{ id: 1, nombre: 'descripcion', descrip: 'Evento' },
		{ id: 2, nombre: 'email', descrip: 'Email' },
	];

	function handleAddEventStaff() {
		const modalNivel = 2;
		const tittle = 'Asignar staff a evento';
		openModal(
			<Staffs staffEvent={''} edit={false} riviewList={updateList} />,
			null,
			'small',
			tittle,
			modalNivel,
		);
	}

	function handleEdit(evento) {
		const modalNivel = 2;
		const tittle = 'Edición de relación de staff y evento';
		openModal(
			<Staffs staffEvent={staffEvento} edit={true} riviewList={updateList} />,
			null,
			'small',
			tittle,
			modalNivel,
		);
	}

	const updateList = async () => {
		if(!error){
			await getStaffEventos();
		}
	};

	const nextPage = (pagItems, pageCurrent) => {
		setItemsPage(pagItems);
		setPage(pageCurrent);
	};

	const handlePageChange = (newSelectedItems) => {
		setSelectedItems(newSelectedItems);
	};

	const getStaffEventos = async () => {
		const url = `${hostServer}/api/v2/histories`; // TODO cambiar url
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
			getStaffEventos();
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<h3 className="mt-5 text-center">Cargando...</h3>
			) : (
				selectedItems && (
					<>
						<div className="marco w-full h-full">
							<h1 className="my-3 text-2xl font-bold">
								Gestión de staffs por evento
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
									className="addBtn"
									onClick={handleAddEventStaff}
								>
									<IoMdAdd />
								</button> : null
								}
							</div>
							<div className="table-responsive">
								<table className="table table-striped table-bordered">
									<thead>
										<tr className="table-dark">
											<th scope="col">Nombre staff</th>
											<th scope="col">Email</th>
											<th scope="col">Evento</th>
											<th scope="col">academia</th>
											<th scope="col" colSpan={3}>
												Acción
											</th>
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
											selectedItems.map((staffEvent) => {
												return (
													<tr key={staffEvent.id}>
														<td>
															{staffEvent.User.nombre}
														</td>
														<td>
															{staffEvent.User.email}
														</td>
														<td>
															{staffEvent.event.descripcion}
														</td>
														<td>
															{staffEvent.event.academia}
														</td>
														<td>
															<TbEdit
																className=".btnShow"
																style={{
																	fontSize:
																		'25px',
																}}
																onClick={() =>
																	handleEdit(
																		eventStaff
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
