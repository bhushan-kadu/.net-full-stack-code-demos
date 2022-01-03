
using ContactsApp.Data.Models;
using ContactsProject.Api.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactsApp.Data.Services
{
    public interface IContactData
    {
        void AddContact(Contact contact);
        IEnumerable<Contact> GetAllContacts();
        void UpdateContact(Contact contact);
        void RemoveContact(IEnumerable<long> ids);
        bool isEmailUnique(string email);
        bool isPhoneUnique(string phone);
        object GetContacts(Request request);






    }
}
