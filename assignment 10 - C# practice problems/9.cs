//Write a C# program to capitalize the first letter of each word of a given string.

using System;
namespace MyNameSpace
{
    class Program9
    {
        public static void CapitalizeEachWordDriverFunction()
        {

            Console.WriteLine("Enter a string: ");
            var inputString = Console.ReadLine();
            var split = inputString.Split(" ");
            var result = "";
            foreach (var itemString in split)
            {
                var newString = itemString.ToCharArray();
                newString[0] = char.ToUpper(newString[0]);
                result += (String.Join("", newString) + " ");
            }

            Console.WriteLine(result);
        }
    }
}
