export interface WorkerEvent {
    type: string;
    data: {
        type: string;
        payload: any;
    };
}
