import { StatusEnum } from "@/enum/status.enum";
import { Guid } from "guid-typescript";

export class BranchModal {
  id:  string;
  name: string;
  location: string;
  contact: string;
  code: string;
  email: string;
  status: StatusEnum;

  constructor(){
    this.id =Guid.EMPTY;
    this.name = '';
    this.location ='';
    this.contact = '';
    this.code='';
    this.email='';
    this.status = StatusEnum.Active
  }
}
