
const consulta = async (titulo, id) => {
  let ruta;
  
  if  (id) {
      ruta=`https://imdb-api.com/en/API/Title/k_igkxkgas/${id}`
    } else if (titulo && id == null) {
      ruta=`https://imdb-api.com/API/AdvancedSearch/k_igkxkgas/?title=${titulo}`
    }

    try {
      let ruta


      if(id){
        ruta=`https://imdb-api.com/en/API/Title/k_igkxkgas/${id}`
      }else
      {
         ruta=`https://imdb-api.com/API/AdvancedSearch/k_igkxkgas/?title=${titulo}` //todo meter la key en un env


      }
     
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