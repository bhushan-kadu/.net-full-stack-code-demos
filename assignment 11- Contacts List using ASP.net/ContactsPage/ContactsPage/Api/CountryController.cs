
using ContactsApp.Data.Models;
using ContactsApp.Data.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace ContactsPage.Api
{
    public class CountryController : ApiController
    {
        private readonly ICountriesData db;
       

        public CountryController(ICountriesData db)
        {
            this.db = db;
        }

        public IEnumerable<Country> Get()
        {
            var model = db.GetAvailableCountryList(); ;
            return model;

        }
    }
}
