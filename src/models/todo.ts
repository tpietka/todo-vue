export interface Todo {
    id: number;
    created: string;
    title: string;
    deadline: string;
    tags: string[];
    tasks: Task[];
    description: string;
    priority: number;
    archived: boolean;
    completed: string;
    done: boolean;
}

export interface Task {
    title: string;
    done: boolean;
}