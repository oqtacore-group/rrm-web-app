export interface Result<T> {
    Data: T;
    Success: boolean;
    ErrorMessage: string;
}
export interface ListResult<T> {
    Data: T[],
    Success: boolean;
    ErrorMessage: string;
}