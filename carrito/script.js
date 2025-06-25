const services = [
    {
      name: 'Página Web',
      price: 150000,
      image: 'https://crecenegocios.com/wp-content/uploads/2018/11/pagina-web-de-empresa.jpg'  
    },
    {
      name: 'Página Móvil',
      price: 120000,
      image: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2014/10/67621-jimdo-app-crear-tu-propia-pagina-web-smartphone-tablet.jpg?tf=3840x' 
    },
    {
      name: 'Soporte Remoto',
      price: 50000,
      image: 'https://cuatroceros.cl/wp-content/uploads/2023/07/image-21_606x606.png'
    },
    {
      name: 'Soporte Presencial',
      price: 80000,
      image: 'https://primerojpb.wordpress.com/wp-content/uploads/2014/05/soportetecnico.png'  
    },
    {
      name: 'Licencias de Aplicaciones',
      price: 60000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGLjbLg0v3H2O7HAtmGEBGzJlBVWBtp05vg&s'  
    },
    {
      name: 'Mantención Preventiva',
      price: 70000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPLKhfHSkMSvH-t9m0DhXguogMiVgaYqPIpQ&s'  
    },
    {
      name: 'Visita Técnica',
      price: 90000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQuRsh0ZoeiWR3wJyT28_pqwo3-1r2Y0jLdQ&s' 
    },
    {
      name: 'Diseño de Páginas Personalizadas',
      price: 200000,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoRfbBZc-iG0WM15inQUprnqtCj3Y6QD8Jkg&s'  
    }
  ];
  
  let cart = [];
  
  function renderServices() {
    const container = document.getElementById('services-container');
    container.innerHTML = '';
  
    services.forEach(service => {
      const div = document.createElement('div');
      div.className = 'service';
      div.innerHTML = `
        <img src="${service.image}" alt="${service.name}" class="service-image" />
        <h3>${service.name}</h3>
        <p>Precio: $${service.price.toLocaleString('es-CL')}</p>
        <button onclick="addToCart('${service.name}')">Agregar al carrito</button>
      `;
      container.appendChild(div);
    });
  }
  
  function addToCart(serviceName) {
    const cartItem = cart.find(item => item.serviceName === serviceName);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ serviceName, quantity: 1 });
    }
    updateCartDisplay();
  }
  
  function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    cartItems.innerHTML = '';
  
    if (cart.length === 0) {
      cartItems.textContent = 'El carrito está vacío.';
      cartTotal.textContent = '';
      return;
    }
  
    let total = 0;
  
    cart.forEach(item => {
      const service = services.find(s => s.name === item.serviceName);
      const subtotal = service.price * item.quantity;
      total += subtotal;
  
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${service.image}" alt="${service.name}"/>
        <span>${item.serviceName} x${item.quantity} - $${subtotal.toLocaleString('es-CL')}</span>
        <button onclick="removeFromCart('${item.serviceName}')">Eliminar</button>
      `;
      cartItems.appendChild(div);
    });
  
    cartTotal.textContent = `Total: $${total.toLocaleString('es-CL')}`;
  }
  
  function removeFromCart(serviceName) {
    cart = cart.filter(item => item.serviceName !== serviceName);
    updateCartDisplay();
  }
  
  function sendQuote() {
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
  
    let summary = 'Cotización de Servicios:\n\n';
    let total = 0;
  
    cart.forEach(item => {
      const service = services.find(s => s.name === item.serviceName);
      const subtotal = service.price * item.quantity;
      total += subtotal;
      summary += `${item.serviceName} x${item.quantity} - $${subtotal.toLocaleString('es-CL')}\n`;
    });
  
    summary += `\nTotal a pagar: $${total.toLocaleString('es-CL')}`;
  
    alert(summary);
  
   
    cart = [];
    updateCartDisplay();
  }
  
  window.onload = () => {
    renderServices();
    updateCartDisplay();
  };
  
