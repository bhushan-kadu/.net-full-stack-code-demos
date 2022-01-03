//Write a c# program to remove duplicate items from an array

using System;
using System.Collections.Generic;

namespace MyNameSpace
{
    class Program34
    {
        public static void RemoveDuplicatesDriverFunction()
        {

            var numArray = new List<int>() { 1, 2, 2, 5, 5, 5, 5, 5, 5, 5, 8, 7, 9, 9, 5, 9, 6 };
            Console.WriteLine("array is " + "[{0}]", string.Join(",", numArray));

            var resultArray = new List<int>();

            foreach (var item in numArray)
            {
                var result = resultArray.IndexOf(item);
                if (result == -1) resultArray.Add(item);

            }

            Console.WriteLine("array after removing duplicate is:" + "[{0}]", string.Join(",", resultArray));

        }



    }
}
