//Write a simple C# program to join all 
//elements of the following array into a string.

using System;
namespace MyNameSpace
{
    class Program32
    {
        public static void JoinArrayElementsIntoString()
        {

            var numArray = new[] { 1, 2, 3, 4, 5 };
            Console.WriteLine("array is " + "[{0}]", string.Join(",", numArray));
            Console.WriteLine("joined string is " + "{0}", string.Join("", numArray));


        }


    }
}
