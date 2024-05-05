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
			// TODO esto de verdad llega de nuestro back?

			const handleSuccess = async (result) => {
				scanner.clear();
				console.log("Escaneo de QR: ", result);
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
		if (data && data.status == 200) {
			if (data.data) {
				setItem(data.data.data);
				console.log(data.data.data.estatus);
				if (data.data.data.estatus == 'Vendido') {
					setIsVerify(1);
				}
				else if (data.data.data.estatus == 'Generado') {
					setIsVerify(2);
				}
				else {
					setIsVerify(3);
				}
			}
			else {
				// la data no corresponde
				setIsVerify(3);
			}
		} else {
			setIsVerify(3);
		}
	}, [data]);

	return (
		<div className="conteiner scannerqr mx-5 px-5">
			<h1>Verificación de Entradas </h1>
			{scanResult ? (
				<>
					{isVerify === 3 && (
						<div>
							<h5>No podemos verificar el código QR presentado.</h5>
						</div>
					)}
					{isVerify === 1 && (
						<div>
							<h5>
								Hemos realizado la verificación de la entrada{' '}
								perteneciente a{' '}
								{item.comprador}
								para el evento {item.evento}.
							</h5>
						</div>
					)}
					{isVerify === 2 && (
						<div>
							<h5>
								El ticket se encuentra en el sistema pero nunca se vendió.
							</h5>
						</div>
					)}

					<div>
						<button
							onClick={handleNewScan}
							className="btn btn-primary mt-4"
						>
							Nuevo escaner
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
