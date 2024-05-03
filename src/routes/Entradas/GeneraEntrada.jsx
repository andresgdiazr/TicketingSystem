import { useState, useEffect, useRef } from 'react';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationSchema';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { useAppContext } from '../../hooks/appContext';
import AccessProfil from '../../componets/services/AccessProfil';
import Swal from 'sweetalert2';

export default function GeneraEntrada({ entrada, edit, riviewList }) {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/ticketGen`;
	const { HandleNivelClose } = useAppContext();
	const [academys, setAcademys] = useState([]);
	const [eventos, setEventos] = useState([]);
	const [error, setError] = useState(false);

	const tipoEntradas = [
		{ id: 1, descrip: 'General' },
		{ id: 2, descrip: '1era. Clase' },
		{ id: 3, descrip: '2da. Clase' },
	];
	const initialForm = {
		id: entrada ? entrada.id : '',
		academia: entrada ? entrada.academia : '',
		evento: entrada ? entrada.evento : '',
		// correlativo: entrada ? entrada.correlativo : "",
		inicial: entrada ? entrada.inicial : '',
		final: entrada ? entrada.final : '',
		tipoEntrada: entrada ? entrada.tipoEntrada : '',
		costo: entrada ? entrada.costo : '',
		urlEntrada: '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	let {
		id,
		academia,
		evento,
		// correlativo,
		inicial,
		final,
		costo,
		tipoEntrada,
		urlEntrada,
	} = formData;

	let {
		data,
		isLoading = false,
		// getData,
		createData,
		updateData,
	} = useFetch(null);

	let { getData } = useFetch(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let numError = validateForm();

		if (inicial > final || numError > 0) {
			{
				Swal.fire({
					position: 'top',
					icon: 'error',
					title: 'El número inicial no puede ser mayor al número final.',
					showConfirmButton: false,
					timer: 4000,
				});
			}
			numError = 1;
		}

		if (!numError) {
			if (!edit) {
				await createData(api, formData);
			} else {
				await updateData(api, entrada.id, formData);
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

	const getInitData = async () => {
		let url = `${hostServer}/api/v2/academys`;
		let result = await getData(url);
		if (result) {
			setAcademys(result.data.data);
		}
		url = `${hostServer}/api/v2/events`;
		result = await getData(url);
		if (result) {
			setEventos(result.data.data);
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
					<div className="container my-5 px-5">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="form-group col-md-12">
									<label htmlFor="academia">Académia</label>
									<select
										className="form-control"
										name="academia"
										value={academia}
										onChange={onInputChange}
									>
										<option>
											Seleccione la Academia...
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
								<div className="form-group col-md-12">
									<label htmlFor="evento">Evento</label>
									<select
										className="form-control"
										name="evento"
										value={evento}
										onChange={onInputChange}
									>
										<option>Seleccione el Evento...</option>
										{eventos.map((evento) => {
											return (
												<option
													key={evento.id}
													value={evento.descripcion}
												>
													{evento.descripcion}
												</option>
											);
										})}
									</select>
								</div>
							</div>

							<div className="row mt-3">
								{/* <div className="form-group col-md-2">
                  <label htmlFor="correlativo">Prefíjo </label>
                  <input
                    type="text"
                    className="form-control"
                    // placeholder="Ingrese el prefíjo de la secuencia..."
                    name="correlativo"
                    value={correlativo}
                    onChange={onInputChange}
                  />
                  {errorsInput.correlativo && (
                    <ValidateErrors errors={errorsInput.correlativo} />
                  )}
                </div> */}

								<div className="form-group col-md-6">
									<label htmlFor="inicial">
										Número Inicial{' '}
									</label>
									<input
										type="text"
										className="form-control"
										name="inicial"
										// placeholder="Ingrese el primer número de la secuencia..."
										value={inicial}
										onChange={onInputChange}
									/>
									{errorsInput.inicial && (
										<ValidateErrors
											errors={errorsInput.inicial}
										/>
									)}{' '}
								</div>

								<div className="form-group col-md-6">
									<label htmlFor="text">Número Final</label>
									<input
										type="text"
										className="form-control"
										name="final"
										// placeholder="Ingrese el ultimo número de la secuencia..."
										value={final}
										onChange={onInputChange}
									/>
									{errorsInput.final && (
										<ValidateErrors
											errors={errorsInput.final}
										/>
									)}
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group col-md-6">
									<label htmlFor="tipoEntrada">
										Tipo de Entrada
									</label>
									<select
										className="form-control"
										name="tipoEntrada"
										value={tipoEntrada}
										onChange={onInputChange}
									>
										<option>
											Seleccione el tipo de entrada...
										</option>
										{tipoEntradas.map((item) => {
											return (
												<option
													key={item.id}
													value={item.descrip}
												>
													{item.descrip}
												</option>
											);
										})}
									</select>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="costo">Costo </label>
									<input
										type="text"
										className="form-control"
										name="costo"
										// placeholder="Ingrese el Costo..."
										value={costo}
										onChange={onInputChange}
									/>
									{errorsInput.costo && (
										<ValidateErrors
											errors={errorsInput.costo}
										/>
									)}{' '}
								</div>
							</div>
							<div className="btn-submit mt-5">
								{edit ? (
									<button
										type="submit"
										className="btn btn-primary w-100"
									>
										Actualizar
									</button>
								) : (
									<button
										type="submit"
										className="btn btn-primary w-100"
									>
										Generar Entrada
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
