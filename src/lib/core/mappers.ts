import type { ApiCalendar, ApiContent, ApiResource, ApiSection, CalendarEvent, Course } from './types';
import { sectionNameToProgramId, type ProgramId } from './programs';

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
    brochure_url: content.brochure_url,
  };
}

/**
 * Mapea una sección de la API a un objeto que contiene su ID y programa asociada.
 * Retorna null si la sección no tiene un programa asociado.
 * @param {ApiSection} section - Sección de la API.
 * @returns {{ id: number; program: ProgramId } | null} - Sección mapeada con la información correspondiente o null si no tiene un programa asociado.
 */
export function mapSectionToProgram(section: ApiSection): { id: number; program: ProgramId } | null {
  const program = sectionNameToProgramId[section.name.toLowerCase().trim()];
  return program ? { id: section.id, program } : null;
}

/**
 * Mapea un evento del calendario de la API a un objeto CalendarEvent.
 * Retorna un objeto CalendarEvent con la información correspondiente del evento del calendario.
 * @param {ApiCalendar} calendar - Evento del calendario de la API.
 * @returns {CalendarEvent} - Objeto CalendarEvent mapeado con la información correspondiente.
 */
export function mapCalendarToEvent(calendar: ApiCalendar): CalendarEvent {
  return {
    id: calendar.id,
    title: calendar.title,
    date: calendar.date
  };
}
