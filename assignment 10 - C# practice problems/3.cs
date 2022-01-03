//Write a c# program to check two given numbersInput 
//and return true if one of the number is 50 or if their sum is 50.  

using System;
using System.Collections.Generic;
using System.Globalization;

namespace MyNameSpace
{
    class Program3
    {
        public static void CheckIfSumOrNumberIs50DriverFunction()
        {

            Console.WriteLine("Enter two numbers :");
            double num1 = double.Parse(Console.ReadLine());
            double num2 = double.Parse(Console.ReadLine());

            if (num1 == 50 || num2 == 50 || (num1 + num2).ToString() == $"{50:N0}")
            {
                Console.WriteLine("true");
            }
        }
    }
}
