export type { Course, EmailPayload, EmailResult } from './types';
export type { ProgramId } from './programs';
export { getProgramSlug, getProgramLabel, programsMap, PROGRAM_LABELS } from './programs';
import { fetchSections, fetchContentBySection, fetchContentById, fetchCalendarEvents, fetchSendEmail } from './fetchers';
import { mapContentToCourse } from './mappers';
import { getProgramSlug } from './programs';
import type { ProgramId } from './programs';
import type { CalendarEvent, Course, EmailPayload, EmailResult } from './types';

/**
 * Obtiene todos los cursos de todas las secciones del proyecto.
 * Hace fetch en paralelo para cada sección y aplana los resultados.
 */
export async function getCourses(): Promise<Course[]> {
  const sections = await fetchSections();
  const results = await Promise.all(sections.map(({ id, program }) => fetchContentBySection(id, program)));
  return results.flat();
}

/**
 * Obtiene los cursos de un programa específico.
 * Agrega el `buttonLink` con la ruta completa hacia el detalle del curso.
 */
export async function getCoursesByProgram(program: ProgramId): Promise<Course[]> {
  const sections = await fetchSections();
  const section = sections.find((s) => s.program === program);
  if (!section) return [];

  const courses = await fetchContentBySection(section.id, program);
  const programSlug = getProgramSlug(program);

  return courses.map((course) => ({
    ...course,
    buttonLink: `/programas/${programSlug}/cursos/${course.id}`
  }));
}

/**
 * Obtiene un curso por su ID (slug).
 * Retorna null si el curso no existe o hay un error en el fetch.
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const result = await fetchContentById(slug);
  if (!result) return null;
  return mapContentToCourse(result.content, result.program);
}

/**
 * Obtiene todos los eventos del calendario.
 * Retorna una promesa que se resuelve con un array de objetos CalendarEvent o null si hay un error.
 * @returns {Promise<CalendarEvent[] | null>} - Una promesa que se resuelve con un array de objetos CalendarEvent o null si hay un error.
 */
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  return fetchCalendarEvents();
}

/**
 * Envía el formulario de contacto al endpoint POST /api/email.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  try {
    return await fetchSendEmail(payload);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, message: 'Error inesperado al enviar el correo' };
  }
}
