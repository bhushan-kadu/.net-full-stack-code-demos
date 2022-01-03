//Write a c# function to get difference between two dates in days.

using System;
namespace MyNameSpace
{
    class Program23
    {
        public static void DifferenceBetweenTwoDatesInDaysDriverFunction()
        {


            Console.WriteLine("Enter 2 dates in dd/mm/yyyy format");
            var dateInput1 = Console.ReadLine();
            var dateInput2 = Console.ReadLine();
            var split1 = dateInput1.Split('/');
            var split2 = dateInput2.Split('/');

            var date1Obj1 = new DateTime(int.Parse(split1[2]), int.Parse(split1[1]), int.Parse(split1[0]), 12, 0, 0);
            var date1Obj2 = new DateTime(int.Parse(split2[2]), int.Parse(split2[1]), int.Parse(split2[0]), 12, 0, 0);


            Console.WriteLine("difference in days is: " + Math.Abs((date1Obj1 - date1Obj2).TotalDays));

        }
    }
}
