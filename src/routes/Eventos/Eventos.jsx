import { useState, useEffect, useRef } from 'react';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationEventSchema';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { useAppContext } from '../../hooks/appContext';
import Swal from 'sweetalert2';

export default function Evento({ evento, edit, riviewList }) {
	const { HandleNivelClose } = useAppContext();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/event`;
	const [error, setError] = useState(false);
	const initialForm = {
		id: evento ? evento.id : '',
		codigo: evento ? evento.codigo : '',
		descripcion: evento ? evento.descripcion : '',
		ubicacion: evento ? evento.ubicacion : '',
		costo: evento ? evento.costo : '',
		fecha: evento ? evento.fecha : Date.now(),
		hora: evento ? evento.hora : '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	const { id, codigo, descripcion, ubicacion, fecha, costo, hora } = formData;

	let {
		data,
		isLoading = false,
		getData,
		createData,
		updateData,
	} = useFetch(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const numError = validateForm();
		if (!numError) {
			let hora = `${api}`;
			if (!edit) {
				await createData(api, formData);
			} else {
				await updateData(api, evento.id, formData);
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
								<div className="form-group col-md-4">
									<label htmlFor="codigo">
										Código del Evento
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Ingrese Número de codigo..."
										name="codigo"
										value={codigo}
										onChange={onInputChange}
									/>
									{errorsInput.codigo && (
										<ValidateErrors
											errors={errorsInput.codigo}
										/>
									)}
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group col-md-12">
									<label htmlFor="descripcion">
										Descripcion del Evento{' '}
									</label>
									<input
										type="text"
										className="form-control"
										name="descripcion"
										placeholder="Ingrese la Descripción..."
										value={descripcion}
										onChange={onInputChange}
									/>
									{errorsInput.descripcion && (
										<ValidateErrors
											errors={errorsInput.descripcion}
										/>
									)}{' '}
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group col-md-8">
									<label htmlFor="text">Ubicación</label>
									<input
										type="text"
										className="form-control"
										name="ubicacion"
										placeholder="Ingrese la Ubicación."
										value={ubicacion}
										onChange={onInputChange}
									/>
									{errorsInput.ubicacion && (
										<ValidateErrors
											errors={errorsInput.ubicacion}
										/>
									)}
								</div>
								<div className="form-group col-md-4">
									<label htmlFor="costo">
										Costo del Evento
									</label>
									<input
										type="text"
										className="form-control"
										name="costo"
										placeholder="Ingrese el Costo..."
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
							<div className="row mt-3">
								<div className="form-group col-md-6">
									<label htmlFor="fecha">
										Fecha del Evento
									</label>
									<input
										type="text"
										className="form-control"
										name="fecha"
										placeholder="Indique Dirección de Habitación..."
										value={fecha}
										onChange={onInputChange}
									/>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="hora">
										Hora del Evento
									</label>
									<input
										type="text"
										name="hora"
										className="form-control"
										placeholder="Ingrese Dirección Web..."
										value={hora}
										onChange={onInputChange}
									/>
								</div>
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
