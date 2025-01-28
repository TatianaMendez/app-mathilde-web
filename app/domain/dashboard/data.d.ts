// data.d.ts
interface Subtarea {
    name: string;
    isComplete: boolean;
}
  
interface Tarea {
    name: string;
    deadline: Date;
    type: string;
    isComplete: boolean;
    nodes: (Tarea | Subtarea)[];
}

// Exportamos las interfaces y la declaración
export { Subtarea, Tarea };

// Declaramos los tipos para el módulo
declare module '@/domain/dashboard/data' {
    const nodes: Tarea[];
    export { nodes };
}
  