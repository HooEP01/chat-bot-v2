export interface State {
    status: StateStatus,
    error?: string,
}

export enum StateStatus {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed',
}