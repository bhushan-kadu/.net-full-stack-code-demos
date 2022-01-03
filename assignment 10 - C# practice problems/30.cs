//Write a c# function to clone an array.
using System;
namespace MyNameSpace
{
    class Program30
    {
        public static void CloneArrayDriverFunction()
        {

            var numArray = new[] { 1, 2, 3, 4, 5 };
            var clonedArray = cloneArray(numArray);

            Console.WriteLine("old array " + numArray);
            Console.WriteLine("cloned array " + clonedArray);

        }

        static int[] cloneArray(int[] arrayParam)
        {
            return (int[])arrayParam.Clone();
        }

    }
}
