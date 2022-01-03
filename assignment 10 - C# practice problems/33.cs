//Write a c# program to add items in an blank array and display the items.

using System;
using System.Collections.Generic;

namespace MyNameSpace
{
    class Program33
    {
        public static void AddItemsToArrayDriverFunction()
        {

            var numArray = new List<int>() { };
            Console.WriteLine("array is " + "[{0}]", string.Join(",", numArray));
            Console.WriteLine("Give array eleents seperated by commas ( , )");

            string input = Console.ReadLine();

            var split = input.Split(",");
            foreach (var item in split)
            {
                numArray.Add(int.Parse(item));

            }

            Console.WriteLine("array is " + "[{0}]", string.Join(",", numArray));




        }


    }
}
