using ContactsApp.Data.Models;
using ContactsApp.Data.Services;
using MySql.Data.MySqlClient;
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
        private readonly IStatesData db;

        public StateController(IStatesData db)
        {
            this.db = db;
        }

        public IHttpActionResult GetAllStatesForGrid()
        {
            try
            {
                var model = db.GetAllStates(); ;
                return Ok(model);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        public IHttpActionResult GetStatesForCountryId(long countryId)
        {
            try
            {
                var model = db.GetStatesForGivenCountry(countryId);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }


        }
        public IHttpActionResult GetStatesForCountryName(string countryName)
        {
            try
            {
                var abc = new int[1];
                if(countryName == null || countryName.Trim() == "") return Ok(new int[0]);

                var model = db.GetStatesForGivenCountry(countryName);
                return Ok(model);
            }
            catch (Exception ex)
            {
                return Ok(new int[0]);
            }


        }

        public IHttpActionResult PostNewState(StateForGrid state)
        {
            try
            {
                db.AddState(state); ;
                return Ok("State Added Succesfully!");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public IHttpActionResult DeleteState([FromUri] long[] stateIds)
        {
            if (stateIds == null || !ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                db.DeleteStates(stateIds);
                return Ok("State/s Deleted Succesfully!");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        public IHttpActionResult PutState(StateForGrid state)
        {
            if (state == null || !ModelState.IsValid)
            {
                return BadRequest("Not a valid data");
            }
            try
            {
                db.UpdateState(state);
                return Ok("State updated Succesfully!");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }

        }


    }
}
