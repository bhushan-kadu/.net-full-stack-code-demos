//Write a c# function to convert a decimal number to binary, hexadecimal or octal number. 

using System;
namespace MyNameSpace
{
    class Program27
    {
        public static void decimalToBinaryHexaDecimalAndOctalDriverFunction()
        {

            Console.WriteLine("Enter a decimal Number: ");
            var inputNumber = int.Parse(Console.ReadLine());

            decimalToBinaryHexaDecimalAndOctal(inputNumber);
        }

        static void decimalToBinaryHexaDecimalAndOctal(int numberParam)
        {

            var numTemp = numberParam;
            var binaryAns = "";
            while (numTemp > 0)
            {
                binaryAns += (numTemp % 2);

                numTemp = (int)(numTemp / 2);
            }

            var binaryArray = binaryAns.ToCharArray();
            Array.Reverse(binaryArray);


            Console.WriteLine("Binary equivalant is: " + string.Join("", binaryArray));

            numTemp = numberParam;
            var octalAns = "";
            while (numTemp > 0)
            {
                octalAns += (numTemp % 8);

                numTemp = (int)(numTemp / 8);
            }

            var octalAarray = octalAns.ToCharArray();
            Array.Reverse(octalAarray);


            Console.WriteLine("octal equivalant is: " + string.Join("", octalAarray));

            numTemp = numberParam;
            var hexaAns = "";
            while (numTemp > 0)
            {
                var temp = (numTemp % 16);
                switch (temp)
                {
                    case 10:
                        hexaAns += "A";
                        break;
                    case 11:
                        hexaAns += "B";
                        break;
                    case 12:
                        hexaAns += "C";
                        break;
                    case 13:
                        hexaAns += "D";
                        break;
                    case 14:
                        hexaAns += "E";
                        break;
                    case 15:
                        hexaAns += "F";
                        break;
                    default:
                        hexaAns += temp;
                        break;
                }

                numTemp = (int)(numTemp / 16);
            }

            var hexaArray = hexaAns.ToCharArray();
            Array.Reverse(hexaArray);

            Console.WriteLine("Hexadecimal equivalant is: " + string.Join("", hexaArray));

        }

    }
}
