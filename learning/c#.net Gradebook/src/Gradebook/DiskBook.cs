using System;
using System.IO;

namespace Gradebook
{


    public class DiskBook : IBook
    {

        public DiskBook(string name)
        {
            Name = name;
        }
        public void AddGrade(double grade)
        {
            using(var writer = File.AppendText("GradeBook.txt")){
                writer.WriteLine(grade);
            }

            
            
        }

        public Statistics GetStatistics()
        {
            return new Statistics();
        }
        public string Name
        {
            get;
        }


    }

}