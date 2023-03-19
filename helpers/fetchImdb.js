const consulta = async (titulo) => {

    try {

      let ruta=`https://imdb-api.com/en/API/SearchMovie/k_igkxkgas/${titulo}`

      let peticion = await fetch(ruta,
        {
          method: "GET",
        });

      if (peticion.ok) {
        const respuesta = await peticion.json();
        return respuesta;

      } else throw "Error en la ejecución";

    } catch (error) {

      return error;
    }
  };


  module.exports={
    consulta 
}