//Write a c# program to reverse a given string. 

using System;
namespace MyNameSpace
{
    class Program8
    {
        public static void ReverseAStringDriverFunction()
        {

            Console.WriteLine("Enter a string: ");
            var inputString = Console.ReadLine();
            var split = inputString.ToCharArray();

            Array.Reverse(split);

            Console.WriteLine(string.Join(null, split));
        }
    }
}
