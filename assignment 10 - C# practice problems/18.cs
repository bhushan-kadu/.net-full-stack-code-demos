//Write a c# function to get the number of days in a month. 

using System;
namespace MyNameSpace
{
    class Program18
    {
        public static void NumberOfDaysInAMontnDriverFunction()
        {

            Console.WriteLine("Enter year");
            var yearInput = Console.ReadLine();
            Console.WriteLine("Enter month");
            var monthInput = Console.ReadLine();

            var daysInMonth = DateTime.DaysInMonth(int.Parse(yearInput), int.Parse(monthInput));

            Console.WriteLine("Cuurent date is " + daysInMonth);


        }
    }
}
