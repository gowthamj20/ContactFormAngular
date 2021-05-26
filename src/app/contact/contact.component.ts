import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title = 'ContactForm';
  contactForm: FormGroup;
  contactArray: Contact[] = [];
  contact: Contact = new Contact();
  editContact: Contact = new Contact();
  editIndex: number;
  contactId:number;
  

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }
  ngOnInit(): void {
    //this.contactForm.emit(this.contactForm);
    this.contactForm = this.formBuilder.group
      (
        {
          name: [null, [Validators.required]],
          address: [null, [Validators.required]],
          pincode: [null, [Validators.required]],
          city: [null, [Validators.required]],
          //country:this.formBuilder.array(['Belgium','India','USA','Netherlands','Germany']),
          country: ['Belgium'], // this.formBuilder.array([]),
          phoneNumber: [null, [Validators.pattern('^[0-9]{10}$'), Validators.required]],
          status:["In Process"]
        }
      );
    this.contactService.getContact().subscribe(
      (response: Contact[]) => {
        console.log(response);
        
        this.contactArray = response;
      },
      (error) => { console.log(error); }
    );
  }
  onSubmit() {
    console.log(this.contactForm);

    if (this.contactForm.valid)
     {
      console.log("submit method hit" + this.contactForm.value);
      this.contactForm["submitted"] = true;
      this.contact = this.contactForm.value;
      console.log("Edit Contact ID"+this.editContact.id);
      console.log("Edit Contact"+this.editContact.address);


      /*

       */
              console.log("Savecontact" + this.contactForm.value.address);
              this.contactArray.push(this.contactForm.value);

/*
      if (this.editContact.id != null) {
        this.contactService.saveContactById(this.editContact).subscribe(
          (response) => { 
            console.log("EditResponse" + response.name); 
            this.contactArray[this.editIndex]=response;
            this.contact=new Contact();
            this.editContact=new Contact();
          },
          (error) => { console.log(error); }
        );
      }
      else {
        this.contactService.savecontact(this.contact).subscribe
          (
            (response) => {
              console.log("Service res   " + response);
              var savecontact = new Contact();
              savecontact.id=response.id;
              savecontact.name = response.name;
              savecontact.address = response.address;
              savecontact.pincode = response.pincode;
              savecontact.city = response.city;
              savecontact.country = response.country;
              savecontact.phoneNumber = response.phoneNumber;
              savecontact.status=response.status;
              console.log("Savecontact" + savecontact.city);
              this.contactArray.push(savecontact);
            },
            (error) => { console.log(error) }
          );
      } */
      this.contactForm["submitted"] = false;
      this.contactForm.reset();
    }

  }
  onEditClick(event, index: number) {
    this.editContact.id=this.contactArray[index].id;
    this.editContact.name = this.contactArray[index].name;
    
    this.editContact.address = this.contactArray[index].address;
    this.editContact.pincode = this.contactArray[index].pincode;
    this.editContact.city = this.contactArray[index].city;
    this.editContact.country = this.contactArray[index].country;
    this.editContact.phoneNumber = this.contactArray[index].phoneNumber;
    this.editContact.status=this.contactArray[index].status;
    this.editIndex = index;
    console.log("Edit contact Country"+this.editContact.country);
  }
  getCountryName()
  {
    return this.contactForm.get('country');
  }
}
