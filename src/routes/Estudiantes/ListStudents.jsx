import { useEffect, useRef } from 'react';
import openModal from '../../componets/modal/OpenModal';
import Pagination from '../../componets/services/Pagination';
import AccessProfil from '../../componets/services/AccessProfil';
import Buscador from '../../componets/Buscador';
import { useFetch } from '../../hooks/useFetch';
import Student from './Student';

import Swal from 'sweetalert2';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import { IoMdAdd } from 'react-icons/io';

export default function ListStudent({ title }) {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const url = `${hostServer}/api/v2/students`;
	const [selectedItems, setSelectedItems] = useState([]);
	const [page, setPage] = useState(1);
	AccessProfil();
	const [itemsPage, setItemsPage] = useState(8);
	let { data, isLoading, getData, deleteData } = useFetch(`${url}`);
	const filters = [
		{ id: 1, nombre: 'academia', descrip: 'Académia' },
		{ id: 2, nombre: 'nombre', descrip: 'Nombre' },
	];

	function handleAddstudents() {
		const modalNivel = 2;
		const tittle = 'Adición de Estudiantes';
		openModal(
			<Student Student={''} edit={false} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	function handleEdit(student) {
		const modalNivel = 2;
		const tittle = 'Edición de Estudiante';
		openModal(
			<Student student={student} edit={true} riviewList={updateList} />,
			null,
			'medio',
			tittle,
			modalNivel,
		);
	}

	const updateList = async () => {
		await getStudents();
	};

	const handleDel = async (id) => {
		const url = `${hostServer}/api/v2/student`;
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
					getStudents();
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

	const getStudents = async () => {
		const url = `${hostServer}/api/v2/Students`;
		const result = await getData(url);
	};

	useEffect(() => {
		if (data?.message || data?.message != undefined) {
			Swal.fire(data?.message);
		}
	}, [data]);

	useEffect(() => {
		getStudents();
	}, []);

	return (
		<div className="list-student-container w-full h-full">
			{isLoading ? (
				<h3 className="mt-5 text-center">Cargando...</h3>
			) : (
				selectedItems && (
					<>
						<div className="marco w-full h-full">
							<h1 className="my-3 text-2xl font-bold">
								Gestión de Alumnos
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
									onClick={handleAddstudents}
								>
									<IoMdAdd />
								</button>
							</div>
							<div className="table-responsive">
								<div className="table-container">
									<table className="table table-striped table-bordered">
										<thead>
											<tr className="table-dark">
												<th scope="col">#</th>
												<th scope="col">Academia</th>
												<th scope="col">Nombre</th>
												<th scope="col">Ent. Obl.</th>
												<th scope="col">Ent. Ex.</th>
												<th scope="col">
													Saldo Deudor
												</th>
												<th scope="col" colSpan={3}>
													Acción
												</th>
											</tr>
										</thead>
										<tbody>
											{data?.status === 500 ? (
												// <tbody>
												<tr>
													<td
														scope="col"
														colSpan={12}
													>
														<h3 className="textCenter">
															No hay información
															para esta Entidad.
														</h3>
													</td>
												</tr>
											) : (
												// </tbody>
												selectedItems.map((student) => (
													<tr key={student.id}>
														<td>{student.id}</td>
														<td>
															{student.academia}
														</td>
														<td>
															{student.nombre}
														</td>
														<td>{`${student.EntObligatorias}`}</td>
														<td>{`${student.EntExtras}`}</td>
														<td>
															{
																student.SaldoDeudor
															}
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
																		student,
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
																		student.id,
																	)
																}
															/>
														</td>
													</tr>
												))
											)}
										</tbody>
									</table>
								</div>
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
		</div>
	);
}
