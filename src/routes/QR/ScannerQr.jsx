import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useFetch } from '../../hooks/useFetch';
import AccessProfil from '../../componets/services/AccessProfil';

function ScannerQr() {
	// AccessProfil("isVerify");
	const [scanResult, setScanResult] = useState(null);
	const [isScanning, setIsScanning] = useState(true); // Estado para controlar si se está escaneando o no
	const [isVerify, setIsVerify] = useState(0);
	const [saldo, setSaldo] = useState(0);
	const [item, setItem] = useState([]);
	let { data, getData } = useFetch(null);

	const handleNewScan = () => {
		setSaldo(0);
		setIsVerify(0);
		setScanResult(null); // Limpiar el resultado anterior
		setIsScanning(true); // Habilitar el escaneo nuevamente
	};

	useEffect(() => {
		if (isScanning) {
			// Verificar si se debe iniciar el escaneo
			const scanner = new Html5QrcodeScanner('reader', {
				fps: 10,
				qrbox: { width: 350, height: 350 },
				disableFlip: true,
				rememberLastUsedCamera: false,
			});
			// luberdino1.0@gmail.com
			const handleSuccess = async (result) => {
				scanner.clear();
				await getData(`${result}`);
				setScanResult(result);
				setIsScanning(false); // Detener el escaneo después de un resultado exitoso
			};

			const handleError = (err) => {
				console.warn(err);
			};
			scanner.render(handleSuccess, handleError);
		}
	}, [isScanning]);

	useEffect(() => {
		if (data) {
			if (data.status == 200) {
				if (data.data) {
					setItem(data?.data.data);
					let saldo =
						parseInt(data?.data.data.costo) -
						parseInt(data.data.data.montoPagado);
					setSaldo(saldo);
					if (saldo == 0) {
						setIsVerify(1);
					}
					if (saldo > 0) {
						setIsVerify(2);
					}
				}
			} else {
				setIsVerify(3);
			}
		}
	}, [data]);

	return (
		<div className="conteiner scannerqr mx-5 px-5">
			<h1>Verificación de Entradas </h1>
			{scanResult ? (
				<>
					{isVerify === 3 && (
						<div>
							<h5>No podemos verificay el QR presentado.</h5>
						</div>
					)}
					{isVerify === 1 && (
						<div>
							<h5>
								Hemos realizado la vefificación de la Entrada{' '}
								{item.codigoEntrada} perteneciente a{' '}
								{item.comprador} la cual se encuentra
								<span> Solvente</span>
								...
							</h5>
						</div>
					)}
					{isVerify === 2 && (
						<div>
							<h5>
								Hemos realizado la vefificación de la Entrada{' '}
								{item.codigoEntrada} perteneciente a{' '}
								{item.comprador} la cual se encuentra
								<span>No Solvente</span>
								...
							</h5>
							<h5>
								A la fecha presenta una deuda de {saldo} sobre
								el costo de la entrada de {item.costo}.
							</h5>
						</div>
					)}

					<div>
						<button
							onClick={handleNewScan}
							className="btn btn-primary mt-4"
						>
							Nuevo Escaner
						</button>
					</div>
				</>
			) : (
				<div id="reader"></div>
			)}
		</div>
	);
}

export default ScannerQr;
