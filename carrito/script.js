let cart = [];

const imageMap = {
  'Página Web': 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
  'Página Móvil': 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2014/10/67621-jimdo-app-crear-tu-propia-pagina-web-smartphone-tablet.jpg',
  'Soporte Remoto': 'https://almonacid.cl/wp-content/uploads/2018/04/download.png',
  'Soporte Presencial': 'https://primerojpb.wordpress.com/wp-content/uploads/2014/05/soportetecnico.png',
  'Licencias de Aplicaciones': 'https://dayantec.es/wp-content/uploads/2023/11/dayantec-venta-software-marcas.jpg',
  'Mantención Preventiva': 'https://itglobalchile.cl/wp-content/uploads/2021/04/mantencion.jpg',
  'Visita Técnica': 'https://www.xcom.cl/wp-content/uploads/2023/04/pngegg-2.webp',
  'Diseño de Páginas Personalizadas': 'https://somospecesvoladores.com/wp-content/uploads/2019/11/dise%C3%B1o-web-somos-peces-voladores.png'
};


function addToCart(button, service) {
  cart.push(service);
  updateCart();
}

function updateCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalP = document.getElementById('cart-total');

  cartItemsDiv.innerHTML = "";
  const itemCounts = {};

  cart.forEach(item => {
    itemCounts[item] = (itemCounts[item] || 0) + 1;
  });

  for (let item in itemCounts) {
    const div = document.createElement('div');
    div.style.marginBottom = "1em";

    const text = document.createElement('span');
    text.textContent = `${item} × ${itemCounts[item]}`;

    const img = document.createElement('img');
    img.src = imageMap[item];
    img.alt = item;

    div.appendChild(text);
    div.appendChild(img);
    cartItemsDiv.appendChild(div);
  }

  cartTotalP.textContent = `Total de servicios: ${cart.length}`;
}

function sendQuote() {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const message = `Hola, solicito una cotización para los siguientes servicios:\n\n${cart.join('\n')}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/56912345678?text=${encodedMessage}`; // Cambia el número
  window.open(whatsappURL, '_blank');
}
