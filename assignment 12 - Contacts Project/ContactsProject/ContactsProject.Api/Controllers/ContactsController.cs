using ContactsApp.Data.Models;
using ContactsApp.Data.Services;
using ContactsProject.Api.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

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
        public IHttpActionResult GetAllContacts()
        {
            try
            {
                var model = db.GetAllContacts();
                return Ok(model);
            }
            catch (Exception exception)
            {
                return Content(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [HttpPost]
        [ActionName("GetContacts")]
        public IHttpActionResult GetContacts(Request request)
        {
            try
            {
                var model = db.GetContacts(request);
                return Ok(model);
            }
            catch (Exception exception)
            {
                return Content(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        public IHttpActionResult PostNewContact(Contact contact)
        {
            if (contact == null || !ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                db.AddContact(contact);
                return Ok("Contact Added Succesfully!");
            }
            catch (Exception exception)
            {
                return Content(HttpStatusCode.InternalServerError, exception.Message);
            }
        }
        public IHttpActionResult DeleteContact([FromUri] long[] contactIds)
        {
            if (contactIds == null || !contactIds.Any())
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                db.RemoveContact(contactIds);
                return Ok("Contacts Deleted Succesfully!");
            }
            catch (Exception exception)
            {
                return Content(HttpStatusCode.InternalServerError, exception.Message);
            }

        }

        public IHttpActionResult PutContact(Contact contact)
        {
            if (contact == null || !ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                db.UpdateContact(contact);
                return Ok("Contact updated Succesfully!");
            }
            catch (Exception exception)
            {
                return Content(HttpStatusCode.InternalServerError, exception.Message);
            }

        }

    }
}
