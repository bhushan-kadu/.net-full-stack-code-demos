using System;
using System.Collections.Generic;

namespace Gradebook
{
    public class Book
    {

        public Book(string name)
        {
            Name = name;
            grades = null;
        }
        public void AddGrade(double grade)
        {
            grades.Add(grade);
        }

        public double HighestGrade()
        {
            var lowGrade = double.MinValue;
            foreach (var grade in grades)
            {
                lowGrade = System.Math.Max(lowGrade, grade);
            }
            return lowGrade;
        }

        public double LowestGrade()
        {
            var lowGrade = double.MaxValue;
            foreach (var grade in grades)
            {
                lowGrade = System.Math.Min(lowGrade, grade);
            }
            return lowGrade;
        }

        public double AverageGrade()
        {
            var average = 0.0;
            foreach (var grade in grades)
            {
                average += grade;
            }
            return average /= grades.Count;
        }

        public void ShowStatistics()
        {
            Console.WriteLine($"The Highest grade is {this.HighestGrade()}");
            Console.WriteLine($"The Lowest grade is {this.LowestGrade()}");
            Console.WriteLine($"The Average grade is {this.AverageGrade()}");

        }



        List<double> grades;
        public string Name;
    }
}
