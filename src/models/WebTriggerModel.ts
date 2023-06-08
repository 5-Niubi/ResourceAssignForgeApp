export interface WebTriggerResponseModel {
    method: string,
    headers: Object,
    body: string,
    path: string,
    queryParameters: Object,
}