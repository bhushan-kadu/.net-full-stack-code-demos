//Write a c# function to convert a binary number to a decimal number.

using System;
namespace MyNameSpace
{
    class Program26
    {
        public static void BinaryToDecimalDriverFunction()
        {

            Console.WriteLine("Enter a binary Number: ");
            var inputNumber = int.Parse(Console.ReadLine());

            Console.WriteLine("The decimal equivalant is " + binaryToDecimal(inputNumber));

        }

        static int binaryToDecimal(int numberParam)
        {

            var decimalResult = 0;
            var power = 0;
            while (numberParam > 0)
            {
                decimalResult += (int)((numberParam % 10) * Math.Pow(2, power));
                numberParam = (int)(numberParam / 10);
                ++power;
            }

            return decimalResult;
        }

    }
}
