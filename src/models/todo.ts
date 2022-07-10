export interface Todo {
    id: number;
    created: string;
    title: string;
    deadline: string;
    tags: string[];
    description: string;
    priority: number;
    completed: string;
    done: boolean;
}