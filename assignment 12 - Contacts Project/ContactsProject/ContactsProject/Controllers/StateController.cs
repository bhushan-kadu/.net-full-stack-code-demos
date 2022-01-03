using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ContactsProject.Controllers
{
    public class StateController : Controller
    {
        // GET: State
        public ActionResult StateIndex()
        {
            return View();
        }
    }
}