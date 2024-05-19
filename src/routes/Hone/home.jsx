import Contact from '../Contacts/Contact';
import BannerSlider from '../../componets/banner/BannerSlider';
import imagen1 from '../../assets/imagen01.jpg';
import imagen4 from '../../assets/imagen04.jpg';

const Home = () => {
	const images = [imagen1];
	return (
		<div className="relative w-full h-screen">
			<div className='h-full flex'>
				{/* <div className='w-full md:w-1/3 bg-blue-100'>
				</div> */}
				<div className='w-full md:w-3/3'>
					<img className='w-full h-full object-cover  filter blur-sm hover:blur-none' src="/src/assets/bg-dance.webp" alt="home" />
				</div>
			</div>
			<div className='absolute top-10 left-10 md:top-44 md:left-48  flex flex-col'>
				<h2 className="m-0 font-extrabold text-3xl md:text-6xl lg:text-8xl text-gray-800">Bienvenido al</h2>
				<h2 className="m-0 font-extrabold text-3xl md:text-6xl lg:text-8xl text-gray-800">Sistema de boletería de</h2>
				<h2 className="m-0 font-extrabold text-3xl md:text-6xl lg:text-8xl text-fuchsia-700"> 
				<span className='font-extrabold text-3xl md:text-6xl lg:text-8xl text-gray-800'>Funk </span>
				<span  className='font-extrabold text-3xl md:text-6xl lg:text-8xl text-gray-800'>Up </span>
				Dance Studio</h2>
				<p className="w-2/3 mt-4 font-medium text-base">
						Antes de vender entradas para eventos, los organizadores
						de eventos deben crear un plan de evento. Este
						plan debe definir el público objetivo, establecer un
						precio de entrada que refleje el valor del evento,
						identificar los canales de distribución de entradas más
						eficaces y abarcar una estrategia de marketing para
						generar interés e impulsar las ventas.
				</p>
			</div>
			{/* <hr className="my-2 mb-4"/> */}

			{/* <BannerSlider images={images} /> */}
			{/* <br /> */}
			{/* <div className="contenedor-padre mt-4">
				<div className="contenido-izquierdo rounded overflow-hidden p-0">
					<img src={imagen4} alt="Imagen" className="imagen" />
				</div>
				<div className="contenido-derecho pl-6">
					<p>
						En el sistema de boletería de Funk Up Dance Studio, puede registrar las ventas de boletos.
					</p>
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
			</div> */}
		</div>

	);
};

export default Home;
