import { useState, useEffect, useRef } from 'react';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationSchema';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { useAppContext } from '../../hooks/appContext';
import Swal from 'sweetalert2';

export default function Student({ student, edit, riviewList }) {
	const { HandleNivelClose } = useAppContext();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/student`;
	const [error, setError] = useState(false);
	const [histAsign, setHistAsign] = useState(false);
	const [isHistory, SetIshistory] = useState(false);
	const [tickets, setTickets] = useState([]);
	let ticketsStudent = [];
	const [arreglo, setArreglo] = useState([]);
	const [history, setHistory] = useState([]);
	let numOb = 0;
	let numEx = 0;
	const [academys, setAcademys] = useState([]);
	const [errorInput, setErrorInput] = useState({});
	const inputRef = useRef(null);
	const initialForm = {
		id: student ? student.id : '',
		dni: student ? student.dni : '',
		nombre: student ? student.nombre : '',
		email: student ? student.email : '',
		celular: student ? student.celular : '',
		adress: student ? student.adress : '',
		academia: student ? student.academia : '',
		ticketOb1: student ? student.ticketOb1 : '',
		ticketOb2: student ? student.ticketOb2 : '',
		ticketOb3: student ? student.ticketOb3 : '',
		ticketOb4: student ? student.ticketOb4 : '',
		ticketOb5: student ? student.ticketOb5 : '',
		ticketOb6: student ? student.ticketOb6 : '',

		ticketEx1: student ? student.ticketEx1 : '',
		ticketEx2: student ? student.ticketEx2 : '',
		ticketEx3: student ? student.ticketEx3 : '',
		ticketEx4: student ? student.ticketEx4 : '',
		ticketEx5: student ? student.ticketEx5 : '',
		ticketEx6: student ? student.ticketEx6 : '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	const {
		id,
		dni,
		nombre,
		email,
		adress,
		celular,
		academia,
		ticketOb1,
		ticketOb2,
		ticketOb3,
		ticketOb4,
		ticketOb5,
		ticketOb6,
		ticketEx1,
		ticketEx2,
		ticketEx3,
		ticketEx4,
		ticketEx5,
		ticketEx6,
	} = formData;

	let {
		data,
		isLoading,
		// getData,
		createData,
		updateData,
	} = useFetch(null);

	let { getData } = useFetch(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const numError = validateForm();
		if (!numError) {
			let url = `${api}`;
			if (!edit) {
				await createData(url, formData);
			} else {
				await updateData(url, student.id, formData);
			}
		} else {
			Swal.fire({
				position: 'top',
				icon: 'info',
				title: 'Debes corregir la información para poder registrarla',
				showConfirmButton: false,
				timer: 5000,
			});
		}
	};

	const getAcademys = async () => {
		const api = `${hostServer}/api/v2/academys`;
		const result = await getData(api);
		if (result) {
			setAcademys(result.data.data);
		}
	};

	const handleHistoria = () => {
		SetIshistory(!isHistory);
	};

	const getStudenHistory = async (dni) => {
		const url = `${hostServer}/api/v2/studentHistoy/${dni}`;
		const result = await getData(url);
		setHistory(result.data.data);
	};

	const getTickets = async () => {
		const api = `${hostServer}/api/v2/tickets`;
		const result = await getData(api);
		if (result) {
			setTickets(result.data.data);
		}
	};
	const validaTickets = (e) => {
		const { name, value } = e.target;
		if (!value) {
			return;
		}

		const seatchResul = searchTicket(value);
		if (!seatchResul) {
			Swal.fire({
				position: 'top',
				icon: 'info',
				title: 'El Número de Entrada no existe',
				showConfirmButton: false,
				timer: 3500,
			});
			let simulatedEvent = {
				target: { name: name, value: '' },
			};
			/* se simúla en input por panntala para llamar hook */
			onInputChange(simulatedEvent);
			inputRef.current.focus();
			return;
		}
		if (seatchResul && seatchResul.estatus != 'Generada') {
			Swal.fire({
				position: 'top',
				icon: 'info',
				title: `El Entrada ${seatchResul.estatus}, proceso no válido.`,
				showConfirmButton: false,
				timer: 3500,
			});
			let simulatedEvent = {
				target: { name: name, value: '' },
			};
			/* se simúla en input por panntala para llamar hook */
			onInputChange(simulatedEvent);
			inputRef.current.focus();
			return;
		}
		var primerosOchoSubstring = name.substring(0, 8);
		if ((primerosOchoSubstring = 'ticketob')) {
			numOb = numOb + 1;
		} else {
			numEx = numEx + 1;
		}
		// setArreglo((prevArreglo) => [...prevArreglo, value]);

		// console.log("ticketsStudent......:", arreglo.length);
		// const existe = arreglo.find((item) => item == value);
		// if (existe && arreglo.length > 1) {
		//   Swal.fire({
		//     position: "top",
		//     icon: "info",
		//     title: "La Entrada ya le fué asignada al alumno",
		//     showConfirmButton: false,
		//     timer: 3500,
		//   });
		//   let simulatedEvent = {
		//     target: { name: name, value: "" },
		//   };
		//   /* se simúla en input por panntala para llamar hook */
		//   onInputChange(simulatedEvent);
		//   inputRef.current.focus();
		//   return;
		// }
	};

	const searchTicket = (value) => {
		const ticket = tickets.find((ticket) => ticket.codigoEntrada == value);
		return ticket;
	};

	useEffect(() => {
		if (data?.message) {
			data?.message &&
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: data?.message,
					showConfirmButton: false,
					timer: 3500,
				});
		} else {
			if (data?.status === 200 || data?.status === 201) {
				data?.data.message &&
					Swal.fire({
						position: 'top',
						icon: 'success',
						title: data?.data?.message,
						showConfirmButton: false,
						timer: 3500,
					});
			} else {
				data?.data.message &&
					Swal.fire({
						position: 'top',
						icon: 'warning',
						title: data?.data?.message,
						showConfirmButton: false,
						timer: 3500,
					});
			}
			if (data?.status === 200) {
				HandleNivelClose();
				riviewList();
			}
			if (data?.status === 201) {
				clearForm();
				riviewList();
			}
		}
	}, [data]);

	useEffect(() => {
		setHistAsign(!histAsign);
	}, [isHistory]);

	useEffect(() => {
		getAcademys();
		getTickets();
		if (edit) {
			getStudenHistory(student.dni);
		}
	}, []);

	return (
		<>
			{
				//   !isLoading ? (
				//   <h3>Cargando...</h3>
				// ) :
				error ? (
					errorMessage()
				) : (
					<div className="container my-5 px-4">
						<form>
							<div className="row">
								<div className="form-group col-md-4">
									<label htmlFor="dni">
										Número de Documento
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Ingrese Número de DNI..."
										name="dni"
										value={dni}
										onChange={onInputChange}
									/>
									{errorsInput.dni && (
										<ValidateErrors
											errors={errorsInput.dni}
										/>
									)}
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group col-md-8">
									<label htmlFor="nombre">
										Nombre Completo{' '}
									</label>
									<input
										type="text"
										className="form-control"
										name="nombre"
										placeholder="Ingrese Nombre Completo..."
										value={nombre}
										onChange={onInputChange}
									/>
									{errorsInput.nombre && (
										<ValidateErrors
											errors={errorsInput.nombre}
										/>
									)}{' '}
								</div>
								<div className="form-group col-md-4">
									<label htmlFor="celular">
										Número de Celular{' '}
									</label>
									<input
										type="text"
										className="form-control"
										name="celular"
										placeholder="Ingrese Número Telefónico Celular..."
										value={celular}
										onChange={onInputChange}
									/>
									{errorsInput.celular && (
										<ValidateErrors
											errors={errorsInput.celular}
										/>
									)}{' '}
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group col-md-6">
									<label htmlFor="email">
										Correo Electrónico
									</label>
									<input
										type="email"
										className="form-control"
										name="email"
										placeholder="Ingrese el Correo Electónico.."
										value={email}
										onChange={onInputChange}
									/>
									{errorsInput.email && (
										<ValidateErrors
											errors={errorsInput.email}
										/>
									)}
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="academia">Académia</label>
									<select
										className="form-control"
										name="academia"
										value={academia}
										onChange={onInputChange}
									>
										<option>
											Seleccione una opción....
										</option>
										{/*Listado de academys*/}
										{academys.map((academy) => {
											return (
												<option
													key={academy.id}
													value={academy.nombre}
												>
													{academy.nombre}
												</option>
											);
										})}
									</select>
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group">
									<label htmlFor="adress">
										Dirección de Habitación
									</label>
									<input
										type="text"
										className="form-control"
										name="adress"
										value={adress}
										placeholder="Indique Dirección de Habitación..."
										onChange={onInputChange}
									/>
								</div>
							</div>
							{edit && (
								<>
									<div>
										<h4 className="mt-3">
											Asignación de Entradas
										</h4>
									</div>
									<h6 className="mt-3">Obligatórias</h6>
									<div className="row">
										<div className="form-group col-md-2">
											<label htmlFor="ticketOb1">1</label>
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketOb1"
												value={ticketOb1}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<label htmlFor="ticketOb2">2</label>
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketOb2"
												value={ticketOb2}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<label htmlFor="ticketO31">3</label>
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketOb3"
												value={ticketOb3}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<label htmlFor="ticketOb4">4</label>
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketOb4"
												value={ticketOb4}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<label htmlFor="ticketOb5">5</label>
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketOb5"
												value={ticketOb5}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<label htmlFor="ticketOb6">6</label>
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketOb6"
												value={ticketOb6}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
									</div>
									<h6 className="mt-3">Extras</h6>
									<div className="row">
										<div className="form-group col-md-2">
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketEx1"
												value={ticketEx1}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketEx2"
												value={ticketEx2}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketEx3"
												value={ticketEx3}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketEx4"
												value={ticketEx4}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketEx5"
												value={ticketEx5}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
										<div className="form-group col-md-2">
											<input
												type="text"
												ref={inputRef}
												className="form-control"
												name="ticketEx6"
												value={ticketEx6}
												onBlur={validaTickets}
												onChange={onInputChange}
											/>
										</div>
									</div>
								</>
							)}
							<div className="btn-submit mt-5">
								{edit ? (
									<button
										onClick={handleSubmit}
										className="btn btn-primary w-100"
									>
										Actualizar
									</button>
								) : (
									<button
										onClick={handleSubmit}
										type="submit"
										className="btn btn-primary w-100"
									>
										Agregar
									</button>
								)}
							</div>
						</form>
						<button
							type="botton"
							className="btn btn-primary mt-3"
							onClick={handleHistoria}
						>
							Ver Histórico
						</button>
					</div>
				)
			}
			{!histAsign && (
				<div className="container  px-3">
					<h4> Histórico de Asignaciones</h4>
					<div className="table-responsive">
						<table className="table table-striped table-bordered">
							<thead>
								<tr className="table-dark">
									<th scope="col">Entrada</th>
									<th scope="col">Evento</th>
									<th scope="col">Tipo</th>
									<th scope="col">Estátus</th>
									<th scope="col">Consto</th>
									<th scope="col">Abono</th>
								</tr>
							</thead>
							<tbody>
								{!history ? (
									<tr>
										<td scope="col" colSpan={12}>
											<h3 className="textCenter">
												No tiene Asignaciones.
											</h3>
										</td>
									</tr>
								) : (
									history.map((item) => (
										<tr key={item.id}>
											<td>{item.codigoEntrada}</td>
											<td>{item.evento}</td>
											<td>{item.tipoTicket}</td>
											<td>{item.statusProceso}</td>
											<td>{item.costo}</td>
											<td>{item.montoPagado}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
}
