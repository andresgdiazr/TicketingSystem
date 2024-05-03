import { useEffect, useRef } from 'react';
import openModal from '../../componets/modal/OpenModal';
import Pagination from '../../componets/services/Pagination';
import AccessProfil from '../../componets/services/AccessProfil';
import Buscador from '../../componets/Buscador';
import { useFetch } from '../../hooks/useFetch';
import VentaEntrada from './GestionVentaEntrada';
import { useUsersContext } from '../../hooks/UsersContext';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';

export default function ListEntrada({ title }) {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const url = `${hostServer}/api/v2/ticketVentas`;
	const ref = useRef(null);
	const [selectedItems, setSelectedItems] = useState([]);
	const [page, setPage] = useState(1);
	const [itemsPage, setItemsPage] = useState(8);
	AccessProfil();
	let { data, isLoading, getData, deleteData } = useFetch(`${url}`);
	const filters = [
		{ id: 1, nombre: 'entrada', descrip: 'Entrada' },
		{ id: 2, nombre: 'responsable', descrip: 'Responsable de Venta' },
	];

	function handleAddEntradas() {
		const modalNivel = 2;
		const tittle = '';
		openModal(
			<VentaEntrada Entrada={''} edit={false} riviewList={updateList} />,
			null,
			'small',
			tittle,
			modalNivel,
		);
	}

	function handleEdit(entrada) {
		const modalNivel = 2;
		const tittle = '';
		openModal(
			<VentaEntrada
				entrada={entrada}
				edit={true}
				riviewList={updateList}
			/>,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	const updateList = async () => {
		await getEntradas();
	};

	const handleDel = async (id) => {
		const url = `${hostServer}/api/v2/ticketVenta`;
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
					getEntradas();
					await Swal.fire({
						title: 'Eliminádo!',
						text: 'La venta fué elimináda.',
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

	const getEntradas = async () => {
		const url = `${hostServer}/api/v2/ticketVentas`;
		const result = await getData(url);
	};

	useEffect(() => {
		if (data?.message || data?.message != undefined) {
			Swal.fire(data?.message);
		}
	}, [data]);

	useEffect(() => {
		getEntradas();
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
								Gestión de Entradas Vendídas
							</h1>
							<div className="tittle-search">
								<div className="search">
									<Buscador
										filters={filters}
										registros={data?.data?.data}
										onPageChange={handlePageChange}
									/>
								</div>
							</div>
							<div className="table-responsive">
								<table className="table table-striped table-bordered">
									<thead>
										<tr className="table-dark">
											<th scope="col">#</th>
											<th scope="col">
												Número de la Entrada
											</th>
											<th scope="col">
												Responsable de Venta
											</th>
											<th scope="col">Comprador</th>
											<th scope="col">Costo</th>
											<th scope="col">Método de Pago</th>
											<th scope="col">Monto Pagado</th>
											<th scope="col" colSpan={2}>
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
											selectedItems.map((entrada) => {
												return (
													<tr key={entrada.id}>
														<td>{entrada.id}</td>
														<td>
															{
																entrada.codigoEntrada
															}
														</td>
														<td>
															{
																entrada.responsable
															}
														</td>
														<td>
															{
																entrada.nombreComprador
															}
														</td>
														<td>{entrada.costo}</td>
														<td>
															{entrada.metodoPago}{' '}
														</td>
														<td>
															{entrada.montoPago}{' '}
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
																		entrada,
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
																		entrada.id,
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
