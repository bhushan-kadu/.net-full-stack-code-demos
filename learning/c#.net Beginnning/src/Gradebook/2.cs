//Write a C# program to find the area of a 
//triangle where lengths of the three of its sides are 5, 6, 7.

using System;
using System.Collections.Generic;
using System.Globalization;

namespace Gradebook1
{


    class Program2
    {

        static void Main(string[] args)
        {

            Console.WriteLine("Enter sides of triangle:");
            double side1 = double.Parse(Console.ReadLine());
            double side2 = double.Parse(Console.ReadLine());
            double side3 = double.Parse(Console.ReadLine());
            Console.WriteLine(side1);

            var perimeter = side1 + side2 + side3;
            var area = Math.Sqrt(perimeter *
                                (perimeter - side1) *
                                (perimeter - side2) *
                                (perimeter - side3));
            Console.WriteLine($"Area is {area:N2}");




        }
    }


}
