import { env } from "../helpers";

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(env("SEND_GIRD_KEY"));
export class SendGrid {
  private sendGrid = sgMail;
  send(msg: any): Promise<any> {
    return this.sendGrid.send(msg);
  }
}