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
	const apiEvent = `${hostServer}/api/v2/event`;
	const apiStudent = `${hostServer}/api/v2/student`;
	const apiTickets = `${hostServer}/api/v2/ticketGen`;
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


		if (!numError && !isValidCSV ) {
			let hora = `${apiEvent}`;
			if (!edit) {
				const evento = await createData(apiEvent, formData); // registrar evento
				
				// registrar estudiantes
				const formData2 = new FormData();
				
				// TODO revisar el await aqui, es mas probable que ni siquiera se haga esto de registrar estudiantes aqui sino más bien en el back, le pasamos parsedData y que evento llame a registrar estudiantes y a registrar tickets por batch

				parsedData.map(async (estudiante) => {
					formData2.nombre = estudiante.nombre + " " + estudiante.apellido;
					await createData(apiStudent, formData2);
				});

				// registrar tickets

				const formData3 = { 
					nombreEvento: formData.descripcion,
					obligatoria: parsedData.length * 3,
					extra: formData.extra,
					id: evento.data.data,
				};

				

				await createData(apiTickets, formData3); // registrar tickets
			} else {
				await updateData(apiEvent, evento.id, formData);
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

	const [file, setFile] = useState(null);
	const [isValidCSV, setIsValidCSV] = useState(false);

   const changeFileHandler = (event) => {

	const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setIsValidCSV(!(selectedFile && selectedFile.name.endsWith('.csv')));

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

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
										<p className="pt-1 block text-red-500 text-xs">
										Nombre del evento requerido
									   </p>
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
										<p className="pt-1 block text-red-500 text-xs">
											Nombre de la academia requerido
									   	</p>
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
										<p className="pt-1 block text-red-500 text-xs">
											La ubicacion del evento es requerida
									   	</p>
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
										<p className="pt-1 block text-red-500 text-xs">
											El costo de entradas es requerido
									   	</p>
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
										<p className="pt-1 block text-red-500 text-xs">
											Cantidad extra requerida
									   	</p>
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
									{errorsInput.fecha && (
										<p className="pt-1 block text-red-500 text-xs">
											Fecha del evento requerida
									   	</p>
									)}{' '}
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
									{errorsInput.fecha && (
										<p className="pt-1 block text-red-500 text-xs">
											Hora del evento requerida
									   	</p>
									)}{' '}
								</div>
								<div className='col-md-6 mt-3'>
									<label htmlFor="file">
										Seleccione un archivos CSV
									</label>
									<div className="grid w-full items-center gap-1.5"> {/* TODO esto quizas se manda y no deberia, esta dentro del form y tiene un input pues */}
										<input
											className=' file:cursor-pointer file:p-2 flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-700 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium'
											type="file"
											name="file"
											accept=".csv"
											onChange={changeFileHandler}
											// style={{ display: "block", margin: "10px auto" }}
										/>
										{isValidCSV ? (
											<div>
												<p>El archivo seleccionado no es un CSV válido.</p>
											</div>
										) : (
										<div>
											<p></p>
											</div>
										)}
									</div>									
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
