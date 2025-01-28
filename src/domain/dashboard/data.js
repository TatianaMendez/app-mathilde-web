export const nodes = [
    {
      name: 'Tarea 1',
      deadline: new Date('2025-01-25'),
      type: 'Desarrollo',
      isComplete: false,
      nodes: [],
    },
    {
      name: 'Tarea 2',
      deadline: new Date('2025-02-15'),
      type: 'Revisión',
      isComplete: true,
      nodes: [],
    },
    {
      name: 'Tarea 3',
      deadline: new Date('2025-03-10'),
      type: 'Documentación',
      isComplete: false,
      nodes: [
        { name: 'Subtarea 1', isComplete: true },
        { name: 'Subtarea 2', isComplete: false },
      ],
    },
    {
      name: 'Tarea 4',
      deadline: new Date('2025-04-05'),
      type: 'Pruebas',
      isComplete: false,
      nodes: [],
    },
  ];
  