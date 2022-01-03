//Write a C# program to check whether two given integer 
//values are in the range 50..99 (inclusive). Return true 
//if either of them are in the said range.   

using System;
namespace MyNameSpace
{
    class Program5
    {
        public static void CheckIfInRange50to99DriverFunction()
        {

            Console.WriteLine("Enter two Integers:");
            double num1 = double.Parse(Console.ReadLine());
            double num2 = double.Parse(Console.ReadLine());

            if ((num1 >= 50 && num1 <= 99) || (num2 >= 50 && num2 <= 99))
            {
                Console.WriteLine("One of the number is in range 50..99");
            }

        }
    }
}
