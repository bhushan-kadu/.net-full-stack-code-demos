using ContactsApp.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactsApp.Data.Services
{
    public interface ICountryData
    {
       
        IEnumerable<Country> GetAvailableCountryList();
        IEnumerable<CountryForGrid> GetCountryListForGrid();
        void AddCountry(CountryForGrid country);
        void DeleteCountry(IEnumerable<long> countryIds);
        void UpdateCountry(CountryForGrid country);
        long GetCountryIdFromName(string countryName);



    }
}
