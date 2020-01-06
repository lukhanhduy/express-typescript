import app from './../';
export default class BaseService {
  protected models:any = {};
  constructor(){
    this.models = app.models
  }
}