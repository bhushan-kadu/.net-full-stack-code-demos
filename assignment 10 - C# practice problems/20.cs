//Write a C# function to compare dates

using System;
namespace MyNameSpace
{
    class Program20
    {
        public static void CompareTwoDatesDriverFunction()
        {


            Console.WriteLine("Enter 2 dates in dd/mm/yyyy format");
            var dateInput1 = Console.ReadLine();
            var dateInput2 = Console.ReadLine();
            var split1 = dateInput1.Split('/');
            var split2 = dateInput2.Split('/');

            var date1Obj1 = new DateTime(int.Parse(split1[2]), int.Parse(split1[1]), int.Parse(split1[0]));
            var date1Obj2 = new DateTime(int.Parse(split2[2]), int.Parse(split2[1]), int.Parse(split2[0]));
            var result = DateTime.Compare(date1Obj1, date1Obj2);

            if (result == 0)
            {
                Console.WriteLine("Both dates are same");
            }
            else if (result > 0)
            {
                Console.WriteLine(dateInput2 + " is greater");
            }
            else
            {
                Console.WriteLine(dateInput1 + " is greater");
            }


        }
    }
}
