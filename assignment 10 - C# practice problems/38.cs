//Write a c# program to list the properties of a c# object.

using System;


namespace MyNameSpace
{
    class Program38
    {
        public static void ContainsPropertyDriverFunction()
        {

            Students student = new Students("Bhushan", "Kadu", 155);

            Console.WriteLine("Enter property name to check: ");
            string propertyName = Console.ReadLine();

            if (HasProperty(student, propertyName))
            {
                Console.WriteLine("Entered Property is Found!");
            }
            else
            {
                Console.WriteLine("Entered Property is not Found!");

            }

        }

        static bool HasProperty(object objectToCheck, string propertyName)
        {
            var type = objectToCheck.GetType();
            return type.GetMethod(propertyName) != null ||
            type.GetMember(propertyName).Length != 0;
        }
    }


    public class Students
    {

        public Students(string firstname, string lastName, int rollNo)
        {
            FirstName = firstname;
            LastName = lastName;
            RollNo = rollNo;

        }

        public string getName()
        {
            return FirstName + LastName;
        }
        public string FirstName;
        public string LastName;
        public int RollNo;

    }
}
