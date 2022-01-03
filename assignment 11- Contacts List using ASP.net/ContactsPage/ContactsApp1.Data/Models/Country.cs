using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContactsApp.Data.Models
{
    public class Country
    {
        public long CountryId { get; set; }
        [Required]
        public string CountryName {get;set;}
       
    }
}
