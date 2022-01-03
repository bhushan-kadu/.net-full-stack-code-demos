//Write a c# function to get the month name from a particular date.

using System;
namespace MyNameSpace
{
    class Program19
    {
        public static void GetMonthNameFromDateDriverFunction()
        {

            var monthStrings = new[]{"January", "February",
                         "March", "April", "May", "June", "July",
                         "August", "September", "October", "November",
                        "December"
            };

            Console.WriteLine("Enter dateInput in dd/mm/yyyy");
            var dateInput = Console.ReadLine();
            var split = dateInput.Split('/');

            Console.WriteLine("Month name is " + monthStrings[int.Parse(split[1]) - 1]);


        }
    }
}
