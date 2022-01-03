//Write a c# program to check whether the last digit of the three given 
//positive integers is same.
using System;
namespace MyNameSpace
{
    class Program7
    {
        public static void CheckLastThreeDigitSameOrNotDriverFuntion()
        {

            Console.WriteLine("Enter three Positive Integers:");
            double num1 = double.Parse(Console.ReadLine());
            double num2 = double.Parse(Console.ReadLine());
            double num3 = double.Parse(Console.ReadLine());


            if (num1 % 10 == num2 % 10 && num1 % 10 == num3 % 10)
            {
                Console.WriteLine("last digit " + num1 % 10 + " is Same");
            }
            else
            {
                Console.WriteLine("last digit not same");
            }
        }
    }
}
