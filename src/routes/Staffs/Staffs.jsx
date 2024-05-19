import { useState, useEffect, useRef } from 'react';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationEventSchema';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { useAppContext } from '../../hooks/appContext';
import Swal from 'sweetalert2';

export default function Staffs({ staffEvento, edit, riviewList }) {
	const { HandleNivelClose } = useAppContext();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/history/:event/:id`;
	const urlUsers = `${hostServer}/api/v2/users/`;
	const urlEvents = `${hostServer}/api/v2/events/`;
	const [eventos, setEventos] = useState([]);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(false);
	const initialForm = {
		id: staffEvento ? staffEvento.id : '',
		eventId: staffEvento ? staffEvento.data.evento.id : '',
		UserCodigo: staffEvento ? staffEvento.data.user.id : '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	const {id, eventCodigo, UserId} = formData;

	let {
		data,
		isLoading = false,
		getData,
		createData,
		updateData,
	} = useFetch(null);

	const getInitData = async () => {
		const resultEvents = await getData(urlEvents);
		if (resultEvents) {
			setEventos(resultEvents.data.data);
		}

		const resultUsers = await getData(urlUsers);
		if (resultUsers) {
			setUsers(resultUsers.data.data);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const numError = validateForm();

		// TODO validar que funcione
		if (!numError) {
			if (!edit) {
				console.log('formData', formData);
				const staffEvento = await createData(api, formData);
				if (staffEvento) {
					clearForm();
				}
			} else {
				await updateData(api, staffEvento.id, formData); // TODO probar
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

	useEffect(() => {
/* 		if (data?.message) {
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
		} */
	}, [data]);

	useEffect(() => {
		getInitData();
	}, []);

	return (
		<>
			{
				isLoading ? (
					<h3>Cargando...</h3>
				) :
				error ? (
					errorMessage()
				) : (
					<div className="container my-5 px-5">
						<form onSubmit={handleSubmit}>
							<div className="row mt-3">
								<div className="col-md-6">
									<label htmlFor="eventCodigo">Evento</label>
									<select
										className="form-control"
										name="eventCodigo"
										value={eventCodigo}
										onChange={onInputChange}
									>
										<option>
											Seleccione el evento
										</option>
										{eventos.map((ev) => {
											return (
												<option
													key={ev.id}
													value={ev.codigo}
												>
													{ev.descripcion}
												</option>
											);
										})}
									</select>{' '}
								</div>
							</div>
							<div className="col-md-6">
								<label htmlFor="UserId">Usuario</label>
								<select
									className="form-control"
									name="UserId"
									value={UserId}
									onChange={onInputChange}
								>
									<option>
										Seleccione el usuario
									</option>
									{users.map((ev) => {
										return (
											<option
												key={ev.id}
												value={ev.id}
											>
												{ev.email}
											</option>
										);
									})}
								</select>{' '}
							</div>
							<div className="btn-submit mt-4">
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
