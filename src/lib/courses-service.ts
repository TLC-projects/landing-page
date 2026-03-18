export interface Course {
  id: string;
  program: string;
  duration: string;
  title: string;
  description: string;
  objective?: string;
  performances?: string[];
  img: string;
  buttonLink?: string;
}

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
const PROJECT_ID = 1;
const FALLBACK_IMG = '/assets/images/Img_curso_1.webp';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProgramSlug(program: ProgramId): string {
  return programsMap[program];
}

export function getProgramLabel(program: ProgramId): string {
  return PROGRAM_LABELS[program];
}

// ─── API types ────────────────────────────────────────────────────────────────

interface ApiResource {
  id: number;
  url: string;
  content_id: number;
}

interface ApiSection {
  id: number;
  name: string;
  project_id: number;
}

interface ApiContent {
  id: number;
  section_id: number;
  title: string;
  description: string;
  duration: string;
  blocked: boolean;
  objectives?: string;
  performance?: string;
  resources: ApiResource[];
}

interface ApiPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

function parsePerformances(raw?: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getMainImageUrl(resources: ApiResource[]): string {
  return resources?.[0]?.url || FALLBACK_IMG;
}

function mapContentToCourse(content: ApiContent, program: ProgramId): Course {
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

function mapSectionToProgram(section: ApiSection): { id: number; program: ProgramId } | null {
  const program = sectionNameToProgramId[section.name.toLowerCase().trim()];
  return program ? { id: section.id, program } : null;
}

// ─── API fetchers ─────────────────────────────────────────────────────────────

async function fetchSections(): Promise<Array<{ id: number; program: ProgramId }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/section/project/${PROJECT_ID}`);
    if (!res.ok) return [];

    const json: ApiPaginatedResponse<ApiSection> = await res.json();
    return json.data.map(mapSectionToProgram).filter(Boolean) as Array<{ id: number; program: ProgramId }>;
  } catch (error) {
    console.error('Error fetching sections:', error);
    return [];
  }
}

async function fetchContentBySection(sectionId: number, program: ProgramId): Promise<Course[]> {
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

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  const sections = await fetchSections();
  const results = await Promise.all(
    sections.map(({ id, program }) => fetchContentBySection(id, program))
  );
  return results.flat();
}

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

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/content/${slug}`);

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