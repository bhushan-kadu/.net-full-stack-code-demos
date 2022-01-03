
using ContactsApp.Data.Models;
using ContactsApp.Data.Services;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;

namespace ContactsPage.Api
{
    public class CountryController : ApiController
    {
        private readonly ICountryData db;


        public CountryController(ICountryData db)
        {
            this.db = db;
        }

        public IHttpActionResult GetCountryList()
        {
            try
            {
                var model = db.GetAvailableCountryList(); ;
                return Ok(model);
            }
            catch (MySqlException ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        public IHttpActionResult GetCountryListForGrid(string select)
        {
            try
            {
                if (select == "forGrid")
                {
                    var model = db.GetCountryListForGrid(); ;
                    return Ok(model);
                }
                return Content(HttpStatusCode.InternalServerError, "Please Provide a select parameter");
            }
            catch (MySqlException ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        public IHttpActionResult PostNewCountry(CountryForGrid country)
        {
            try
            {
                db.AddCountry(country); 
                return Ok("Country Added Succesfully!");
            }
            catch (MySqlException ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        public IHttpActionResult DeleteCountry([FromUri] long[] countryIds)
        {
            if (countryIds == null || !ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                db.DeleteCountry(countryIds);
                return Ok("Country/s Deleted Succesfully!");
            }
            catch (MySqlException ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        public IHttpActionResult PutCountry(CountryForGrid country)
        {
            if (country == null || !ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                db.UpdateCountry(country);
                return Ok("Country updated Succesfully!");
            }
            catch (MySqlException ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
    }
}
