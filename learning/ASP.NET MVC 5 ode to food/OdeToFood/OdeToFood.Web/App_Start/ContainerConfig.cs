using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using OdeToFood.Data.Services;
using OdeToFood.Web.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OdeToFood.Web
{
    public class ContainerConfig
    {
        internal static void RegisterContainer(System.Web.Http.HttpConfiguration httpConfiguration)
        {
            var builer = new ContainerBuilder();

            builer.RegisterControllers(typeof(MvcApplication).Assembly);
            builer.RegisterApiControllers(typeof(MvcApplication).Assembly);
            builer.RegisterType<InMemoryRestaurantData>()
                .As<IRestaurantData>()
                .SingleInstance();

            builer.RegisterType<DbConnect>();

            var container = builer.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
            httpConfiguration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            
        }
    }
}