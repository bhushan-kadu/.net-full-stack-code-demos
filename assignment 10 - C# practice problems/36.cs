//Write a c# program to list the properties of a c# object.

using System;


namespace MyNameSpace
{
    class Program36
    {
        public static void ListObjectProperties()
        {

            Student student = new Student("Bhushan", "Kadu", 155);

            Console.WriteLine("Properties of student class object are: ");
            Console.WriteLine(nameof(student.FirstName) + $": {student.FirstName}");
            Console.WriteLine(nameof(student.LastName) + $": {student.LastName}");
            Console.WriteLine(nameof(student.RollNo) + $": {student.RollNo}");
        }
    }

    class Student
    {

        public Student(string firstname, string lastName, int rollNo)
        {
            FirstName = firstname;
            LastName = lastName;
            RollNo = rollNo;

        }
        public string FirstName;
        public string LastName;
        public int RollNo;

    }
}
