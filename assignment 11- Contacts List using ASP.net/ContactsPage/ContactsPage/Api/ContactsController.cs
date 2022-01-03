using ContactsApp.Data.Models;
using ContactsApp.Data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace ContactsPage.Api
{
    //contacts Api controller for CRUD operation on contacts
    public class ContactsController : ApiController
    {
        private readonly IContactData db;

        public ContactsController(IContactData db)
        {
            this.db = db;
        }
        public IEnumerable<Contact> GetAllContacts()
        {
            var model = db.GetAllContacts();
            return model;
        }

        public IHttpActionResult PostNewContact(Contact contact)
        {
            if (contact == null || !ModelState.IsValid)
            {
                return BadRequest();
            }

            db.AddContact(contact);

            contact.ContactId = db.GetLastInsertedContactId();
            return Ok(contact);
        }

        public IHttpActionResult DeleteContact(Contacts contacts)
        {
            if (contacts == null || !contacts.contacts.Any())
            {

                return BadRequest("Not a valid data");

            }
            else
            {
                var contactIds = new List<int>();
                foreach (var contact in contacts.contacts)
                {
                    contactIds.Add(contact.ContactId);
                }
                db.RemoveContact(contactIds);

                return Ok(contacts);
            }

        }

        public IHttpActionResult PutContact(Contact contact)
        {
            if (contact == null || !ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }

            db.UpdateContact(contact);

            return Ok(contact);
        }


    }
}
