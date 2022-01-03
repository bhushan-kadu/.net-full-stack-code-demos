using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ContactsApp.Data.Models;

namespace ContactsPage.Models
{
    public class ContactListViewModel
    {

        public ContactListViewModel(Countries countries, IEnumerable<Country> countryList)
        {
            Countries = countries;
            CountryList = countryList;
        }
        public Countries Countries { get; set; }
        public IEnumerable<Country> CountryList { get; set; }

    }
}