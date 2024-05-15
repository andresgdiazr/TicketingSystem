import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import validationSchema from '../../componets/services/validationUserSchema';
import ValidateErrors from '../../componets/services/ValidateErrors';
import { useUsersContext } from '../../hooks/UsersContext';

import Swal from 'sweetalert2';

import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';

const Login = () => {
	const navigate = useNavigate();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/user/login`;
	const { setUsersContext } = useUsersContext();

	const [visible, setVisible] = useState(false);

	const initialForm = {
		email: '',
		password: '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	const { id, email, password } = formData;

	let { data, isLoading = false, getData, createData } = useFetch(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const numError = validateForm();
		if (!numError) {
			let url = `${api}`;
			await createData(url, formData);
		} else {
			Swal.fire({
				position: 'top',
				icon: 'info',
				title: 'Debes corregir la información para loguearse',
				showConfirmButton: false,
				timer: 5000,
			});
		}
	};

	useEffect(() => {
		if (data?.data.message) {
			data?.data.message &&
				Swal.fire({
					position: 'top',
					icon: 'error',
					title: data?.data.message,
					showConfirmButton: false,
					timer: 3500,
				});
		} else {
			console.log(data);
			if (data?.status === 200) {
				setUsersContext(data.data.data);
				navigate('/');
			}
			if (data?.status === 400) {
				clearForm();
			}
		}
	}, [data]);

	return (
		<div className="container my-5 h-full">
			<div className="row justify-content-center">
				<div className="col-lg-6">
					<h2 className="text-center mb-4 text-2xl font-bold">
						Iniciar sesión
					</h2>
					<div className="p-5 card shadow w-100">
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label
										htmlFor="email"
										className="form-label"
									>
										Dirección de correo electrónico
									</label>
									<input
										type="email"
										name="email"
										autoComplete="email"
										// required
										value={email}
										onChange={onInputChange}
										className="form-control"
									/>
									{errorsInput.email && (
										<ValidateErrors
											errors={errorsInput.email}
										/>
									)}
								</div>
								<div className="mb-3">
									<label
										htmlFor="password"
										className="form-label"
									>
										Indique su Contraseña
									</label>
									<div className="input-group">
										<input
											type={visible ? 'text' : 'password'}
											name="password"
											autoComplete="current-password"
											// required
											value={password}
											onChange={onInputChange}
											className="form-control"
										/>
										<button
											type="button"
											className="btn btn-outline-secondary"
											onClick={() => setVisible(!visible)}
										>
											{visible ? (
												<AiOutlineEye size={20} />
											) : (
												<AiOutlineEyeInvisible
													size={20}
												/>
											)}
										</button>
									</div>
									{errorsInput.password && (
										<ValidateErrors
											errors={errorsInput.password}
										/>
									)}
								</div>
								{/* <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="form-check-input"
                  />
                  <label htmlFor="remember-me" className="form-check-label">
                    Recordarme
                  </label>
                </div> */}
								<div className="mb-5">
									<button
										type="submit"
										className="btn btn-primary w-100"
									>
										Enviar
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
