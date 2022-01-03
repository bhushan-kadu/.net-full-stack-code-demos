//Write a c# program to find the largest of three given integers. 

using System;
namespace MyNameSpace
{
    class Program6
    {
        public static void LargestOfThreeDriverFunction()
        {

            Console.WriteLine("Enter three Integers:");
            double num1 = double.Parse(Console.ReadLine());
            double num2 = double.Parse(Console.ReadLine());
            double num3 = double.Parse(Console.ReadLine());


            if (num1 > num2)
            {
                if (num1 > num3)
                {
                    Console.WriteLine(num1 + " is greater");
                }
                else
                {
                    Console.WriteLine(num3 + " is greater");
                }
            }
            else if (num2 > num3)
            {
                Console.WriteLine(num2 + " is greater");
            }
            else
            {
                Console.WriteLine(num3 + " is greater");
            }

        }
    }
}
