import { useState, useEffect, useRef } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { useAppContext } from '../../hooks/appContext';
import Swal from 'sweetalert2';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationUserSchema';
import { useNavigate } from 'react-router-dom';

export default function InitUser({ user }) {
	const { HandleNivelClose } = useAppContext();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/user`;
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const roles = [
		{id:1, role: 'admin', descrip:'administrador'},
		{id:2, role: 'staff', descrip: 'staff'},
	];

	const estatus = [
		{id:1, descrip: 'activo'},
		{id:2, descrip: 'inactivo'},
	];

	const initialForm = {
		id: user ? user.id : '',
		nombre: user ? user.nombre : '',
		email: user ? user.email : '',
		role: user ? user.role : '',
		status: user ? user.status : '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	const {
		id,
		nombre,
		email,
		status,
		role,
	} = formData;

	let { data, isLoading, getData, createData, updateData } = useFetch(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const numError = validateForm();
		if (!numError) {
			let url = `${api}`;
			await createData(url, formData);
			if (data?.status === 200) {
				clearForm();
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
				navigate('/');
			}
			if (data?.status === 201) {
				clearForm();
			}
		}
	}, [data]);

	return (
		<>
			{
				// isLoading ? (
				// <h3>Cargado..</h3>
				// ):
				error ? (
					errorMessage()
				) : (
					<div className="container p-5">
						<h1 className="my-3 text-2xl font-bold">
							Creación de Usuario Inicial
						</h1>

						<div className="tittle-search"></div>
						<form>
							<div className="row gap-3">
								<div className="form-group col-md-12">
									<label htmlFor="nombre">Nombre</label>
									<input
										type="text"
										className="form-control"
										name="nombre"
										placeholder="Ingrese Nombres"
										value={nombre}
										onChange={onInputChange}
									/>
								</div>
								<div className="form-group col-md-12">
									<label htmlFor="email">
										Correo electrónico
									</label>
									<input
										type="email"
										className="form-control"
										name="email"
										placeholder="Ingrese el Coreo Electónico"
										value={email}
										onChange={onInputChange}
									/>
									{errorsInput.email && (
										<ValidateErrors
											errors={errorsInput.email}
										/>
									)}
								</div>
								<div className="form-group col-md-12">
									<label htmlFor="role">Rol</label>
									<select
										className="form-control"
										name="role"
										value={role}
										onChange={onInputChange}
										required
									>
										<option>Seleccione el rol</option>
										{roles.map((item) => {
											return (
												<option
													key={item.id}
													value={item.role}
												>
													{item.descrip}
												</option>
											);
										})}
									</select>
								</div>					
								<div className="form-group col-md-12">
									<label htmlFor="status">
										Condición del usuario
									</label>
									<select
										name="status"
										className="form-control"
										value={status}
										onChange={onInputChange}
									>
										<option>Seleccione una opción</option>
										{estatus.map((item) => {
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
							</div>
							<div className="btn-submit mt-4">
								<button
									onClick={handleSubmit}
									type="submit"
									className="btn btn-primary w-100"
								>
									Agregar
								</button>
							</div>
						</form>
					</div>
				)
			}
		</>
	);
}
