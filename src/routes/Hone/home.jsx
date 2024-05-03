import Contact from '../Contacts/Contact';
import BannerSlider from '../../componets/banner/BannerSlider';
import imagen1 from '../../assets/imagen01.jpg';
import imagen2 from '../../assets/imagen02.jpg';
import imagen3 from '../../assets/imagen03.jpg';
import imagen4 from '../../assets/imagen04.jpg';

const Home = () => {
	const images = [imagen1, imagen2, imagen3];
	return (
		<div className="p-3 w-full home">
			<BannerSlider images={images} />
			<h2 className="my-3">Venta de Entradas On-Líne</h2>
			<hr />
			<br />
			<p>
				Atrás quedaron los días de vender entradas manualmente o enviar
				tarjetas de confirmación de asistencia. Hoy en día, la mayoría
				del público está acostumbrado y prefiere comprar entradas
				online. Una plataforma de venta de entradas digitales le ayudará
				a cobrar los pagos, realizar un seguimiento de las ventas de
				entradas y gestionar el registro de la forma más sencilla
				posible. Incluso podrás comunicarte con los asistentes y
				compartir actualizaciones a medida que se acerque el evento.
			</p>
			<p>
				Esto mantiene sus operaciones funcionando sin problemas, creando
				una experiencia positiva para su personal, seguidores y
				asistentes. Además, tendrás más tiempo para concentrarte en
				organizar el mejor evento posible.
			</p>
			<h2 className="my-3">
				Antes de que las Entradas Salgan a la Venta
			</h2>

			<div className="contenedor-padre">
				<div className="contenido-izquierdo rounded overflow-hidden p-0">
					<img src={imagen4} alt="Imagen" className="imagen" />
				</div>
				<div className="contenido-derecho pl-6">
					<p className="parrafo">
						Antes de vender entradas para eventos, los organizadores
						de eventos deben crear un plan de evento integral. Este
						plan debe definir el público objetivo, establecer un
						precio de entrada que refleje el valor del evento,
						identificar los canales de distribución de entradas más
						eficaces y abarcar una estrategia de marketing para
						generar interés e impulsar las ventas.
					</p>
					<p className="parrafo">
						Para obtener un recurso completo sobre planificación de
						eventos, recomendamos consultar nuestro paso a paso que
						incorpora valiosos conocimientos y recomendaciones.
					</p>
				</div>
			</div>
			<h2 className="mt-3">
				Queremos contar con tus sugerencias y comentários
			</h2>

			<Contact />
		</div>
	);
};

export default Home;
