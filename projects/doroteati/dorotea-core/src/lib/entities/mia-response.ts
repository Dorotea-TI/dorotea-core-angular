import { MiaError } from "./mia-error";

export class MiaResponse<T> {
    public success : boolean = false;
    public error? : MiaError;
    public response? : T;
}
