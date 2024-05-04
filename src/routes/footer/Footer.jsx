import { SlSocialInstagram } from 'react-icons/sl';
import { ImWhatsapp } from 'react-icons/im';
import { TfiEmail } from 'react-icons/tfi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { MdOutlinePlace } from 'react-icons/md';
import './footer.css';

export default function Footer() {
	return (
		<footer className="w-full bg-gray-200">
			<section className="w-full grid grid-cols-1 lg:grid-cols-3 px-6 lg:px-12 py-6 gap-3">
				<div className="">
					<h4 className="text-blue-500 text-xl font-semibold mb-6">
						Puntos de Contactos
					</h4>
					{/* <h5 className="linea">____________</h5> */}
					<ul className="flex flex-col gap-2">
						<li className="flex">
							<MdOutlinePlace
								className="text-blue-500"
								size={25}
							/>
							Río Branco, # 1389 Montevideo, Montevideo, Uruguay.
						</li>

						<li className="flex items-center gap-2">
							<BsTelephone className="text-blue-500" />
							+598 097328772
						</li>
					</ul>
				</div>
				<div className="">
					<h4 className="text-blue-500 text-xl font-semibold mb-6">
						Acerca de nosotros
					</h4>
					<p>
						Somos una academia de baile que se dedica a la enseñanza
						de bailes urbanos y latinos. Contamos con un equipo de
						profesionales que se dedican a la enseñanza de bailes
						urbanos y latinos.
					</p>
				</div>
			</section>
			<section className="w-full flex justify-center p-2 bg-blue-500">
				<p className="text-sm text-gray-50 font-light">
					Copyright 2024 - FUNK UP DANCE STUDIO - Todos los derechos
					reservados.
				</p>
			</section>
		</footer>
	);
}
