//Write a c# function to retrieve all the values of an object's properties. 

using System;


namespace MyNameSpace
{
    class Program39
    {
        public static void RetriveAllPropertyValuesDriverFunction()
        {

            Student1 student = new Student1("Bhushan", "Kadu", 155);
            Console.WriteLine("All retrived values of  student Object are:");
            student.ListAllmembers();
        }
    }
    public class Student1 : Students
    {
        public Student1(string firstname, string lastName, int rollNo) : base(firstname, lastName, rollNo) { }




        public string FirstNameGet
        {
            get
            {
                return this.FirstName;
            }

        }
        public string LastNameGet
        {
            get
            {
                return this.LastName;
            }

        }
        public int RollNoGet
        {
            get
            {
                return this.RollNo;
            }

        }

        public void ListAllmembers()
        {

            var type = this.GetType();
            var properties = type.GetProperties();
            foreach (var property in properties)
            {

                Console.WriteLine(
                    property.Name + ": " +
                    type.GetProperty(property.Name).GetValue(this));


            }
        }
    }
}