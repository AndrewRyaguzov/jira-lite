enum UserState {
    WAITING = 'WAITING',
    ACTIVE = 'ACTIVE',
    ARCHIVE = 'ARCHIVE'
}

export class UserDto {
    id!: string;
    name!: string;
    lastName!: string;
    phone!: string;
    state!: UserState;
    isAdmin!: boolean;
}
