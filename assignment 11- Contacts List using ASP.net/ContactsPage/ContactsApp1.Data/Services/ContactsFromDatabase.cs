using ContactsApp.Data.Models;
using ContactsProject.Api.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;

namespace ContactsApp.Data.Services
{
    public class ContactsFromDatabase : DatabaseConnect, IContactData
    {
        DatabaseUtils databaseUtils;
        public ContactsFromDatabase(
            string server,
            string database,
            string uid,
            string password) :
            base(server, database, uid, password)
        {
            databaseUtils = new DatabaseUtils(Connection);
        }

        public void AddContact(Contact contact)
        {
            try
            {
                OpenConnection();
                if (contact.CountryId == 0)
                {
                    contact.CountryId = databaseUtils.GetCountryIdFromName(contact.Country);
                }
                if (contact.StateId == 0)
                {
                    contact.StateId = databaseUtils.GetStateIdFromName(contact.State);
                }

                var query = $@"INSERT INTO contact
                            (
                            firstName, 
                            lastName,
                            dob, 
                            countryId,
                            stateId,
                            emailId,
                            phone 
                            )
                            values
                            (
                            @FirstName,
                            @LastName,
                            @DOB,
                            @CountryId,
                            @StateId,
                            @EmailId,
                            @Phone
                            )";

                var command = new MySqlCommand(query, Connection);

                command.Parameters.AddWithValue("@FirstName", contact.FirstName);
                command.Parameters.AddWithValue("@LastName", contact.LastName);
                command.Parameters.AddWithValue("@DOB", contact.DOB);
                command.Parameters.AddWithValue("@CountryId", contact.CountryId);
                if (contact.StateId != 0)
                {
                    command.Parameters.AddWithValue("@StateId", contact.StateId);
                }
                else
                {
                    command.Parameters.AddWithValue("@StateId", null);
                }
                command.Parameters.AddWithValue("@EmailId", contact.EmailId);
                command.Parameters.AddWithValue("@Phone", contact.Phone);

                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConection();
            }

        }

        public IEnumerable<Contact> GetAllContacts()
        {
            try
            {
                var query = @"SELECT 
                            con.id,
                            con.firstName,
                            con.lastName,
                            con.dob,
                            c.name AS country,
                            con.countryId,
                            s.name AS state,
                            con.stateId,
                            con.emailId,
                            con.phone
                            FROM 
                            contact con INNER JOIN country c ON con.countryId = c.id
                            LEFT JOIN state s ON con.stateId = s.id order by con.id asc";

                var contacts = new List<Contact>();
                OpenConnection();
                var command = new MySqlCommand(query, Connection);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    contacts.Add(new Contact
                    {
                        ContactId = long.Parse(reader["id"].ToString()),
                        FirstName = reader["firstName"].ToString(),
                        LastName = reader["lastName"].ToString(),
                        DOB = DateTime.Parse(reader["dob"].ToString()),
                        Country = reader["country"].ToString(),
                        CountryId = long.Parse(reader["countryId"].ToString()),
                        State = reader["state"].ToString(),
                        StateId = reader["stateId"].ToString() != "" ? long.Parse(reader["stateId"].ToString()) : 0,
                        EmailId = reader["emailId"].ToString(),
                        Phone = reader["phone"].ToString()
                    });
                }
                return contacts;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConection();
            }

        }



        public void UpdateContact(Contact contact)
        {
            try
            {
                OpenConnection();
                if (contact.CountryId == 0)
                {
                    contact.CountryId = databaseUtils.GetCountryIdFromName(contact.Country);
                }
                if (contact.StateId == 0)
                {
                    contact.StateId = databaseUtils.GetStateIdFromName(contact.State);
                }
                var query = $@"UPDATE contact SET
                            firstName = @FirstName,
                            lastName = @LastName, 
                            dob = @DOB, 
                            countryId = @CountryId,
                            stateId = @StateId, 
                            emailId = @EmailId, 
                            phone = @Phone 
                            WHERE id = @ContactId";


                var command = new MySqlCommand(query, Connection);

                command.Parameters.AddWithValue("@ContactId", contact.ContactId);
                command.Parameters.AddWithValue("@FirstName", contact.FirstName);
                command.Parameters.AddWithValue("@LastName", contact.LastName);
                command.Parameters.AddWithValue("@DOB", contact.DOB);
                command.Parameters.AddWithValue("@CountryId", contact.CountryId);
                if (contact.StateId != 0)
                {
                    command.Parameters.AddWithValue("@StateId", contact.StateId);
                }
                else
                {
                    command.Parameters.AddWithValue("@StateId", null);
                }
                command.Parameters.AddWithValue("@EmailId", contact.EmailId);
                command.Parameters.AddWithValue("@Phone", contact.Phone);

                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConection();
            }
        }

