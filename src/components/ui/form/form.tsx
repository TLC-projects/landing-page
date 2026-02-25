import { Button } from '@components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellido: z.string().min(1, 'El apellido es requerido').min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().min(1, 'El email es requerido').email('Ingresa un email válido'),
  telefono: z.string().min(1, 'El número de contacto es requerido').min(10, 'Ingresa un número de contacto válido'),
  programa: z.string().min(1, 'El programa/curso es requerido'),
  comentario: z.string().optional(),
  privacidad: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar la política de privacidad para continuar',
  }),
});

type FormData = z.infer<typeof formSchema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implementar lógica de envío (API call, etc.)
      alert('Formulario enviado correctamente');
      reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="order-1 lg:order-2">
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">¿Quieres recibir más información?</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-secondary-700 dark:text-white mb-1">
                Nombre<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                {...register('nombre')}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                  errors.nombre ? 'border-red-500' : 'border-secondary-300'
                }`}
              />
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-secondary-700 dark:text-white mb-1">
                Apellido<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="apellido"
                {...register('apellido')}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                  errors.apellido ? 'border-red-500' : 'border-secondary-300'
                }`}
              />
              {errors.apellido && (
                <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-white mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-secondary-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-secondary-700 dark:text-white mb-1">
                Número de contacto<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telefono"
                {...register('telefono')}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                  errors.telefono ? 'border-red-500' : 'border-secondary-300'
                }`}
              />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="programa" className="block text-sm font-medium text-secondary-700 dark:text-white mb-1">
              Programa / curso<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="programa"
              {...register('programa')}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent ${
                errors.programa ? 'border-red-500' : 'border-secondary-300'
              }`}
            />
            {errors.programa && (
              <p className="mt-1 text-sm text-red-600">{errors.programa.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="comentario" className="block text-sm font-medium text-secondary-700 dark:text-white mb-1">
              Comentario
            </label>
            <textarea
              id="comentario"
              {...register('comentario')}
              rows={3}
              className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"></textarea>
          </div>

          <div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="privacidad"
                {...register('privacidad')}
                className="mt-1 mr-2"
              />
              <label htmlFor="privacidad" className="text-xs text-secondary-700 dark:text-white">
                Si doy autorización expresa para el tratamiento de los datos aquí consignados, según&nbsp;
                <a href="/politica-privacidad" className="text-accent-600 hover:underline">
                  política de privacidad y tratamiento de datos.
                </a>
                <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.privacidad && (
              <p className="mt-1 text-sm text-red-600">{errors.privacidad.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </div>
    </div>
  );
};
