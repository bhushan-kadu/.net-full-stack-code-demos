using Autofac;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using ContactsApp.Data.Services;
using Autofac.Integration.WebApi;
using ContactsProject.Api;
using System.Web.Configuration;

namespace ContactsPage.App_Start
{
    public class ContainerConfig
    {
        internal static void RegisterContainer(HttpConfiguration httpConFiguration)
        {
            var builder = new ContainerBuilder();

            builder.RegisterApiControllers(typeof(WebApiApplication).Assembly);

            

            var server = WebConfigurationManager.AppSettings["ServerAddress"];
            var database = WebConfigurationManager.AppSettings["Database"];
            var uid = WebConfigurationManager.AppSettings["Uid"];
            var password = WebConfigurationManager.AppSettings["Password"];

            builder.Register(context =>
            { return new ContactsFromDatabase(server, database, uid, password); })
               .As<IContactData>();

            builder.Register(context =>
            { return new StatesFromDatabase(server, database, uid, password); })
                .As<IStatesData>();


            builder.Register(context =>
            { return new CountriesFromDatabase(server, database, uid, password); })
                .As<ICountryData>();

            var container = builder.Build();
            httpConFiguration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}