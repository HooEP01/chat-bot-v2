export interface Response {
    status_code: number,
    success: boolean,
    message: string,
}

export function isSuccess(response: Response | null) {
    if (response && (response.success == true || response.status_code == 200)) {
        return true
    }
    return false
}