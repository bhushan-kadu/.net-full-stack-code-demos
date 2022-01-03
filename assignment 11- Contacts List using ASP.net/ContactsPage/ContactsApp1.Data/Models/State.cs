using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ContactsApp.Data.Models
{
    public class State
    {
        public long StateId { get; set; }
        [Required]
        public string StateName { get; set; }
      
    }
}
