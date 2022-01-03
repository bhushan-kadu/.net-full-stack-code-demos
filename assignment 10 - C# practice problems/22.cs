//Write a c# function to test whether a date is a weekend.

using System;
namespace MyNameSpace
{
    class Program22
    {
        public static void TestWeekendDriverFunction()
        {


            Console.WriteLine("Enter 2 dates in dd/mm/yyyy format");
            var dateInput1 = Console.ReadLine();
            var split1 = dateInput1.Split('/');

            var date1Obj1 = new DateTime(int.Parse(split1[2]), int.Parse(split1[1]), int.Parse(split1[0]), 12, 0, 0);

            var day = (int)date1Obj1.DayOfWeek;
            if (day == 0 || day == 6)
            {
                Console.WriteLine("Date is a weekend");
            }
            else
            {
                Console.WriteLine("Date is not a weekend");
            }
        }
    }
}
