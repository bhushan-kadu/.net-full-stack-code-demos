//Write a c# program to convert a given seconds to hours and minutes. 

using System;
namespace MyNameSpace
{
    class Program10
    {
        public static void SecondToHourAndMinute()
        {

            Console.WriteLine("Enter seconds: ");
            double secondInput = double.Parse(Console.ReadLine());

            secondInput /= 60;
            Console.WriteLine((int)(secondInput / 60) + " Hour/s " + (int)(secondInput % 60) + " Minute/s");

        }
    }
}
