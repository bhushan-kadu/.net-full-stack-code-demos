using ContactsPage.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactsApp.Data.Services
{
    class InMemoryContact : IContactData
    {
        IEnumerable<Contact> contacts;

        public InMemoryContact()
        {
            List<Contact> temp = new List<Contact>()
            {
                new Contact{Id = 1, FirstName =  "Bhushan", LastName = "Kadu", Country = "India", State= "Maharastra",
                DOB = new DateTime(1998, 04, 19), Email = "bkadu3@gmail.com", Phone = "8411998115"}
            };

            for (int i = 0; i < 19; i++)
            {
                
                temp.Add(new Contact
                {
                    Id = i,
                    FirstName = $"Bhushan{i}",
                    LastName = $"Kadu{i}",
                    Country = "India",
                    State = "Maharastra",
                    DOB = new DateTime(1998, 04, 19),
                    Email = $"bkadu{i}@gmail.com",
                    Phone  = ((i / 10) <= 0 )? $"841199810{i}": $"84119981{i}"
                });

            }

            contacts = temp;


        }
        public IEnumerable<Contact> GetAll()
        {
            return contacts;
        }
    }
}
