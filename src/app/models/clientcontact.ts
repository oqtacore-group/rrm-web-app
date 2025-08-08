export class ClientContact {
  id: number = 0;
  ClientId: number = 0;
  PhoneNumber?: string;
  Name?: string;
  Email: string = '';
  ContactDataId: number = 0;
  ContactData: ContactData = new ContactData();
}

export interface ClientContactList {
  list: ClientContact[];

}
export interface ClientContactProfile {
  data: ClientContact;
}

export class ContactData {
  id: number = 0;
  Linkedin?: string;
  Vkontakte?: string;
  PhoneNumber?: string;
  SecondPhoneNumber?: string;
  Telegram?: string;
  Skype?: string;
  Email?: string;
  Location?: string;
  Show?: boolean;
}