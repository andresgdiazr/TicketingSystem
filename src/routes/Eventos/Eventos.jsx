import { useState, useEffect, useRef } from 'react';
import ValidateErrors from '../../componets/services/ValidateErrors';
import validationSchema from '../../componets/services/validationEventSchema';
import { useFetch } from '../../hooks/useFetch';
import { useForm } from '../../hooks/useForm';
import { useAppContext } from '../../hooks/appContext';
import Swal from 'sweetalert2';
import Papa from 'papaparse';


export default function Evento({ evento, edit, riviewList }) {
	const { HandleNivelClose } = useAppContext();
	const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
	const api = `${hostServer}/api/v2/event`;
	const apiStudent = `${hostServer}/api/v2/student`;
	const [parsedData, setParsedData] = useState([]);
	const [error, setError] = useState(false);
	const initialForm = {
		id: evento ? evento.id : '',
		descripcion: evento ? evento.descripcion : '',
		academia: evento ? evento.academia : '',
		ubicacion: evento ? evento.ubicacion : '',
		costo: evento ? evento.costo : '',
		fecha: evento ? evento.fecha : Date.now(),
		extra: evento ? evento.extra : '0',
		hora: evento ? evento.hora : '',
	};

	const { formData, onInputChange, validateForm, errorsInput, clearForm } =
		useForm(initialForm, validationSchema);

	const {descripcion, academia, ubicacion, fecha, costo, extra, hora } = formData;

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
				await createData(api, formData); // registrar evento

				// registrar estudiantes
				const formData2 = new FormData();
				// hacer un map de data.data para obtener los nombres de estudiantes

				console.log("probando data: ");
				console.log(parsedData);
				// TODO revisar el await aqui, es mas probable que ni siquiera se haga esto de registrar estudiantes aqui
				parsedData.map(async (estudiante) => {
					console.log(estudiante.nombre + " " + estudiante.apellido);
					formData2.nombre = estudiante.nombre;
					formData2.apellido = estudiante.apellido;
					await createData(apiStudent, formData2);
				});
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

   const changeFileHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);
      },
    });
  };


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
							<div className="row mt-3">
								<div className="form-group col-md-6">
									<label htmlFor="descripcion">
										Nombre del Evento{' '}
									</label>
									<input
										type="text"
										className="form-control"
										name="descripcion"
										placeholder="Ingrese el nombre del evento"
										value={descripcion}
										onChange={onInputChange}
									/>
									{errorsInput.descripcion && (
										<ValidateErrors
											errors={errorsInput.descripcion}
										/>
									)}{' '}
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="academia">
										Nombre de la Academia{' '}
									</label>
									<input
										type="text"
										className="form-control"
										name="academia"
										placeholder="Ingrese el nombre de la academia"
										value={academia}
										onChange={onInputChange}
									/>
									{errorsInput.academia && (
										<ValidateErrors
											errors={errorsInput.academia}
										/>
									)}{' '}
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group col-md-12">
									<label htmlFor="text">Ubicación</label>
									<input
										type="text"
										className="form-control"
										name="ubicacion"
										placeholder="Ingrese la ubicación del evento"
										value={ubicacion}
										onChange={onInputChange}
									/>
									{errorsInput.ubicacion && (
										<ValidateErrors
											errors={errorsInput.ubicacion}
										/>
									)}
								</div>
							</div>
							<div className="row mt-3">
								<div className="form-group col-md-6">
									<label htmlFor="costo">
										Costo de las Entradas
									</label>
									<input
										type="number"
										className="form-control"
										name="costo"
										placeholder="Ingrese el costo de las entradas"
										value={costo}
										onChange={onInputChange}
									/>
									{errorsInput.costo && (
										<ValidateErrors
											errors={errorsInput.costo}
										/>
									)}{' '}
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="extra">
										Entradas Extra
									</label>
									<input
										type="number"
										className="form-control"
										name="extra"
										placeholder="Ingrese el número de entradas extra"
										value={extra}
										onChange={onInputChange}
									/>
									{errorsInput.extra && (
										<ValidateErrors
											errors={errorsInput.extra}
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
										type="date"
										className="form-control"
										name="fecha"
										min={new Date().toISOString().split('T')[0]}
										placeholder="Indique Dirección de Habitación..."
										value={fecha}
										onChange={onInputChange}
										required
									/>
								</div>
								<div className="form-group col-md-6">
									<label htmlFor="hora">
										Hora del Evento
									</label>
									<input
										type="time"
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
						<div className="row mt-3"> {/* TODO esto quizas se manda y no deberia, esta dentro del form y tiene un input pues */}
							<input
								type="file"
								name="file"
								accept=".csv"
								onChange={changeFileHandler}
								style={{ display: "block", margin: "10px auto" }}
							/>
						</div>
					</div>
				)
			}
		</>
	);
}
