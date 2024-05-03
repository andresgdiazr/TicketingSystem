import ScannerQr from './ScannerQr';

import './scanner.css';
function ReadScanner() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<ScannerQr />
		</div>
	);
}

export default ReadScanner;
