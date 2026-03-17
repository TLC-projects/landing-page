import type { ApiContent, ApiResource, Course } from './types';
import type { ProgramId } from './programs';

// Variable de imagen de fallback
const FALLBACK_IMG = '/assets/images/Img_curso_1.webp';

/**
 * Parsea el string JSON de desempeños a un array de strings.
 * Retorna un array vacío si el valor es undefined, null o no es un JSON válido.
 */
export function parsePerformances(raw?: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Obtiene la URL de la imagen principal del curso.
 * Si no hay recursos disponibles, retorna la imagen de fallback.
 */
export function getMainImageUrl(resources: ApiResource[]): string {
  return resources?.[0]?.url || FALLBACK_IMG;
}

/**
 * Transforma un contenido de la API al modelo de curso usado en el frontend.
 * Mapea los campos del API a la interfaz Course, parseando los desempeños
 * y resolviendo la imagen principal desde los recursos.
 */
export function mapContentToCourse(content: ApiContent, program: ProgramId): Course {
  return {
    id: String(content.id),
    program,
    title: content.title,
    description: content.description,
    duration: content.duration,
    objective: content.objectives,
    performances: parsePerformances(content.performance),
    img: getMainImageUrl(content.resources),
  };
}