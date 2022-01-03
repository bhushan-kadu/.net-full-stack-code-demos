using ContactsPage.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactsApp.Data.Services
{
    public interface IContactData
    {
        IEnumerable<Contact> GetAll();
    }
}
