const { useState } = React;

const portfolioItems = [
  {
    id: 1,
    title: "Proyecto 1",
    description: "Descripción del proyecto 1",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Proyecto 2",
    description: "Descripción del proyecto 2",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "Proyecto 3",
    description: "Descripción del proyecto 3",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Proyecto 4",
    description: "Descripción del proyecto 4",
    mediaType: "video",
    mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
  },
];

function App() {
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    email: "",
    telefono: "",
    comuna: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState({ visible: false, title: "", message: "" });

  const validate = () => {
    const newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.rut.trim()) newErrors.rut = "El RUT es obligatorio";
    else if (!/^\d{7,8}-[\dkK]$/.test(form.rut.trim()))
      newErrors.rut = "El RUT debe tener formato correcto (Ej: 12345678-9)";
    if (!form.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email.trim()))
      newErrors.email = "Email inválido";
    if (!form.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio";
    if (!form.comuna.trim()) newErrors.comuna = "La comuna es obligatoria";
    if (!form.mensaje.trim()) newErrors.mensaje = "El mensaje es obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    setModal({
      visible: true,
      title: "¡Mensaje enviado!",
      message: `Gracias ${form.nombre}, he recibido tu mensaje y te responderé pronto.`,
    });

    setForm({
      nombre: "",
      rut: "",
      email: "",
      telefono: "",
      comuna: "",
      mensaje: "",
    });
    setErrors({});
  };

  const closeModal = () => setModal({ visible: false, title: "", message: "" });

  return (
    <>
      <header className="bg-gray-800 text-white p-4 shadow-lg rounded-b-lg">
        <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold mb-2 md:mb-0">Mi Página Web</h1>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li><a href="#inicio" className="hover:text-lime-400 transition duration-300">Inicio</a></li>
            <li><a href="#portafolio" className="hover:text-lime-400 transition duration-300">Portafolio</a></li>
            <li><a href="#contacto" className="hover:text-lime-400 transition duration-300">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <section id="inicio" className="container mx-auto my-8 p-6 bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-lime-400 mb-4">¡Bienvenidos!</h2>
        <p className="mb-4 leading-relaxed">Gracias por visitar mi sitio web. Soy Julio Adones, un apasionado por el diseño y desarrollo web. Aquí encontrarás información sobre mis trabajos y cómo contactarme.</p>
        <p className="leading-relaxed">Soy estudiante del Instituto Inacap de Santiago de Chile en la carrera de Analista Programador y trabajo en el área de soporte TI</p>
      </section>

      <section id="portafolio" className="container mx-auto my-8 p-6 bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-lime-400 mb-4">Portafolio</h2>
        <div className="portfolio-gallery grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {portfolioItems.map(item => (
            <div key={item.id} className="bg-gray-700 p-4 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-lime-300 mb-2">{item.title}</h3>
              <p>{item.description}</p>

              {item.mediaType === "image" && (
                <img 
                  src={item.mediaUrl} 
                  alt={item.title} 
                  className="mt-4 rounded max-h-48 object-cover w-full" 
                />
              )}

              {item.mediaType === "video" && (
                <video
                  controls
                  className="mt-4 rounded max-h-48 w-full"
                  preload="metadata"
                >
                  <source src={item.mediaUrl} type="video/mp4" />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="container mx-auto my-8 p-6 bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-lime-400 mb-4">Contacto</h2>
        <p className="mb-4 leading-relaxed">Contáctame a través de:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Email: <a href="mailto:julioadones@gmail.com" className="text-lime-400 hover:underline">julioadones@gmail.com</a></li>
          <li>Teléfono: <a href="tel:+1234567890" className="text-lime-400 hover:underline">+123 456 7890</a></li>
        </ul>

        <div className="contact-form bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-lime-300 mb-4">Envíame un mensaje</h3>
          <form onSubmit={handleSubmit} noValidate>
            {[
              { label: "Nombre", name: "nombre", type: "text", placeholder: "" },
              { label: "RUT", name: "rut", type: "text", placeholder: "Ej: 12345678-9" },
              { label: "Email", name: "email", type: "email", placeholder: "" },
              { label: "Teléfono", name: "telefono", type: "text", placeholder: "" },
              { label: "Comuna", name: "comuna", type: "text", placeholder: "" },
            ].map(({ label, name, type, placeholder }) => (
              <div className="mb-4" key={name}>
                <label htmlFor={name} className="block text-gray-200 text-sm font-bold mb-2">{label}:</label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={form[name]}
                  placeholder={placeholder}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
                  ${errors[name] ? "border-red-500" : "border-gray-600"} bg-gray-800 text-white`}
                  required
                />
                <span className="error-message">{errors[name] || ""}</span>
              </div>
            ))}
            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-gray-200 text-sm font-bold mb-2">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                value={form.mensaje}
                onChange={handleChange}
                className={`shadow appearance-none border rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
                ${errors.mensaje ? "border-red-500" : "border-gray-600"} bg-gray-800 text-white`}
                required
              />
              <span className="error-message">{errors.mensaje || ""}</span>
            </div>
            <button
              type="submit"
              className="bg-lime-500 hover:bg-lime-600 text-gray-900 font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Enviar
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-900 text-white p-6 text-center rounded-t-lg mt-8">
        <p className="mb-4">&copy; 2025 Julio Adones</p>
        <div className="social-links space-x-4">
          <a href="#" className="hover:text-lime-400 transition duration-300">Facebook</a>
          <a href="#" className="hover:text-lime-400 transition duration-300">Twitter</a>
          <a href="#" className="hover:text-lime-400 transition duration-300">Instagram</a>
        </div>
      </footer>

      {modal.visible && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold text-lime-400 mb-4">{modal.title}</h3>
            <p className="text-gray-200 mb-6">{modal.message}</p>
            <button
              onClick={closeModal}
              className="bg-lime-500 hover:bg-lime-600 text-gray-900 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
