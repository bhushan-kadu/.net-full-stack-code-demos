using OdeToFood.Data.Services;
using OdeToFood.Web.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OdeToFood.Web.Controllers
{
    public class HomeController : Controller
    {
        DbConnect db;

        public HomeController(DbConnect db)
        {
            this.db = db;
        }
        public ActionResult Index()
        {
            db.Insert();
            var model = db.Select();
            return View(model);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}