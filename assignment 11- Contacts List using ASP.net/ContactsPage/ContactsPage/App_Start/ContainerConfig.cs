using Autofac;
using Autofac.Integration.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using ContactsApp.Data.Services;
using System.Web.Mvc;
using Autofac.Integration.WebApi;

namespace ContactsPage.App_Start
{
    public class ContainerConfig
    {
        internal static void RegisterContainer(HttpConfiguration httpConFiguration)
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterApiControllers(typeof(MvcApplication).Assembly);

            builder.RegisterType<ContactsFromDatabase>()
                .As<IContactData>()
                .SingleInstance();

            builder.RegisterType<CountriesFromJson>()
                .As<ICountriesData>()
                .SingleInstance();
            
            builder.RegisterType<CountriesFromDatabase>()
                .As<ICountryData>()
                .SingleInstance();

            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            httpConFiguration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}