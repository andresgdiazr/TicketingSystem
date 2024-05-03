import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function CambioClave() {
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const url = `${hostServer}/api/v2/user/cambio`;
	const [email, setEmail] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [visible, setVisible] = useState(false);

	const passwordChangeHandler = async (e) => {
		e.preventDefault();

		try {
			const options = {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					oldPassword,
					newPassword,
					confirmPassword,
				}),
			};
			const response = await fetch(url, options);
			const data = await response.json();
			if (parseInt(data?.status) === 200) {
				Swal.fire({
					position: 'top',
					icon: 'success',
					title: data?.message,
					showConfirmButton: false,
					timer: 3500,
				});
				setEmail[''];
				setOldPassword('');
				setNewPassword('');
				setConfirmPassword('');
			}
			if (parseInt(data?.status) == 400) {
				Swal.fire({
					position: 'top',
					icon: 'error',
					title: data?.message,
					showConfirmButton: false,
					timer: 3500,
				});
			}
		} catch (error) {
			Swal.fire({
				position: 'top',
				icon: 'error',
				title: error.message,
				showConfirmButton: false,
				timer: 3500,
			});
		}
	};
	return (
		<div className="container mt-4 w-full h-full">
			<div className="row justify-content-center">
				<div className="col-lg-6">
					<h2 className="text-center mb-4 text-2xl font-bold">
						Cambio de Contraseña
					</h2>
					<div className="py-4 px-5 card shadow w-100">
						<div className="card-body">
							<form
								aria-required
								onSubmit={passwordChangeHandler}
								className="flex flex-col items-center"
							>
								<div className="mb-2">
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
										required
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className="form-control"
									/>
								</div>

								<div className="mb-2">
									<label
										htmlFor="oldPassword"
										className="form-label"
									>
										Contraseña Actual
									</label>
									<div className="input-group">
										<input
											type={visible ? 'text' : 'password'}
											name="oldPassword"
											autoComplete="current-password"
											value={oldPassword}
											onChange={(e) =>
												setOldPassword(e.target.value)
											}
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
								</div>
								<div className="mb-2">
									<label
										htmlFor="newPassword"
										className="form-label"
									>
										Nueva Contraseña
									</label>
									<div className="input-group">
										<input
											type={visible ? 'text' : 'password'}
											className="form-control"
											name="newPassword"
											required
											autoComplete="on"
											value={newPassword}
											onChange={(e) =>
												setNewPassword(e.target.value)
											}
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
								</div>
								<div className="mb-2">
									<label
										htmlFor="confirmPassword"
										className="form-label"
									>
										Confirme la Nueva Contraseña
									</label>
									<div className="input-group">
										<input
											type={visible ? 'text' : 'password'}
											className="form-control"
											required
											autoComplete="on"
											name="confirmPassword"
											value={confirmPassword}
											onChange={(e) =>
												setConfirmPassword(
													e.target.value,
												)
											}
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
									<input
										className="btn btn-primary w-100 mt-4"
										required
										value="Guardar"
										type="submit"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CambioClave;
