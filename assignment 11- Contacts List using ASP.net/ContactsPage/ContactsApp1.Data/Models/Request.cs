using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactsProject.Api.Models
{
    public class Request
    {
        public long Skip { get; set; }
        public long Take { get; set; }
        public long RequireTotalCount { get; set; }
        public IEnumerable<object> Sort { get; set; }
    }
    public class SortModel
    {
        public string Selector { get; set; }
        public bool Desc { get; set; }
    }
}