        public void RemoveContact(IEnumerable<long> contactIds)
        {

            try
            {
                OpenConnection();
                string parameters = string.Join(",@Param", contactIds);
                var query = $@"DELETE 
                            FROM 
                            contact 
                            WHERE 
                            id in (@Param{parameters})";

                var command = new MySqlCommand(query, Connection);
                foreach (var contactId in contactIds)
                {
                    command.Parameters.AddWithValue($"@param{contactId}", contactId);
                }

                command.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConection();
            }
        }

        public bool isEmailUnique(string email)
        {
            try
            {
                var query = @"SELECT 
                            COUNT(emailId)
                            FROM contact
                            WHERE emailId = @EmailId";

                var contacts = new List<Contact>();
                OpenConnection();
                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@EmailId", email);
                var emailCount = int.Parse(command.ExecuteScalar().ToString());

                return emailCount == 0;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConection();
            }
        }

        public bool isPhoneUnique(string phone)
        {
            try
            {
                var query = @"SELECT 
                            COUNT(phone)
                            FROM contact
                            WHERE phone = @Phone";

                var contacts = new List<Contact>();
                OpenConnection();
                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@Phone", phone);
                var phoneCount = int.Parse(command.ExecuteScalar().ToString());

                return phoneCount == 0;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConection();
            }
        }

        public long GetLastInsertedContactId()
        {
            try
            {
                OpenConnection();
                var query = "SELECT Max(c.id) FROM contact c";
                var command = new MySqlCommand(query, Connection);

                var lastInsertedContactId = long.Parse(command.ExecuteScalar().ToString());
                return lastInsertedContactId;
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
            finally
            {
                CloseConection();
            }
        }

        Contact getContact(long id)
        {
            try
            {
                OpenConnection();
                var query = $"SELECT * FROM contact c WHERE id={id}";
                var command = new MySqlCommand(query, Connection);
                var reader = command.ExecuteReader();
                return GetContactFromReader(reader);
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
            finally
            {
                CloseConection();
            }

        }
        Contact GetContactFromReader(MySqlDataReader reader)
        {
            Contact temp = new Contact();
            while (reader.Read())
            {
                temp = new Contact
                {
                    ContactId = long.Parse(reader["id"] + ""),
                    FirstName = reader["firstName"].ToString(),
                    LastName = reader["lastName"].ToString(),
                    DOB = DateTime.Parse(reader["dob"] + ""),
                    Country = reader["country"].ToString(),
                    State = reader["state"].ToString(),
                    EmailId = reader["emailId"].ToString(),
                    Phone = reader["phone"].ToString()
                };
            }

            return temp;

        }
        private string GetOrderByClause(string selector, bool desc)
        {
            string sql = $@" order by {selector} " + ((desc) ? "Desc " : "Asc ");
            return sql;

        }
        /*select in range from row number 20 to row number 45 in sql server
         * 
         * SELECT *
            FROM tbl
            ORDER BY name
            OFFSET 20 ROWS 
            FETCH NEXT 25 ROWS ONLY 
         */


        public object GetContacts(Request request)
        {
            try
            {
                var query = $@"SELECT 
                            con.id,
                            con.firstName,
                            con.lastName,
                            con.dob,
                            c.name AS country,
                            con.countryId,
                            s.name AS state,
                            con.stateId,
                            con.emailId,
                            con.phone
                            FROM 
                            contact con INNER JOIN country c ON con.countryId = c.id
                            LEFT JOIN state s ON con.stateId = s.id ";
                if (request.Sort != null)
                {
                    JavaScriptSerializer json_serializer = new JavaScriptSerializer();
                    IEnumerable<object> sort =
                    (IEnumerable<object>)json_serializer.DeserializeObject(request.Sort.First().ToString());
                    query += GetOrderByClause((string)((Dictionary<string, object>)sort.First())["selector"], (bool)((Dictionary<string, object>)sort.First())["desc"]);

                }

                query += "LIMIT @skip, @take";

                var contacts = new List<Contact>();
                OpenConnection();
                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@skip", request.Skip);
                command.Parameters.AddWithValue("@take", request.Take);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    contacts.Add(new Contact
                    {
                        ContactId = long.Parse(reader["id"].ToString()),
                        FirstName = reader["firstName"].ToString(),
                        LastName = reader["lastName"].ToString(),
                        DOB = DateTime.Parse(reader["dob"].ToString()),
                        Country = reader["country"].ToString(),
                        CountryId = long.Parse(reader["countryId"].ToString()),
                        State = reader["state"].ToString(),
                        StateId = reader["stateId"].ToString() != "" ? long.Parse(reader["stateId"].ToString()) : 0,
                        EmailId = reader["emailId"].ToString(),
                        Phone = reader["phone"].ToString()
                    });
                }
                CloseConection();
                return new { data = contacts, totalCount = GetAllContacts().Count() };
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConection();
            }
        }
    }
}
