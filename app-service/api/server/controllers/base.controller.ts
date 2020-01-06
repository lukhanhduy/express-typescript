export abstract class BaseController {
    protected hideMethod: string[] = [];
    constructor(hideMethod: string[] = []) {
        this.hideMethod = hideMethod;
    }
}
