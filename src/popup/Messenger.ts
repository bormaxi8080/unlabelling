import {RequestType} from "../lib/Request/RequestType";
import {Request} from "../lib/Request/Request";
import {Response} from "../lib/Request/Response";

export class Messenger {

    async query<T extends RequestType, Q, R>(request: Request<T, Q>): Promise<R | undefined> {
        const response: Response<T, R> | undefined = await browser.runtime.sendMessage(request);
        if (response?.responseType === request.requestType) {
            return response.payload;
        }
    }

}
