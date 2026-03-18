import type { ApiContent, ApiPaginatedResponse, ApiSection, Course } from './types';
import type { ProgramId } from './programs';
import { sectionNameToProgramId } from './programs';
import { mapContentToCourse } from './mappers';

// Variables de entorno
const API_BASE_URL = import.meta.env.PUBLIC_API_URL ?? 'https://demos.booksandbooksdigital.com.co/content-manager/back';
const PROJECT_ID = import.meta.env.PUBLIC_PROJECT_ID ?? 1;

/**
 * Obtiene todas las secciones del proyecto y las mapea a su ProgramId correspondiente.
 * Las secciones que no tienen un programa asociado son ignoradas.
 */
export async function fetchSections(): Promise<Array<{ id: number; program: ProgramId }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/section/project/${PROJECT_ID}`);
    console.log('Fetching sections from API:', res.url);
    if (!res.ok) return [];

    const json: ApiPaginatedResponse<ApiSection> = await res.json();
    return json.data
      .map((section) => {
        const program = sectionNameToProgramId[section.name.toLowerCase().trim()];
        return program ? { id: section.id, program } : null;
      })
      .filter(Boolean) as Array<{ id: number; program: ProgramId }>;
  } catch (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
}

/**
 * Obtiene todos los contenidos (cursos) de una sección específica.
 * Solo trae contenidos no bloqueados, con un límite de 100 por página.
 */
export async function fetchContentBySection(sectionId: number, program: ProgramId): Promise<Course[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/content/section/${sectionId}?page=1&limit=100&blocked=false`
    );
    if (!res.ok) return [];

    const json: ApiPaginatedResponse<ApiContent> = await res.json();
    return json.data.map((content) => mapContentToCourse(content, program));
  } catch (error) {
    console.error(`Error fetching content for section ${sectionId}:`, error);
    return [];
  }
}

/**
 * Obtiene un contenido (curso) por su ID.
 * También resuelve el programa al que pertenece consultando las secciones.
 * Retorna null si el contenido no existe o hay un error.
 */
export async function fetchContentById(id: string): Promise<{ content: ApiContent; program: ProgramId } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/content/${id}`);
    if (!res.ok) return null;

    const json = await res.json();
    const content: ApiContent = json.data;

    const sections = await fetchSections();
    const section = sections.find((s) => s.id === content.section_id);
    const program = section?.program ?? 'CAPACITACION_DOCENTE';

    return { content, program };
  } catch {
    return null;
  }
}