
export type AppResponse<T> ={
    isSuccess: boolean,
    message: string,
    data: T
}