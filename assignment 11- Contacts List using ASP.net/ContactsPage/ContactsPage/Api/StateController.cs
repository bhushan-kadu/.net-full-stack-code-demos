using ContactsApp.Data.Models;
using ContactsApp.Data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ContactsPage.Api
{
    public class StateController : ApiController
    {
        private readonly ICountriesData countries;

        public StateController(ICountriesData countries)
        {
            this.countries = countries;
        }

        public CountryState Get(string countryName)
        {
            var model = countries.GetCountryState(countryName);
            return model;

        }


    }
}
