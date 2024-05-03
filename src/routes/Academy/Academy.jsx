import { useState, useEffect, useRef } from 'react';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationAcademySchema';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { useAppContext } from '../../hooks/appContext';
import Swal from 'sweetalert2';

export default function Academia({ academia, edit, riviewList }) {
	const { HandleNivelClose } = useAppContext();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/academy`;
	const [error, setError] = useState(false);
	const initialForm = {
		id: academia ? academia.id : '',
		codigo: academia ? academia.codigo : '',
		nombre: academia ? academia.nombre : '',
		email: academia ? academia.email : '',
		telefono: academia ? academia.telefono : '',
		adress: academia ? academia.adress : '',
		url: academia ? academia.url : '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	const { id, codigo, nombre, email, adress, telefono, url } = formData;

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
			let url = `${api}`;
			if (!edit) {
				await createData(url, formData);
			} else {
				await updateData(url, academia.id, formData);
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
										Código de la Académio
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
								<div className="form-group col-md-8">
									<label htmlFor="nombre">Nombre </label>
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
									<label htmlFor="telefono">
										Número de telefono{' '}
									</label>
									<input
										type="text"
										className="form-control"
										name="telefono"
										placeholder="Ingrese Número Telefónico telefono..."
										value={telefono}
										onChange={onInputChange}
									/>
									{errorsInput.telefono && (
										<ValidateErrors
											errors={errorsInput.telefono}
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
									<label htmlFor="url">Dirección Web</label>
									<input
										type="text"
										name="url"
										className="form-control"
										placeholder="Ingrese URL Web..."
										value={url}
										onChange={onInputChange}
									/>{' '}
									{errorsInput.url && (
										<ValidateErrors
											errors={errorsInput.url}
										/>
									)}
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group">
									<label htmlFor="adress">Dirección</label>
									<input
										type="text"
										className="form-control"
										name="adress"
										placeholder="Indique Dirección..."
										value={adress}
										onChange={onInputChange}
									/>{' '}
									{errorsInput.adress && (
										<ValidateErrors
											errors={errorsInput.adress}
										/>
									)}
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
