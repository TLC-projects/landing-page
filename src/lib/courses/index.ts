export type { Course } from './types';
export type { ProgramId } from './programs';
export { getProgramSlug, getProgramLabel, programsMap, PROGRAM_LABELS } from './programs';
import { fetchSections, fetchContentBySection, fetchContentById } from './fetchers';
import { mapContentToCourse } from './mappers';
import { getProgramSlug } from './programs';
import type { ProgramId } from './programs';
import type { Course } from './types';

/**
 * Obtiene todos los cursos de todas las secciones del proyecto.
 * Hace fetch en paralelo para cada sección y aplana los resultados.
 */
export async function getCourses(): Promise<Course[]> {
  const sections = await fetchSections();
  const results = await Promise.all(
    sections.map(({ id, program }) => fetchContentBySection(id, program))
  );
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
    buttonLink: `/programas/${programSlug}/cursos/${course.id}`,
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