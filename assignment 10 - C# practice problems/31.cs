//Write a C# function to get the first element of an array. Passing a parameter 'n'    
//  will return the first 'n' elements of the array

using System;
namespace MyNameSpace
{
    class Program31
    {
        public static void firstNElementsOfArrayDriverFunction()
        {

            var numArray = new[] { 1, 2, 3, 4, 5 };
            Console.WriteLine("array is " + "[{0}]" +
               "\nenter number to get first n elements", string.Join(",", numArray));

            var firstNNumberInput = int.Parse(Console.ReadLine());

            var result = new int[firstNNumberInput];
            for (int i = 0; i < firstNNumberInput; i++)
            {
                result[i] = numArray[i];
            }

            Console.WriteLine($"First {firstNNumberInput} items of array " + "[{0}]", string.Join(",", result));



        }


    }
}
