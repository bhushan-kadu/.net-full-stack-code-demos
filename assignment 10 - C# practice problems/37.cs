//Write a Bubble Sort algorithm in c#. 

using System;
using System.Collections.Generic;

namespace MyNameSpace
{
    class Program37
    {
        public static void BubbleSortDriverFunction()
        {

            Console.WriteLine("Enter array item seperated by comma ( , ): ");
            var input = Console.ReadLine();
            var charArray = input.Split(",");
            var intputList = new List<int>();
            foreach (var item in charArray)
            {
                intputList.Add(int.Parse(item.ToString()));
            }
            bubbleSort(intputList);
            Console.WriteLine("Bubble Sort is: [{0}]", string.Join(",", bubbleSort(intputList)));


        }

        static List<int> bubbleSort(List<int> arrayParam)
        {
            var temp = 0;
            var length = arrayParam.Count;

            for (var i = 0; i < length; i++)
            {
                for (var j = 0; j < (length - i - 1); j++)
                {

                    if (arrayParam[j] > arrayParam[j + 1])
                    {
                        temp = arrayParam[j];
                        arrayParam[j] = arrayParam[j + 1];
                        arrayParam[j + 1] = temp;
                    }
                }
            }
            return arrayParam;
        }
    }

}
