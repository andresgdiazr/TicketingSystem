import ScannerQr from './ScannerQr';

import './scanner.css';
function ReadScanner() {
	return (
		<div className="p-5 w-full h-full flex flex-col items-center justify-start">
			<h1 className="my-3 text-2xl font-bold w-full m-0">Verificación de Entradas </h1>
			<ScannerQr />
		</div>
	);
}

export default ReadScanner;
