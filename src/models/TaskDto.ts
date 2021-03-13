// Класс заглушка в ожидании бэка
export class TaskDto {
    id!: string;

    name!: string;
    setter!: string;
    executor!: string;
    type!: string;
    creationDate!: string;
    deadline!: string;

    payload!: string; // Содержание самого тикета
}