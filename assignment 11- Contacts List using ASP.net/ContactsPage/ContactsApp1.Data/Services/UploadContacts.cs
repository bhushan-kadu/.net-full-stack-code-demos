using ContactsApp.Data.Models;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace ContactsApp.Data.Services
{
    public class UploadContacts
    {
        private readonly ICountryData DbCountryService;
        private readonly IStatesData DbStateService;
        private readonly IContactData DbContactService;

        public UploadContacts(ICountryData dbCountryService,
            IStatesData dbStateService,
            IContactData dbContactService)
        {
            DbCountryService = dbCountryService;
            DbStateService = dbStateService;
            DbContactService = dbContactService;
        }

        public MemoryStream CreateExcelSheet()
        {

            SpreadsheetDocument spreadsheetDocument;
            var memorystream = new MemoryStream();

            using (spreadsheetDocument = SpreadsheetDocument.Create(memorystream,
            SpreadsheetDocumentType.Workbook))
            {
                //create workbook part
                var workbookPart = spreadsheetDocument.AddWorkbookPart();
                workbookPart.Workbook = new Workbook();


                //create worksheet part
                var worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                var sheetData = new SheetData();

                //Initialize worksheet
                worksheetPart.Worksheet = new Worksheet(sheetData);

                //insert sheets object in workbook
                var sheets = spreadsheetDocument.WorkbookPart.Workbook.AppendChild<Sheets>(new Sheets());

                //create a sheet and connect to worksheet part
                var sheet = new Sheet()
                {
                    Id = spreadsheetDocument.WorkbookPart.GetIdOfPart(worksheetPart),
                    SheetId = 1,
                    Name = "UploadContat"
                };

                //create a row
                var row = new Row()
                {
                    RowIndex = 1
                };

                //create all header cells and append to row
                var header1 = CreateCellWithReference("FirstName", "A1");
                row.Append(header1);

                var header2 = CreateCellWithReference("LastName", "B1");
                row.Append(header2);

                var header3 = CreateCellWithReference("DateOfBirth", "C1");
                row.Append(header3);

                var header4 = CreateCellWithReference("CountryName", "D1");
                row.Append(header4);

                var header5 = CreateCellWithReference("StateName", "E1");
                row.Append(header5);

                var header6 = CreateCellWithReference("EmailId", "F1");
                row.Append(header6);

                var header7 = CreateCellWithReference("PhoneNumber", "G1");
                row.Append(header7);

                //append row to shhetdata
                sheetData.Append(row);

                //append sheet to sheets object
                sheets.Append(sheet);

                //save and close the document
                workbookPart.Workbook.Save();
                spreadsheetDocument.Close();
            }
            return memorystream;

        }

        Cell CreateCellWithReference(string text, string reference)
        {

            var cell = new Cell
            {
                CellValue = new CellValue(text),
                DataType = CellValues.String,
                CellReference = reference
            };
            return cell;
        }

        public void ValidateExcelSheetAndUploadValidContacts(SpreadsheetDocument spreadsheetDocument)
        {
            var workBookPart = spreadsheetDocument.WorkbookPart;
            var sharedStringTablePart = workBookPart.GetPartsOfType<SharedStringTablePart>().FirstOrDefault();
            var sharedStringTable = sharedStringTablePart.SharedStringTable;
            var workSheetPart = workBookPart.WorksheetParts.First();
            var worksheet = workSheetPart.Worksheet;

            var sheetData = worksheet.GetFirstChild<SheetData>();
            var rows = sheetData.Elements<Row>();

            var headRow = rows.First();
            var text = "";
            try
            {
                /*** start of head row validattion ****/
                var cells = headRow.Elements<Cell>();
                if (cells.Count() < 7)
                {
                    throw new Exception();
                }
                foreach (var cell in cells)
                {
                    var cellReference = cell.CellReference.Value;

                    switch (cellReference)
                    {
                        case "A1":
                            text = GetTextFromCell(cell, sharedStringTable);
                            if (text.ToLower() != "firstname") throw new Exception();
                            break;
                        case "B1":
                            text = GetTextFromCell(cell, sharedStringTable);
                            if (text.ToLower() != "lastname") throw new Exception();
                            break;
                        case "C1":
                            text = GetTextFromCell(cell, sharedStringTable);
                            if (text.ToLower() != "dateofbirth") throw new Exception();
                            break;
                        case "D1":
                            text = GetTextFromCell(cell, sharedStringTable);
                            if (text.ToLower() != "countryname") throw new Exception();
                            break;
                        case "E1":
                            text = GetTextFromCell(cell, sharedStringTable);
                            if (text.ToLower() != "statename") throw new Exception();
                            break;
                        case "F1":
                            text = GetTextFromCell(cell, sharedStringTable);
                            if (text.ToLower() != "emailid") throw new Exception();
                            break;
                        case "G1":
                            text = GetTextFromCell(cell, sharedStringTable);
                            if (text.ToLower() != "phonenumber") throw new Exception();
                            break;
                    }
                }
            }
            catch (Exception)
            {
                throw new Exception("Please select a sheet same as sample sheet");
            }
            /*** end of head row validattion ****/

            /*** add required cell headers to sheet****/
            var newHeadCell = CreateCell("Upload Ind", sharedStringTablePart);
            headRow.AppendChild<Cell>(newHeadCell);

            newHeadCell = CreateCell("Upload Status", sharedStringTablePart);
            headRow.AppendChild<Cell>(newHeadCell);

            //loop through each row 
            for (var rowNumber = 1; rowNumber < rows.Count(); rowNumber++)
            {

                var row = rows.ElementAt(rowNumber);
                var cells = row.Elements<Cell>();

                //check for empty row if yes break
                if (cells.Count() == 1 && cells.First().InnerText == "")
                {
                    break;
                }

                var contact = new Contact();
                foreach (var cell in cells)
                {
                    var cellReference = cell.CellReference.Value;
                    cellReference = cellReference.Split((rowNumber+1).ToString().ToCharArray())[0];

                    switch (cellReference)
                    {
                        case "A":
                            contact.FirstName = GetTextFromCell(cell, sharedStringTable);
                            break;

                        case "B":
                            contact.LastName = GetTextFromCell(cell, sharedStringTable);
                            break;

                        case "C":
                            var cellText = GetTextFromCell(cell, sharedStringTable);
                            contact.DOB = getDateFromString(cellText);
                            break;

                        case "D":
                            contact.Country = GetTextFromCell(cell, sharedStringTable);
                            break;

                        case "E":
                            contact.State = GetTextFromCell(cell, sharedStringTable);
                            break;

                        case "F":
                            contact.EmailId = GetTextFromCell(cell, sharedStringTable);
                            break;

                        case "G":
                            contact.Phone = GetTextFromCell(cell, sharedStringTable);
                            break;
                    }
                }
                var errorList = ValidateContact(contact);
                if (errorList.Count > 0)
                {
                    InsertCellInSheetWithValueAndReference("N", "H", rowNumber + 1, workSheetPart, sharedStringTablePart);
                    var errorString = string.Join(", ", errorList);
                    InsertCellInSheetWithValueAndReference(errorString, "I", rowNumber + 1, workSheetPart, sharedStringTablePart);
                }
                else
                {
                    InsertCellInSheetWithValueAndReference("Y", "H", rowNumber + 1, workSheetPart, sharedStringTablePart);
                    InsertCellInSheetWithValueAndReference("Contact Uploaded Successfully!", "I", rowNumber + 1, workSheetPart, sharedStringTablePart);
                    AddContact(contact);
                }
            }
            workSheetPart.Worksheet.Save();
            spreadsheetDocument.Close();
        }

        List<string> ValidateContact(Contact contact)
        {
            var errors = new List<string>();
            var type = contact.GetType(); 
            var properties = type.GetProperties();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(contact);
                var error = "";
                
                if (propertyName == "State")
                {
                    error = ValidateStateColumn(propertyValue, contact.Country);
                }
                else
                {
                    error = ValidateColumnValue(propertyName, propertyValue);
                }
                if (error != "")
                {
                    errors.Add(error);
                }
            }

            return errors;
        }
        void InsertCellInSheetWithValueAndReference(string text, string columnName, long rowNumber, WorksheetPart workSheetPart, SharedStringTablePart sharedStringTablePart)
        {
            var newCell = InsertCellInWorksheet(columnName, rowNumber, workSheetPart);
            var insertedTextid = InsertTextInSharedStringTable(text, sharedStringTablePart);
            newCell.CellValue = new CellValue(insertedTextid.ToString());
            newCell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            workSheetPart.Worksheet.Save();
        }
        string GetTextFromCell(Cell cell, SharedStringTable sharedStringTable)
        {
            if (cell != null)
            {
                try
                {
                    if (cell.DataType == CellValues.SharedString)
                    {
                        return sharedStringTable.ElementAt(int.Parse(cell.InnerText)).InnerText;
                    }
                    else
                    {

                    }
                    return cell.InnerText;
                }
                catch (Exception)
                {
                    return cell.InnerText;
                }
            }
            return "";
        }
        public void AddContact(Contact contact)
        {
            try
            {
                contact.CountryId = DbCountryService.GetCountryIdFromName(contact.Country);
                if (contact.State != null)
                {
                    contact.StateId = DbStateService.GetStateIdFromName(contact.State);
                }
                DbContactService.AddContact(contact);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        Cell CreateCell(string text, SharedStringTablePart sharedStringTablePart)
        {

            var textid = InsertTextInSharedStringTable(text, sharedStringTablePart);
            var cell = new Cell
            {
                CellValue = new CellValue(textid.ToString()),
                DataType = new EnumValue<CellValues>(CellValues.SharedString)
            };
            return cell;
        }
        long InsertTextInSharedStringTable(string text, SharedStringTablePart sharedStringTablePart)
        {
            var sharedStringTable = sharedStringTablePart.SharedStringTable;
            if (sharedStringTable == null)
            {
                sharedStringTable = new SharedStringTable();
            }

            var i = 0;
            foreach (var sharedStringItem in sharedStringTable.Elements<SharedStringItem>())
            {
                if (sharedStringItem.InnerText == text)
                {
                    return i;
                }
                i++;
            }

            sharedStringTable.AppendChild(new SharedStringItem(new Text(text)));
            return i;
        }
        string ValidateDateColumn(string stringDate)
        {
            DateTime dob;
            try
            {
                var date = long.Parse(stringDate);
                dob = getDateFromLong(date);
                if (isUnderAge18(dob))
                {
                    return "Age must be greater than 18 years";
                }
            }
            catch (Exception)
            {
                return "Date of birth is not in proper format";
            }

            return "";
        }
        string ValidateStateColumn(object valueObj, string country)
        {
            var value = "";
            if (valueObj != null) value = valueObj.ToString();
            if (country == null)
            {
                return "Please enter country before state";
            }
            if (value.Trim() == "") return "";
            if (!isValidState(value, country))
            {
                return "State Name is invalid";
            }
            return "";
        }
        string ValidateColumnValue(string columnName, object valueObject)
        {
            var value = "";
            if (valueObject != null) value = valueObject.ToString();
            else return $"{columnName} cannot be empty";
            switch (columnName)
            {
                case var name when name == "FirstName" || name == "LastName":
                    if (value == "") return $"{name} Cannot be Empty";
                    if (value.Length > 15)
                    {
                        return $"{name} Cannot be Greater than 15 charecters";
                    }
                    return "";

                case "Dob":
                    if (value.Trim() == "") return "DOB Id Cannot be Empty";
                    return ValidateDateColumn(value);

                case "Country":
                    if (value.Trim() == "") return "Country name Cannot be Empty";
                    if (!isValidCountry(value))
                    {
                        return "Country Name is invalid";
                    };
                    return "";

                case "EmailId":
                    if (value.Trim() == "") return "Email Id Cannot be Empty";
                    if (!IsValidEmail(value))
                    {
                        return "Email is not valid";
                    }
                    else
                    {
                        if (!isEmailUnique(value))
                        {
                            return "Email is already used";
                        }
                    }
                    return "";

                case "Phone":
                    if (value.Trim() == "") return "Phone Cannot be Empty";
                    if (!isValidPhone(value))
                    {
                        return "Phone number is not valid";
                    }
                    else
                    {
                        if (!isPhoneUnique(value))
                        {
                            return "Phone is already used";
                        }
                    }
                    return "";

                default:
                    return "";
            }
        }
        DateTime getDateFromLong(long date)
        {
            try
            {
                return DateTime.FromOADate(date);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        DateTime getDateFromString(string date)
        {
            try
            {
                return getDateFromLong(long.Parse(date));
            }
            catch (Exception)
            {
                return default(DateTime);
            }
        }
        bool isUnderAge18(DateTime date)
        {
            var back18years = DateTime.Now.AddYears(-18);
            if (date > back18years)
            {
                return true;
            }
            return false;
        }
        bool isValidCountry(string country)
        {
            try
            {
                var countries = (List<Country>)DbCountryService.GetAvailableCountryList();
                if (countries.FindIndex(x => x.CountryName == country) == -1)
                {
                    return false;
                };
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        bool isValidState(string state, string country)
        {
            try
            {
                var countryId = DbCountryService.GetCountryIdFromName(country);
                var states = (List<State>)DbStateService.GetStatesForGivenCountry(countryId);
                if (states.FindIndex(x => x.StateName == state) == -1)
                {
                    return false;
                };
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        bool isValidPhone(string number)
        {
            try
            {
                var parsedNumber = long.Parse(number);
                return (parsedNumber.ToString().Length == 10);
            }
            catch (Exception)
            {
                return false;
            }
        }
        bool isPhoneUnique(string phone)
        {
            try
            {
                return DbContactService.isPhoneUnique(phone);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        bool IsValidEmail(string email)
        {
            try
            {
                var emailAddress = new System.Net.Mail.MailAddress(email);
                return emailAddress.Address == email;
            }
            catch (Exception)
            {
                return false;
            }
        }
        bool isEmailUnique(string email)
        {
            try
            {
                return DbContactService.isEmailUnique(email);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        //old while loop openxml reader methods
        public List<string> ReadExcelSheetAndValidate(SpreadsheetDocument spreadsheetDocument)
        {
            var workBookPart = spreadsheetDocument.WorkbookPart;
            var sharedStringTablePart = workBookPart.GetPartsOfType<SharedStringTablePart>().FirstOrDefault();
            var sharedStringTable = sharedStringTablePart.SharedStringTable;

            var rowNumber = -1;
            var columnNumber = -1;
            var errorList = new List<string>();

            //for each workeetpart in worksheetParts
            foreach (var workSheetPart in workBookPart.WorksheetParts)
            {
                var reader = OpenXmlReader.Create(workSheetPart);
                while (reader.Read())
                {
                    if (reader.ElementType == typeof(CellValue))
                    {
                        columnNumber++;
                        if (columnNumber == 7)
                        {
                            if (rowNumber > -1 && errorList.Count > 0)
                            {
                                InsertCellInSheetWithValueAndReference("N",
                                    "H",
                                    rowNumber + 2,
                                    workSheetPart,
                                    sharedStringTablePart);
                                var errorString = string.Join(", ", errorList);
                                InsertCellInSheetWithValueAndReference(errorString,
                                   "I",
                                   rowNumber + 2,
                                   workSheetPart,
                                   sharedStringTablePart);
                            }
                            else if (rowNumber > -1)
                            {
                                InsertCellInSheetWithValueAndReference("Y",
                                    "H",
                                    rowNumber + 2,
                                    workSheetPart,
                                    sharedStringTablePart);
                            }
                            columnNumber = 0;
                            rowNumber++;
                            errorList = new List<string>();
                        }
                        if (rowNumber >= 0)
                        {
                            var cellText = "";
                            var errorMessage = "";
                            try
                            {
                                cellText = sharedStringTable.ElementAt(int.Parse(reader.GetText())).InnerText;
                            }
                            catch (Exception)
                            {
                                cellText = reader.GetText();
                            }

                            switch (columnNumber)
                            {
                                case 0:
                                    errorMessage = ValidateColumnValue("firstName", cellText);
                                    break;

                                case 1:
                                    errorMessage = ValidateColumnValue("lastName", cellText);
                                    break;

                                case 2:
                                    var dob = long.Parse(cellText);
                                    errorMessage = ValidateDateColumn(cellText);
                                    break;

                                case 3:
                                    errorMessage = ValidateColumnValue("country", cellText);
                                    break;

                                case 4:
                                    errorMessage = ValidateColumnValue("state", cellText);
                                    break;

                                case 5:
                                    errorMessage = ValidateColumnValue("emailId", cellText);
                                    break;

                                case 6:
                                    errorMessage = ValidateColumnValue("phone", cellText);
                                    break;
                            }

                            if (errorMessage.Trim() != "")
                            {
                                errorList.Add(errorMessage);
                            }
                        }
                    }
                }
            }
            return errorList;
        }
        Cell InsertCellInWorksheet(string columnName, long rowIndex, WorksheetPart worksheetPart)
        {

            var worksheet = worksheetPart.Worksheet;
            var sheetData = worksheet.GetFirstChild<SheetData>();
            var cellReference = columnName + rowIndex;

            var row = sheetData.Elements<Row>().Where(x => x.RowIndex == rowIndex).First();
            if (row.Elements<Cell>().Where(x => x.CellReference.Value == cellReference).Count() != 0)
            {
                return row.Elements<Cell>().Where(x => x.CellReference.Value == cellReference).First();
            }
            else
            {
                Cell refCell = null;
                foreach (var cell in row.Elements<Cell>())
                {
                    if (cell.CellReference.Value.Length == cellReference.Length)
                    {
                        if (string.Compare(cell.CellReference, cellReference) > 0)
                        {
                            refCell = cell;
                            break;
                        }
                    }
                }

                var newCell = new Cell() { CellReference = cellReference };
                row.InsertBefore(newCell, refCell);

                worksheet.Save();
                return newCell;
            }

        }
    }
}

