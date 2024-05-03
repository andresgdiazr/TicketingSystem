import { useEffect, useRef } from 'react';
import openModal from '../../componets/modal/OpenModal';
import Pagination from '../../componets/services/Pagination';
import Buscador from '../../componets/Buscador';
import Contact from './Contact';

import Swal from 'sweetalert2';
import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { FaTrashAlt } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa';
import AccessProfil from '../../componets/services/AccessProfil';
import { useUsersContext } from '../../hooks/UsersContext';
export default function ListContacts({ title, accion }) {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const url = `${hostServer}/api/v2/contacts`;
	const [selectedItems, setSelectedItems] = useState([]);
	const [page, setPage] = useState(1);
	const [itemsPage, setItemsPage] = useState(8);
	AccessProfil();
	let { data, isLoading, getData, deleteData } = useFetch(`${url}`);
	const bgChange = true;
	const modalNivel = 2;
	const filters = [
		{ id: 1, nombre: 'email', descrip: 'Emáil' },
		{ id: 2, nombre: 'nombre', descrip: 'Nombre' },
	];
	function handleAddContacts() {
		const tittle = 'Adición de Contactos';
		openModal(
			<Contact contact={''} edit={false} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
			bgChange,
		);
	}

	function handleEdit(contact) {
		const tittle = 'Edición de Contactos';
		openModal(
			<Contact contact={contact} edit={true} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
			// bgChange
		);
	}

	// function handleVer (contact) {
	//   const tittle = "Consulta de Contacts";
	//   openModal(
	//     <VerContact contact={contact} />,
	//     null,
	//     "medio",
	//     tittle,
	//     modalNivel,
	//     bgChange
	//   );
	// }

	const updateList = async () => {
		console.log('pase por aqui');
		await getContacts();
	};

	const handleDel = async (id) => {
		const url = `${hostServer}/api/v2/contact`;
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
					getContacts();
					await Swal.fire({
						title: 'Eliminádo!',
						text: 'El Contact fué eliminádo.',
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

	const getContacts = async () => {
		const url = `${hostServer}/api/v2/contacts`;
		const result = await getData(url);
	};

	useEffect(() => {
		if (data?.message || data?.message != undefined) {
			Swal.fire(data?.message);
		}
	}, [data]);

	useEffect(() => {
		getContacts();
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
								Contactos
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
									onClick={handleAddContacts}
								>
									<IoMdAdd />
								</button>
							</div>
							<div className="table-responsive">
								<table className="table table-striped table-bordered">
									<thead>
										<tr className="table-dark">
											<th scope="col">#</th>
											<th scope="col">
												Correo Electrónico
											</th>
											<th scope="col">Nombre</th>
											<th scope="col" colSpan={2}>
												Acción
											</th>
										</tr>
									</thead>
									<tbody>
										{data?.status === 500 ? (
											<tr>
												<td scope="col" colSpan={7}>
													<h3 className="textCenter">
														No hay información para
														esta Entidad.
													</h3>
												</td>
											</tr>
										) : (
											selectedItems.map((contact) => {
												if (accion !== 'ver') {
													return (
														<tr key={contact.id}>
															<td>
																{contact.id}
															</td>
															<td>
																{contact.email}
															</td>
															<td>
																{`${contact.nombre}`}{' '}
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
																			contact,
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
																			contact.id,
																		)
																	}
																/>
															</td>
														</tr>
													);
												} else {
													return (
														<tr key={contact.id}>
															<td>
																{contact.id}
															</td>
															<td>
																{contact.email}
															</td>
															<td>
																{`${contact.nombre}`}{' '}
															</td>
															<td>
																<FaRegEye
																	className=".btnShow"
																	style={{
																		fontSize:
																			'25px',
																	}}
																	onClick={() =>
																		handleVer(
																			contact,
																		)
																	}
																/>
															</td>
														</tr>
													);
												}
											})
										)}
									</tbody>
								</table>{' '}
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
					</>
				)
			)}
		</>
	);
}
