
using ContactsApp.Data.Models;
using ContactsApp.Data.Services;
using ContactsPage.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace ContactsPage.Controllers
{
    public class HomeController : Controller
    {
        IEnumerable<Contact> contacts;
        ContactListViewModel contactListViewModel;


        public HomeController(ICountriesData countries)
        {
            var countriesObject = countries.GetAlllCountries();
            var countryList = countries.GetAvailableCountryList();
            contactListViewModel = new ContactListViewModel(countriesObject, countryList);
        }
        public ActionResult Index()
        {

            using (var httpClientt = new HttpClient())
            {
                httpClientt.BaseAddress = new Uri("https://localhost:44394/api/");
                var resposeTask = httpClientt.GetAsync("Contact");
                resposeTask.Wait();

                var result = resposeTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IEnumerable<Contact>>();
                    readTask.Wait();
                    contacts = readTask.Result;
                }
                else
                {
                    contacts = Enumerable.Empty<Contact>();
                    ModelState.AddModelError("contacts not found", "Server Error");
                }
            }

            return View(contactListViewModel);
        }
    }
}