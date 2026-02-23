export interface Course {
  id: string;
  program: string;
  duration: string;
  title: string;
  description: string;
  img: string;
  buttonLink?: string;
}

// ID de programa -> slug de URL
export const programsMap = {
  CAPACITACION_DOCENTE: 'capacitacion-docente',
  FUNDAMENTOS: 'fundamentos',
  FRANCES: 'frances',
  INGLES_MUNDO: 'ingles-mundo'
} as const;

export type ProgramId = keyof typeof programsMap;

// Función auxiliar para obtener el slug del programa
export function getProgramSlug(program: ProgramId): string {
  return programsMap[program];
}

// datos locales de los cursos (esto después se reemplazará por la llamada a la API)
export const localCourses: Course[] = [
  {
    id: 'metodos-evaluacion-formativa',
    program: 'CAPACITACION_DOCENTE',
    duration: '20 HORAS',
    title: 'Métodos de Evaluación Formativa',
    description: `Este curso de formación docente de 20 horas aborda la 
    evaluación formativa como un componente esencial del proceso 
    de enseñanza y aprendizaje. Los participantes analizan la 
    evaluación más allá de su función calificativa, reconociéndola 
    como un proceso continuo de recolección de evidencias, 
    reflexión pedagógica y toma de decisiones. A través del estudio 
    de estrategias, instrumentos y ejemplos prácticos, el curso 
    orienta a los docentes en el diseño de actividades evaluativas 
    alineadas con los objetivos de aprendizaje, el uso de la 
    retroalimentación efectiva y la promoción de la autorregulación y 
    participación activa de los estudiantes, fortaleciendo así la 
    calidad de la práctica docente.`,
    img: '/assets/images/Img_curso_1.webp'
  },
  {
    id: 'manejo-clases-grandes-multinivel',
    program: 'CAPACITACION_DOCENTE',
    duration: '20 HORAS',
    title: 'Manejo de Clases Grandes y Multinivel',
    description: `Este curso de 20 horas brinda a los docentes herramientas 
    pedagógicas y estrategias prácticas para enfrentar los desafíos 
    que supone la enseñanza en clases numerosas y con estudiantes 
    de diferentes niveles de aprendizaje. A partir del análisis de 
    situaciones reales de aula, los participantes exploran técnicas de 
    organización del espacio, gestión del tiempo, atención a la 
    diversidad y diseño de actividades inclusivas. El curso enfatiza la 
    importancia de la planificación flexible y la enseñanza 
    diferenciada, permitiendo a los docentes generar ambientes de 
    aprendizaje participativos, organizados y respetuosos de los 
    distintos ritmos y estilos de aprendizaje presentes en el aula.`,
    img: '/assets/images/Img_curso_2.webp'
  },
  {
    id: 'ai-english-learning',
    program: 'CAPACITACION_DOCENTE',
    duration: '20 HORAS',
    title: 'AI in English Learning: Practical Tools for Modern Classrooms',
    description: ``,
    img: '/assets/images/Img_curso_3.webp'
  },
  {
    id: 'plan-nacional-bilinguismo',
    program: 'FUNDAMENTOS',
    duration: '20 HORAS',
    title: 'Plan Nacional de Bilingüismo (PNB)',
    description: `Este curso de formación docente tiene como propósito el 
    estudio académico y normativo del Plan Nacional de 
    Bilingüismo en Colombia, enmarcado en las políticas 
    públicas educativas vigentes. A lo largo de las 20 horas, los 
    participantes analizan los fundamentos, objetivos, 
    lineamientos y alcances del PNB, así como su relación con la 
    calidad educativa y la enseñanza de lenguas extranjeras en 
    el país. El curso promueve la reflexión crítica sobre la 
    implementación del PNB en las instituciones educativas y el 
    rol del docente en los procesos de planeación, desarrollo 
    curricular y mejora de los resultados de aprendizaje en 
    lenguas extranjeras.`,
    img: '/assets/images/Img_curso_3.webp'
  },
  {
    id: 'marco-comun-europeo',
    program: 'FUNDAMENTOS',
    duration: '20 HORAS',
    title: 'Marco Común Europeo de Referencia para las Lenguas (MCER)',
    description: `Este curso de formación docente está orientado al estudio 
    académico del Marco Común Europeo de Referencia para las 
    Lenguas (MCER) como estándar internacional para la enseñanza, 
    aprendizaje y evaluación de lenguas extranjeras. A lo largo de las 
    20 horas, los participantes analizan los principios teóricos del 
    MCER, sus niveles de competencia lingüística, descriptores y 
    enfoque basado en la acción. El curso permite comprender el 
    MCER como una herramienta para la planeación pedagógica, la 
    formulación de objetivos de aprendizaje y la evaluación del 
    desempeño lingüístico, favoreciendo prácticas educativas 
    coherentes y alineadas con estándares internacionales.`,
    img: '/assets/images/Img_curso_4.webp'
  },
  {
    id: 'observacion-clase-diagnostico-institucional',
    program: 'FUNDAMENTOS',
    duration: '20 HORAS',
    title: 'Observación de Clase y Diagnóstico Institucional',
    description: `Este curso está orientado a fortalecer el liderazgo pedagógico 
    de directivos y directivos docentes mediante el estudio de la 
    observación de clase como un proceso formativo, sistemático 
    y basado en evidencias. A lo largo del OVA, los participantes 
    analizan el sentido pedagógico e institucional de la 
    observación de clase, sus etapas, instrumentos y principios, 
    así como su articulación con la mejora continua de la práctica 
    docente. El recurso promueve una comprensión clara de la 
    observación de clase como una estrategia de 
    acompañamiento pedagógico, orientada al aprendizaje 
    profesional, la reflexión crítica y el fortalecimiento de una 
    cultura institucional de mejoramiento.`,
    img: '/assets/images/Img_curso_5.webp'
  }
];



// funcion para obtener todos los cursos (ahorita nomas local despues con la api)
export async function getCourses(): Promise<Course[]> {
  return Object.values(localCourses);
};

// función para obtener un curso por su slug (id) (ahorita nomas local despues con la api)
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  return localCourses.find((course) => course.id === slug) || null;
};


// funcion para obtener los cursos por programa (ahorita nomas local despues con la api, ojo que este filtro puede venir de la api, entonces no es necesario hacer este filtro xd , pero lo dejo por si acaso)
export async function getCoursesByProgram(program: ProgramId): Promise<Course[]> {
  const allCourses = await getCourses();
  const programSlug = getProgramSlug(program);
  
  return allCourses
    .filter(course => course.program === program)
    .map(course => ({
      ...course,
      buttonLink: `/programas/${programSlug}/cursos/${course.id}`
    }));
}