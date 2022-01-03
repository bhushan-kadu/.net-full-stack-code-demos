//Write a c# function to add specified minutes to a Date object.

using System;
namespace MyNameSpace
{
    class Program21
    {
        public static void AddMinutesToDateObjectDriverFunction()
        {


            Console.WriteLine("Enter 2 dates in dd/mm/yyyy format");
            var dateInput1 = Console.ReadLine();
            int mintesToBeAdded = int.Parse(Console.ReadLine());
            var split1 = dateInput1.Split('/');

            var date1Obj1 = new DateTime(int.Parse(split1[2]), int.Parse(split1[1]), int.Parse(split1[0]), 12, 0, 0);

            Console.WriteLine("Date Before Adding: " + date1Obj1.AddMinutes(0));
            date1Obj1.AddMinutes(mintesToBeAdded);
            Console.WriteLine("Date after Adding: " + date1Obj1.AddMinutes(mintesToBeAdded));



        }
    }
}
