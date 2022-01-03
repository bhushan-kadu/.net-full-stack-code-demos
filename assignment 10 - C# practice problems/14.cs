//Write a c# program to concatenate two strings except their first character.
using System;
namespace MyNameSpace
{
    class Program14
    {
        public static void StringConcatenateDriverFunction()
        {

            Console.WriteLine("Enter two strings: ");
            string stringInput1 = Console.ReadLine();
            string stringInput2 = Console.ReadLine();

            stringInput1 = stringInput1.Substring(1, stringInput1.Length - 1);
            stringInput2 = stringInput2.Substring(1, stringInput2.Length - 1);

            Console.WriteLine(stringInput1 + stringInput2);


        }
    }
}
