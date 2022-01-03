
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ContactsProject.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // cors configuration
            EnableCorsGlobally(config);

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var jsonFormatter = config.Formatters.JsonFormatter;

            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        static void EnableCorsGlobally(HttpConfiguration config)
        {

            var cors = new EnableCorsAttribute(origins: "https://localhost:44304, http://localhost:3000, http://127.0.0.1:5500", headers: "*", methods: "*");
            config.EnableCors(cors);

        }

       
    }
}
