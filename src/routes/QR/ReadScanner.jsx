import ScannerQr from './ScannerQr';

import './scanner.css';
function ReadScanner() {
	return (
		<div className="p-4 px-5 w-full h-full">
			<h1 className="my-3 text-2xl font-bold text-gray-800">Verificación de Entradas </h1>
			<hr className="mb-4 text-blue-500"/>
			<div className='w-full flex justify-center'>
				<ScannerQr />
			</div>
			
		</div>
	);
}

export default ReadScanner;
