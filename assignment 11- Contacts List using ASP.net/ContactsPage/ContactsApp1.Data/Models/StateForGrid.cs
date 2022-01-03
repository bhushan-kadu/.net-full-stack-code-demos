using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContactsApp.Data.Models
{
    public class StateForGrid
    {
        public long StateId { get; set; }
        [Required]
        public string StateName { get; set; }
        [Required]
        public string StateCapital { get; set; }
        [Required]
        public string CountryName{ get; set; }
        public long CountryId{ get; set; }

    }
}
