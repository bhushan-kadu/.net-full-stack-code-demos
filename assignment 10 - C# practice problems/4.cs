//Write a c# program to check whether 
//a given positive number is a multiple of 3 or a multiple of 7.  

using System;
namespace MyNameSpace
{
    class Program4
    {
        public static void CheckMultipleOf3or7DriverFunction()
        {

            Console.WriteLine("Enter a number :");
            double num1 = double.Parse(Console.ReadLine());

            if (num1 % 3 == 0)
            {
                Console.WriteLine("multiple of 3");
            }
            else if (num1 % 7 == 0)
            {
                Console.WriteLine("multiple of 7");
            }
            else
            {
                Console.WriteLine("not a multiple of 3 or 7");
            }

        }
    }
}
