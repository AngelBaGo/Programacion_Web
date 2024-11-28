const Grid = require('gridjs').Grid; // Importar Grid desde gridjs
require('gridjs/dist/theme/mermaid.css'); // Cargar el archivo de estilos

const grid = new Grid({
    search: {
      server: {
        url: (prev, keyword) => `${prev}?search=${keyword}`
      }
    },
    columns: ['Title', 'Director', 'Producer'],
    server: {
      url: 'https://swapi.dev/api/films/',
      then: data => data.results.map(movie => [movie.title, movie.director, movie.producer])
    } 
  });