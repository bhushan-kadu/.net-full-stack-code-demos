//Write a c# program to compute the union of two arrays. 

using System;
using System.Collections.Generic;
using System.Linq;

namespace MyNameSpace
{
    class Program35
    {
        public static void ArayUnionDriverFunction()
        {

            var numArray1 = new List<int>() { 1, 2, 2, 5, 5, 5, 5, 5, 5, 5, 8, 7, 9, 9, 5, 9, 6 };
            var numArray2 = new List<int>() { 1, 2, 3, 4, 5 };
            Console.WriteLine("arrays are 1: [{0}] 2: [{1}]", string.Join(",", numArray1), string.Join(",", numArray2));

            var resultArray = arrayUnion(numArray1, numArray2);
            Console.WriteLine("Array Union is: [{0}]", string.Join(",", resultArray));


        }

        static List<int> arrayUnion(List<int> arrayParam1, List<int> arrayParam2)
        {

            var array = arrayParam1.Concat(arrayParam2).ToList();

            var uniqueArray = new List<int>();
            foreach (var item in array)
            {

                var itemFound = uniqueArray.IndexOf(item);

                if (itemFound == -1)
                {
                    uniqueArray.Add(item);
                }

            }

            return uniqueArray;
        }


    }
}
