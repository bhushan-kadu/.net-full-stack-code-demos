//Write a c# function to convert a positive number to negative number. 

using System;
namespace MyNameSpace
{
    class Program29
    {
        public static void PositiveToNegativeNumber()
        {

            Console.WriteLine("Enter a negative Number: ");
            var numberInput = decimal.Parse(Console.ReadLine());
            Console.WriteLine("Positive number is: " + Math.Abs(numberInput));


        }

    }
}
