using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContactsApp.Data.Models
{
    public class CountryForGrid
    {
        public long CountryId { get; set; }
        [Required]
        public string CountryName {get;set;}
        [Required]
        public string CountryCode {get;set;}
        public string STDCode {get;set;}

    }
}
