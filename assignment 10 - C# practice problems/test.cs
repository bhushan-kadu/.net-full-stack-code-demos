


//Write a c# function to retrieve all the values of an object's properties. 

using System;
using System.Globalization;

namespace MyNameSpace
{
    class test
    {
        public static void RetriveAllPropertyValuesDriverFunction()
        {
            var value1 = Console.ReadLine();
            var value2 = Console.ReadLine();
            Console.WriteLine(string.Compare(value1, value2, true));
        }

        static bool isValidDate(string date)
        {
            try
            {
                var dob = DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        static bool isUnderAge18(string date)
        {

            if (isValidDate(date))
            {
                var dob = DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                var back18years = DateTime.Now.AddYears(-18);
                if (dob > back18years)
                {
                    return true;
                }
            }
            return false;
        }
    }

}

