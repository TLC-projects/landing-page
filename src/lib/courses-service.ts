import type { ApiCalendar, ApiContent, ApiPaginatedResponse, ApiResource, ApiSection, CalendarEvent, Course } from './courses/types';

export const programsMap = {
  CAPACITACION_DOCENTE: 'capacitacion-docente',
  FUNDAMENTOS: 'fundamentos',
  FRANCES: 'frances',
  INGLES_MUNDO: 'ingles-mundo'
} as const;

export type ProgramId = keyof typeof programsMap;

export const PROGRAM_LABELS: Record<ProgramId, string> = {
  INGLES_MUNDO: 'Inglés en el Mundo',
  FRANCES: 'Francés',
  CAPACITACION_DOCENTE: 'Capacitación docente',
  FUNDAMENTOS: 'Enseñanza del Inglés en Colombia'
};

const sectionNameToProgramId: Record<string, ProgramId> = {
  fundamentos: 'FUNDAMENTOS',
  'capacitación docente': 'CAPACITACION_DOCENTE',
  frances: 'FRANCES',
  'inglés en el mundo': 'INGLES_MUNDO'
};

const API_BASE_URL = import.meta.env.PUBLIC_API_URL ?? 'https://demos.booksandbooksdigital.com.co';
const FALLBACK_IMG = '/assets/images/Img_curso_1.webp';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProgramSlug(program: ProgramId): string {
  return programsMap[program];
}

export function getProgramLabel(program: ProgramId): string {
  return PROGRAM_LABELS[program];
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

/**
 * Parsea el string JSON de desempeños a un array de strings.
 * Retorna un array vacío si el valor es undefined, null o no es un JSON válido.
 */
function parsePerformances(raw?: string): string[] {
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
 * @param {ApiResource[]} resources - Recursos multimedia asociados al contenido.
 * @returns {string} - URL de la imagen principal del curso.
 */
function getMainImageUrl(resources: ApiResource[]): string {
  return resources?.[0]?.url || FALLBACK_IMG;
}

/**
 * Mapea un contenido (curso) de la API a un objeto Course.
 * Se utiliza para transformar la respuesta de la API en un objeto
 * que sea fácil de usar en el frontend.
 * @param {ApiContent} content - Contenido (curso) de la API.
 * @param {ProgramId} program - Programa al que pertenece el curso.
 * @returns {Course} - Curso mapeado con la información correspondiente.
 */
function mapContentToCourse(content: ApiContent, program: ProgramId): Course {
  return {
    id: String(content.id),
    program,
    title: content.title,
    description: content.description,
    duration: content.duration,
    objective: content.objectives,
    performances: parsePerformances(content.performance),
    img: getMainImageUrl(content.resources)
  };
}

/**
 * Mapea una sección de la API a un objeto que contiene su ID y programa asociada.
 * Retorna null si la sección no tiene un programa asociado.
 * @param {ApiSection} section - Sección de la API.
 * @returns {{ id: number; program: ProgramId } | null} - Sección mapeada con la información correspondiente o null si no tiene un programa asociado.
 */
function mapSectionToProgram(section: ApiSection): { id: number; program: ProgramId } | null {
  const program = sectionNameToProgramId[section.name.toLowerCase().trim()];
  return program ? { id: section.id, program } : null;
}

/**
 * Mapea un evento del calendario de la API a un objeto CalendarEvent.
 * Retorna un objeto CalendarEvent con la información correspondiente del evento del calendario.
 * @param {ApiCalendar} calendar - Evento del calendario de la API.
 * @returns {CalendarEvent} - Objeto CalendarEvent mapeado con la información correspondiente.
 */
function mapCalendarToEvent(calendar: ApiCalendar): CalendarEvent {
  return {
    id: calendar.id,
    title: calendar.title,
    date: calendar.date
  };
}

// ─── API fetchers ─────────────────────────────────────────────────────────────

/**
 * Obtiene todas las secciones del proyecto y las mapea a su ProgramId correspondiente.
 * Las secciones que no tienen un programa asociado son ignoradas.
 * @returns {Promise<Array<{ id: number; program: ProgramId }>>}
 * @throws {Error} Si hay un error al hacer fetch a la API
 */
async function fetchSections(): Promise<Array<{ id: number; program: ProgramId }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/section`);
    if (!res.ok) return [];

    const json: ApiPaginatedResponse<ApiSection> = await res.json();
    return json.data.map(mapSectionToProgram).filter(Boolean) as Array<{ id: number; program: ProgramId }>;
  } catch (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
}

/**
 * Obtiene todos los contenidos (cursos) de una sección específica.
 * Solo trae contenidos no bloqueados.
 * @param sectionId - Id de la sección de la cual se quieren obtener los cursos
 * @param program - Programa al que pertenecen los cursos (se usa para mapear correctamente el contenido)
 * @returns  Promise<Array<Course>>
 */
async function fetchContentBySection(sectionId: number, program: ProgramId): Promise<Course[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/content/section/${sectionId}?blocked=false`);
    if (!res.ok) return [];

    const json: ApiPaginatedResponse<ApiContent> = await res.json();
    return json.data.map((content) => mapContentToCourse(content, program));
  } catch (error) {
    console.error(`Error fetching content for section ${sectionId}:`, error);
    return [];
  }
}

/**
 * Obtiene todos los eventos del calendario.
 * Solo trae eventos no bloqueados.
 * @returns {Promise<Array<CalendarEvent>>}
 * @throws {Error} Si hay un error al hacer fetch a la API
 */
async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/calendar?blocked=false`);
    if (!res.ok) return [];

    const json: ApiPaginatedResponse<ApiCalendar> = await res.json();
    return json.data.map(mapCalendarToEvent);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Obtiene todos los cursos de todas las secciones del proyecto.
 * Hace fetch en paralelo para cada sección y aplana los resultados.
 * @returns {Promise<Array<Course>>}
 */
export async function getCourses(): Promise<Course[]> {
  const sections = await fetchSections();
  const results = await Promise.all(sections.map(({ id, program }) => fetchContentBySection(id, program)));
  return results.flat();
}

/**
 * Obtiene todos los cursos de un programa específico.
 * Agrega el `buttonLink` con la ruta completa hacia el detalle del curso.
 * @param {ProgramId} program - El programa del que se desean obtener los cursos.
 * @returns {Promise<Array<Course>>} - Un array de cursos del programa especificado.
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
 * @param {string} slug - El slug del curso que se desea obtener.
 * @returns {Promise<Course | null>} - Un curso con la información correspondiente o null si no existe o hay un error.
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/content/${slug}`);

    if (!res.ok) return null;

    const json = await res.json();
    const content: ApiContent = json.data;

    const sections = await fetchSections();

    const section = sections.find((s) => s.id === content.section_id);
    const program = section?.program ?? 'CAPACITACION_DOCENTE';

    return mapContentToCourse(content, program);
  } catch {
    return null;
  }
}

/**
 * Obtiene todos los eventos del calendario.
 * Retorna una promesa que se resuelve con un array de objetos CalendarEvent o null si hay un error.
 * @returns {Promise<CalendarEvent[] | null>} - Una promesa que se resuelve con un array de objetos CalendarEvent o null si hay un error.
 */
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  return fetchCalendarEvents();
}
