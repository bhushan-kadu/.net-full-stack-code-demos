//Write a c# function to check whether a string is blank or not.

using System;
namespace MyNameSpace
{
    class Program16
    {
        public static void CheckIfStringContainsBlankCharecter()
        {

            Console.WriteLine("Enter a string ");
            string stringInput1 = Console.ReadLine();


            if (stringInput1.Length == 0)
            {

                Console.WriteLine("String is blank");

            }
            else
            {
                Console.WriteLine("String is not blank");
            }


        }
    }
}
