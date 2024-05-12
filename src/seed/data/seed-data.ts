

interface SeedUnidadEducativa {

  nombre: string;
  coordenada_x: number;
  coordenada_y: number;
  direccion: string;
  historia: string;
  fotos: string[];
  idInfraestructura: number,
  idTipoColegio: number;
}

interface SeedInfraestructura {

  nombre: string;
}

interface SeedTipoColegio {

  nombre: string;
}


interface SeedData {
  unidadeseducativas: SeedUnidadEducativa[];
  infraestructuras: SeedInfraestructura[];
  tipocolegios: SeedTipoColegio[];
}

export const initialData: SeedData = {
  tipocolegios: [
    {
  
      nombre: 'Convenio',
    },
    {

      nombre: 'Publico'
    },
    {

      nombre: 'Privado'
    }
  ],

  infraestructuras: [
    {
  
      nombre: 'Modulo',
    },
    {

      nombre: 'Escuela'
    }
  ],
  unidadeseducativas: [
    {

      nombre: 'Unidad Educativa 12 de Abril',
      coordenada_x: -63.1351584,
      coordenada_y: -17.8008285,
      direccion:
        'Av. 3 pasos al Frente y Av. Che Guevara, zona Villa 1ro de Mayo',
      historia:
      'La Unidad Educativa 12 de Abril, fue fundado el 3 de Febrero el 1990, en aquel entonces ubicado en la Av. 3 de pasos al Frente, entre las Av. Che Guevara y Av. 16 de Julio, iniciando actividades en el ciclo intermedio, contando en sus inicios con 7 docente y 1 secretaria a la cabedez de la Directora Prof. Cristina Centellas. Actulamente la Unidad Educativa 12 de Abril funciona con el nivel Secundario, en el turno tarde, situado en el área urbana de la Ciduad de Santa Cruz de la Sierra, zona Villa 1ro de Mayo, entre las avenidas Tres pasos al frente, Av. Che Guevara y 5to anillo. La parte administrativa 2021-2023 se encuentra al cabeza del Lic. Daniel Sergio Covarrubias Camacho como director de la U.E., además de una secretaria, 2 auxiliares administrativos y una portera, todos al servicio de la comunidad educativa. 26 docentes altamente calificados, que brindan una excelente formación académica a todos nuestros estudiantes. Cuenta con 619 estudiantes distribuidos en sus 18 cursos de nivel Secundario de 1ro. a 6to., la gestión 2023 brindará a la ciudad y al país 80 flamantes bachilleres y futuros profesionales que tomarán las riendas de nuestras empresas, del departamento y del  país. La junta escolar a la cabeza de la Sra. Juana Graciela Vaca de Quiroga, quien junto a los P.P.F.F están pendiente de las necesidades del establecimiento.',
      fotos: [
        'https://www.12deabril.edu.bo/wp-content/uploads/2021/04/IMG_20210401_095356.jpg',
        'https://www.12deabril.edu.bo/wp-content/uploads/2021/04/IMG_20210401_095356.jpg',
        'https://www.12deabril.edu.bo/wp-content/uploads/2021/04/IMG_20210401_095356.jpg',
      ],
      idInfraestructura:1,
      idTipoColegio:1
    },
  ],
};