const consulta = async (titulo,pag) => {

    try {

      let ruta=`http://www.omdbapi.com/?apikey=fe94d7e4&s=${titulo}&page=${pag}&Type=movie`

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