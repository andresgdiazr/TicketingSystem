import { useState, useEffect, useRef } from 'react';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationVentaSchema';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import AccessProfil from '../../componets/services/AccessProfil';

export default function VentaEntrada({ entrada, edit, riviewList }) {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/ticket`;
	const [error, setError] = useState(false);
	const [eventos, setEventos] = useState([]);
	const [responsables, setResponsables] = useState([]);
	const inputRef = useRef(null);

	AccessProfil('isSaler'); // roles

	const metodoPagos = [
		{ id: 1, descrip: 'Efectivo' },
		{ id: 2, descrip: 'Transferencia' },
		{ id: 3, descrip: 'Deposito' },
		{ id: 4, descrip: 'Débito' },
		{ id: 5, descrip: 'Crédito' },
	];

	const initialForm = {
		codigoEntrada: entrada ? entrada.codigoEntrada : '', // TODO va?
		evento: entrada ? entrada.evento : '',
		emailComprador: entrada ? entrada.emailComprador : '',
		comprador: entrada ? entrada.comprador: '',
		metodoPago: entrada ? entrada.metodoPago : '',
		responsable: entrada ? entrada.responsable : '',
		cantidad: entrada ? entrada.cantidad: '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	let {
		codigoEntrada,
		evento,
		emailComprador,
		metodoPago,
		responsable,
		cantidad,
		comprador,
	} = formData;

	let {
		data,
		isLoading = false,
		createData,
		updateData,
		envioCorreo,
		updateDatas,
	} = useFetch(null);

	let { getData } = useFetch(null);

	console.log(formData);

	const handleSubmit = async (e) => {
	
		e.preventDefault();
		let errorBlur = null;

	/*	if (codigoEntrada) {
			errorBlur = await handleBlur();
		} else {
			clearForm();
		}
		let numError = validateForm();
		if (errorBlur) {
			if (e.detail === 0) {
				return;
			}
			else {
				if (!numError) {*/
					const api2 = `${hostServer}/api/v2/VenderTickets`;
					
					const result = await updateDatas(api2, formData);
			/*	} else {
					Swal.fire({
						position: 'top',
						icon: 'info',
						title: 'Debes ingresar los campos requeridos para realizar la venta.. ',
						showConfirmButton: false,
						timer: 5000,
					});
				}
			}
		}*/
	};

	const getInitData = async () => {
		let url = `${hostServer}/api/v2/events`;
		let result = await getData(url);
		if (result) {
			setEventos(result.data.data);
		}

		url = `${hostServer}/api/v2/students`;
		result = await getData(url);
		if (result) {
			setResponsables(result.data.data);
		}
	};

	const handleBlur = async () => {
		let api = `${hostServer}/api/v2/ticketCodigo`;
		let url = `${api}/${codigoEntrada}`;
		let result = await getData(url);
		if (result?.status === 200) {
			const { evento, costo, responsable, estatus, urlAcademia } =
				result.data.data;
			let simulatedEvent = {};
			if (estatus == 'Vendida') {
				{
					Swal.fire({
						position: 'top',
						icon: 'info',
						title: 'La Entrada ya fué vendida, venta no autorizáda.',
						showConfirmButton: false,
						timer: 4000,
					});
				}
				clearForm();
				inputRef.current.focus();
			} else {
				if (estatus !== 'Asignada') {
					{
						Swal.fire({
							position: 'top',
							icon: 'info',
							title: 'La Entrada no a sído asignada, venta no autorizáda.',
							showConfirmButton: false,
							timer: 4000,
						});
					}
					clearForm();
					inputRef.current.focus();
					return 0;
				} else {
					formData.evento = evento;
					formData.costo = costo;
					formData.responsable = responsable;
					formData.urlAcademia = urlAcademia;
					simulatedEvent = {
						target: { name: 'evento', value: evento },
					};
					onInputChange(simulatedEvent);
				}
				return 1;
			}
		} else {
			result?.data.message &&
				Swal.fire({
					position: 'top',
					icon: 'warning',
					title: result?.data?.message,
					showConfirmButton: false,
					timer: 3500,
				});
			clearForm();
			inputRef.current.focus();
		}
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
				clearForm();
			}
		}
	}, [data]);

	useEffect(() => {
		getInitData();
	}, []);

	return (
		<>
			{
				// isLoading ? (
				// <h3>Cargando...</h3>
				// ) :
				error ? (
					errorMessage()
				) : (
					<div className="h-full w-full p-4">
						<h1 className="my-3 text-2xl font-bold">
							Venta de Entradas
						</h1>
						<form>
							<div className="row mt-8">
								<div className="form-group col-md-6">
									<label htmlFor="evento">Evento</label>
									<select
										className="form-control"
										name="evento"
										value={evento}
										onChange={onInputChange}
									>
										<option>
											Seleccione el evento
										</option>
										{eventos.map((ev) => {
											return (
												<option
													key={ev.id}
													value={ev.descripcion}
												>
													{ev.descripcion}
												</option>
											);
										})}
									</select>{' '}
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="text">
										Responsable de Venta
									</label>
									<select
										className="form-control"
										name="responsable"
										value={responsable}
										onChange={onInputChange}
									>
										<option>Seleccione el estudiante</option>
										{responsables.map((res) => {
											return (
												<option
													key={res.id}
													value={res.nombre}
												>
													{res.nombre}
												</option>
											);
										})}
									</select>
									{errorsInput.responsable && (
										<ValidateErrors
											errors={errorsInput.responsable}
										/>
									)}
								</div>
							</div>
								
							<div className="row mt-3">
								<div className="form-group col-md-6">
									<label htmlFor="emailComprador">
										Correo Electrónico del Comprador
									</label>
									<input
										className="form-control"
										name="emailComprador"
										placeholder="Ingrese el correo electrónico del comprador"
										value={emailComprador}
										onChange={onInputChange}
									/>
									{errorsInput.emailComprador && (
										<ValidateErrors
											errors={errorsInput.emailComprador}
										/>
									)}
								</div>
								
								<div className="form-group col-md-6">
									<label htmlFor="comprador">
										Nombre del comprador
									</label>
									<input
										type="email"
										className="form-control"
										name="comprador"
										placeholder="Ingrese el nombre del comprador"
										value={comprador}
										onChange={onInputChange}
									/>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="cantidad">
										Cantidad de Entradas
									</label>
									<input
										type="number"
										className="form-control"
										name="cantidad"
										placeholder="Ingrese la cantidad de las entradas"
										value={cantidad}
										onChange={onInputChange}
									/>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="metodoPago">
										Método de Pago
									</label>
									<select
										className="form-control"
										name="metodoPago"
										value={metodoPago}
										onChange={onInputChange}
									>
										<option>
											Seleccione el método de pago
										</option>
										{metodoPagos.map((metodo) => {
											return (
												<option
													key={metodo.id}
													value={metodo.descrip}
												>
													{metodo.descrip}
												</option>
											);
										})}
									</select>{' '}
									
								</div>
							</div>
							<div className="btn-submit mt-4">
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
					</div>
				)
			}
		</>
	);
}
