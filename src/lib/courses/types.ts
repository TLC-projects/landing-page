/** Modelo de curso usado en el frontend */
export interface Course {
  id: string;
  program: string;
  duration: string;
  title: string;
  description: string;
  objective?: string;
  performances?: string[];
  img: string;
  /** URL hacia el detalle del curso, generada dinámicamente */
  buttonLink?: string;
}

/** Recurso multimedia asociado a un contenido (imagen, archivo, etc.) */
export interface ApiResource {
  id: number;
  url: string;
  content_id: number;
}

/** Sección del proyecto que agrupa contenidos por programa */
export interface ApiSection {
  id: number;
  name: string;
  project_id: number;
}

/** Contenido (curso) tal como lo devuelve el API */
export interface ApiContent {
  id: number;
  section_id: number;
  title: string;
  description: string;
  duration: string;
  blocked: boolean;
  /** Objetivo principal del curso */
  objectives?: string;
  /** Lista de desempeños en formato JSON string */
  performance?: string;
  resources: ApiResource[];
}

/** Respuesta paginada genérica del API */
export interface ApiPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}