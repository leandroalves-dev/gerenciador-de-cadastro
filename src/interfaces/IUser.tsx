export interface IUser{
    name: string;
    email: string;
    password: string;
    gender: string;
    birthDate: string;
    area: string;
    photo: FileList;
    admin: boolean; 
}

export interface IUserDados{
    name: string;
    email: string;
    password: string;
    gender: string;
    birthDate: string;
    area: string;
    photo: string | null;
    admin: boolean; 
}