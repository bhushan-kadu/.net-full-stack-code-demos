//Write a c# program to convert the letters of a given 
//stringInputing in alphabetical order.
using System;
namespace MyNameSpace
{
    class Program11
    {
        public static void StringInAscendingOrderDriverFunction()
        {

            Console.WriteLine("Enter a string: ");
            string inputSrring = Console.ReadLine();

            var inpurArray = inputSrring.ToCharArray();
            Array.Sort(inpurArray);

            Console.WriteLine(String.Join("", inpurArray));
        }
    }
}
