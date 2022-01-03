using System;
using System.Collections.Generic;
using System.Globalization;

namespace Gradebook
{


    class Program
    {

        static void Main(string[] args)
        {

            Console.WriteLine("Enter code");
            var input = Console.ReadLine();

            // Statistics


            Book book = new Book("chana");
            book.AddGrade(1.55);
            book.AddGrade(16.55);
            book.AddGrade(19.55);
            book.AddGrade(55.55);
            book.AddGrade(65.36);

            book.ShowStatistics();
        }
    }


}
