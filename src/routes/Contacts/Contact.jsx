import { useState, useEffect, useRef } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { useAppContext } from '../../hooks/appContext';
import Swal from 'sweetalert2';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationSchema';
import AccessProfil from '../../componets/services/AccessProfil';

export default function Contact({ contact, edit, riviewList }) {
	const { HandleNivelClose } = useAppContext();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/contact`;
	const [error, setError] = useState(false);
	const initialForm = {
		id: contact ? contact.id : '',
		nombre: contact ? contact.nombre : '',
		email: contact ? contact.email : '',
		comentario: contact ? contact.comentario : '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	const { id, nombre, email, comentario } = formData;

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
				await updateData(url, contact.id, formData);
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
			data?.data.message &&
				Swal.fire({
					position: 'top',
					icon: 'success',
					title: data?.data?.message,
					showConfirmButton: false,
					timer: 3500,
				});
			if (data?.status === 200) {
				HandleNivelClose();
			}
			if (data?.status === 201) {
				clearForm();
			}
		}
	}, [data]);

	return (
		<>
			{error ? (
				errorMessage()
			) : (
				<>
					<div className=" py-2 px-2">
						<form className="">
							<div className="row  mt-4">
								<div className="col-md-6 col-12">
									<div className="form-group">
										<label htmlFor="nombre">
											Nombre Completo{' '}
										</label>
										<input
											type="text"
											className="form-control"
											name="nombre"
											placeholder="Ingrese Nombres Completo"
											disabled={edit ? true : false}
											value={nombre}
											onChange={onInputChange}
										/>
										{errorsInput.nombre && (
											<ValidateErrors
												errors={errorsInput.nombre}
											/>
										)}
									</div>
								</div>
								<div className="col-md-6 col-12">
									<div className="form-group">
										<label htmlFor="email">
											Correo Electrónico
										</label>
										<input
											type="email"
											className="form-control"
											name="email"
											placeholder="Ingrese el Coreo Electónico"
											value={email}
											disabled={edit ? true : false}
											onChange={onInputChange}
										/>
										{errorsInput.email && (
											<ValidateErrors
												errors={errorsInput.email}
											/>
										)}
									</div>
								</div>
							</div>

							<div className="row mt-3">
								<div className="col-md-12 col-12">
									<div className="form-group">
										<label htmlFor="comentario">
											Dejanos tu Comentários
										</label>
										<textarea
											className="form-control"
											rows={5}
											name="comentario"
											placeholder="Escriba su mensaje"
											value={comentario}
											disabled={edit ? true : false}
											onChange={onInputChange}
										/>
									</div>
								</div>
							</div>

							<div className="row mt-3">
								<div className="col-md-12">
									<div className="btn-submit">
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
								</div>
							</div>
						</form>
					</div>
				</>
			)}
		</>
	);
}
