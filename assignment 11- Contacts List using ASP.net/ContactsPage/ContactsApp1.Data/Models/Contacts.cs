using System;
using System.Collections.Generic;
using System.Text;

namespace ContactsApp.Data.Models
{
    public class Contacts
    {
        public IEnumerable<Contact> contacts { get; set; }
    }
}
