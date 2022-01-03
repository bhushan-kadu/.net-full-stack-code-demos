//Write a c# function to format a number up to specified decimal places.

using System;
namespace MyNameSpace
{
    class Program28
    {
        public static void formatNumberDriverFunction()
        {

            Console.WriteLine("Enter a float Number: ");
            var numberInput = decimal.Parse(Console.ReadLine());
            Console.WriteLine("Enter a decimal place to format: ");
            var formatDecimals = int.Parse(Console.ReadLine());

            var numberFormatted = decimal.Round(numberInput, formatDecimals, MidpointRounding.AwayFromZero);
            Console.WriteLine($"Number formatted to " + formatDecimals + " format Decimals  is " + numberFormatted);


        }

    }
}
