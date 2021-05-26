import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contact2: Contact=new Contact();
  constructor(private httpClient:HttpClient) 
  { }
  getContact():Observable<Contact[]>
  {
    return this.httpClient.get<Contact[]>("api/contact");
  }
  savecontact(contact:Contact):Observable<Contact>
  {
    console.log("Service hit Angular "+ contact);
    return this.httpClient.post<Contact>("/api/contact",contact);
  }
  saveContactById(editContact:Contact):Observable<Contact>
  {
    console.log("Update Service hit Angular "+ editContact.city);
    return this.httpClient.put<Contact>("/api/contact/",editContact);
  }
}
