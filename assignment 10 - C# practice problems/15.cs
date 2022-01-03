//Write a c# program to test whether a string end with "Script".
// The string length must be greater or equal to 6.
using System;
namespace MyNameSpace
{
    class Program15
    {
        public static void TestStringEndsWithScriptDriverFunction()
        {

            Console.WriteLine("Enter a string having length 6 or greater");
            string stringInput1 = Console.ReadLine();

            stringInput1 = stringInput1.Substring(stringInput1.Length - 6, 6);

            if (stringInput1 == "Script")
            {

                Console.WriteLine("String Ends With \"Script\"");

            }
            else
            {
                Console.WriteLine("String Doesn't End With \"Script\"");
            }


        }
    }
}
