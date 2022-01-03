//Write a c# program to count the number of vowels in a given string.

using System;
namespace MyNameSpace
{
    class Program12
    {
        public static void CountVowelsInStringDriverFunction()
        {

            Console.WriteLine("Enter a string: ");
            string inputSrring = Console.ReadLine();

            var inpurArray = inputSrring.ToCharArray();
            var count = 0;

            foreach (var charecter in inpurArray)
            {
                if (charecter == 'a' || charecter == 'A' ||
                charecter == 'e' || charecter == 'E' ||
                charecter == 'i' || charecter == 'I' ||
                charecter == 'o' || charecter == 'O' ||
                charecter == 'u' || charecter == 'U')
                {
                    count += 1;
                }
            }

            Console.WriteLine("vowel count is " + count);
        }
    }
}
