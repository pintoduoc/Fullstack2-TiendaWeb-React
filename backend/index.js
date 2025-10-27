const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Mensaje en la raíz
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente 🚀');
});

// Endpoint de productos
app.get('/api/productos', (req, res) => {
  res.json([
  {
    id: 1,
    name: "Suscripción Mensual",
    price: 29.99,
    image: "/images/sub_mensual.png",
    description: "Acceso completo al servicio durante 1 mes. Renovación automática cada mes."
  },
  {
    id: 2,
    name: "Suscripción Semanal",
    price: 9.99,
    image: "/images/sub_semanal.png",
    description: "Acceso completo al servicio durante 1 semana. Ideal para probar el servicio."
  },
  {
    id: 3,
    name: "Suscripción Anual",
    price: 249.99,
    image: "/images/sub_anual.jpeg",
    description: "Acceso completo al servicio durante 1 año con un precio reducido."
  }
]);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
