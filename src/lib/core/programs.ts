/** Mapeo de ID de programa a su slug de URL */
export const programsMap = {
  CAPACITACION_DOCENTE: 'capacitacion-docente',
  FUNDAMENTOS: 'fundamentos',
  FRANCES: 'frances',
  INGLES_MUNDO: 'ingles-mundo'
} as const;

/** Tipo que representa los IDs válidos de programa */
export type ProgramId = keyof typeof programsMap;

/** Etiquetas legibles para mostrar en la UI por cada programa */
export const PROGRAM_LABELS: Record<ProgramId, string> = {
  INGLES_MUNDO: 'Inglés en el Mundo',
  FRANCES: 'Francés',
  CAPACITACION_DOCENTE: 'Capacitación docente',
  FUNDAMENTOS: 'Enseñanza del Inglés en Colombia'
};

/**
 * Mapeo del nombre de sección que devuelve el API
 * al ProgramId correspondiente en el frontend.
 * Las claves deben coincidir exactamente con el name en minúsculas.
 */
export const sectionNameToProgramId: Record<string, ProgramId> = {
  fundamentos: 'FUNDAMENTOS',
  'capacitación docente': 'CAPACITACION_DOCENTE',
  frances: 'FRANCES',
  'inglés en el mundo': 'INGLES_MUNDO'
};

/** Retorna el slug de URL para un programa dado */
export function getProgramSlug(program: ProgramId): string {
  return programsMap[program];
}

/** Retorna la etiqueta legible para un programa dado */
export function getProgramLabel(program: ProgramId): string {
  return PROGRAM_LABELS[program];
}