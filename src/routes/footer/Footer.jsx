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
							Calle Nuevo Mundo, # 12321, sector Las Flores,
							Montevideo, Uruguay.
						</li>

						<li className="flex items-center gap-2">
							<BsTelephone className="text-blue-500" />
							+598 543234543
						</li>
						<li className="flex items-center gap-2">
							<MdOutlineMarkEmailRead className="text-blue-500" />
							info@academy.com
						</li>
					</ul>
				</div>
				<div className="">
					<h4 className="text-blue-500 text-xl font-semibold mb-6">
						Acerca de nosotros
					</h4>
					<p>
						Estamos aquí para la comunidad. La misión es hacer que
						la educación de calidad sea asequible y accesible para
						todos en esta región. Es por eso que IT Academy ofrece
						una variedad de programas de TI a costos razonables para
						los estudiantes.
					</p>
				</div>
				<div className="">
					<h4 className="text-blue-500 text-xl font-semibold mb-6">
						Redes Sociales
					</h4>
					<ul className="w-full flex-col gap-2">
						<li className="flex gap-2 items-center">
							<ImWhatsapp className="text-blue-500" />
							WhatSapp
						</li>
						<li className="flex gap-2 items-center">
							<SlSocialInstagram className="text-blue-500" />
							Instagram
						</li>
						<li className="flex gap-2 items-center">
							<TfiEmail className="text-blue-500" />
							Correo Electrónico
						</li>
					</ul>
				</div>
			</section>
			<section className="w-full flex justify-center p-2 bg-blue-500">
				<p className="text-sm text-gray-50 font-light">
					Copyright 2024 - LIPSTICK DANCE CREW - Todos los derechos
					reservados.
				</p>
			</section>
		</footer>
	);
}
