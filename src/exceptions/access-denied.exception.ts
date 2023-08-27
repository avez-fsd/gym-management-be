import CustomException from "./custom.exception";

export default class AccessDeniedException extends CustomException {
  constructor(message: string, requestId?: string, statusCode:number = 403) {
    super(message, requestId, statusCode, false);
  }
}
