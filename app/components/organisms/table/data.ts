import type { Tarea } from '../../../domain/dashboard/data';

export const nodes: Tarea[] = [
  {
    name: 'Proyecto Website',
    deadline: new Date('2024-04-15'),
    type: 'Proyecto',
    isComplete: false,
    nodes: [
      {
        name: 'Diseño UI',
        isComplete: true
      },
      {
        name: 'Implementación Frontend',
        isComplete: false
      }
    ]
  },
  {
    name: 'App Móvil',
    deadline: new Date('2024-05-20'),
    type: 'Desarrollo',
    isComplete: false,
    nodes: [
      {
        name: 'Prototipo',
        isComplete: true
      },
      {
        name: 'Testing',
        isComplete: false
      }
    ]
  },
  {
    name: 'Documentación API',
    deadline: new Date('2024-03-30'),
    type: 'Documentación',
    isComplete: true,
    nodes: []
  }
]; 