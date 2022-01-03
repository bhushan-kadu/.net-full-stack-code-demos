//Write a c# function to get the amount of days of a year. 

using System;
namespace MyNameSpace
{
    class Program24
    {
        public static void AmountOfDaysInYearDriverFunction()
        {


            Console.WriteLine("Enter year in yyyy format: ");
            var dateInput1 = Console.ReadLine();
            var year = int.Parse(dateInput1);

            if (isLeapYear(year))
            {
                Console.WriteLine("366 days");
            }
            else
            {
                Console.WriteLine("365 days");
            }
        }

        static bool isLeapYear(int yearParam)
        {
            if (yearParam % 400 == 0)
            {
                return true;
            }

            if (yearParam % 100 == 0)
            {
                return false;
            }

            if (yearParam % 4 == 0)
            {
                return true;
            }

            return false;
        }
    }
}
