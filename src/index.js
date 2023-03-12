import "./config"; // Variables de Entrono
import app from "./app"; // Express
import "./database"; // MongoDB


// Servidor
app.listen(app.get('port'), () => {
  console.log('Servidor corriendo en el puerto', app.get('port'));
});