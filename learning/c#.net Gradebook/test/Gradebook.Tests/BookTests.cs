using System;
using Xunit;
using Gradebook;

namespace test
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {

            var input = Console.ReadLine();

            Book b1 = new Book("Book 1");

            GetBookSetName(ref b1, "new name");

            Assert.Equal("new name", b1.Name);
        }

        private void GetBookSetName(ref Book b1, string name)
        {
            b1 = new Book(name);
        }

        void setName(Book book, string name, int a)
        {
            book.Name = name;
        }
    }
}
