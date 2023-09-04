interface TodoProps {
  id: string;
  status: boolean;
  value: string;
}

interface Todo {
  id: string;
  status: boolean;
  value: string;
}

export type { TodoProps, Todo };
