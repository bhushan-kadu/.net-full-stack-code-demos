using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ContactsApp.Data.Models
{
    public class Contact
    {
        public long ContactId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime  DOB { get; set; }
        [Required]
        public string Country { get; set; }
        public long CountryId { get; set; }
        public string State { get; set; }
        public long StateId { get; set; }
        [Required]
        public string EmailId { get; set; }
        [Required]
        public string Phone{ get; set; }

    }
}