//Write a c# program to check whether a given 
//string contains equal number of p's and t's.
using System;
namespace MyNameSpace
{
    class Program13
    {
        public static void CheckIFStringContainsEqualPAndTDriverFunction()
        {

            Console.WriteLine("Enter a string: ");
            string inputSrring = Console.ReadLine();

            var inpurArray = inputSrring.ToCharArray();
            var pCount = 0;
            var tCount = 0;

            foreach (var charecter in inpurArray)
            {
                if (charecter == 'p' || charecter == 'P')
                {
                    pCount += 1;
                }
                else if (charecter == 't' || charecter == 'T')
                {
                    tCount += 1;
                }
            }

            if (pCount == tCount)
            {
                Console.WriteLine("p and t count is equal");
            }
            else
            {
                Console.WriteLine("p and t count is not equal");
            }

        }
    }
}
