import Contact from '../Contacts/Contact';
import BannerSlider from '../../componets/banner/BannerSlider';
import imagen1 from '../../assets/imagen01.jpg';
import imagen4 from '../../assets/imagen04.jpg';

const Home = () => {
	const images = [imagen1];
	return (
		<div className="p-3 w-full home">
			<BannerSlider images={images} />
			<h2 className="my-3">Sistema de boletería</h2>
			<hr />
			<br />
			<p>
				En el sistema de boletería de Funk Up Dance Studio, puede registrar las ventas de boletos.
			</p>

			<div className="contenedor-padre">
				<div className="contenido-izquierdo rounded overflow-hidden p-0">
					<img src={imagen4} alt="Imagen" className="imagen" />
				</div>
				<div className="contenido-derecho pl-6">
					<p className="parrafo">
						Antes de vender entradas para eventos, los organizadores
						de eventos deben crear un plan de evento. Este
						plan debe definir el público objetivo, establecer un
						precio de entrada que refleje el valor del evento,
						identificar los canales de distribución de entradas más
						eficaces y abarcar una estrategia de marketing para
						generar interés e impulsar las ventas.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
