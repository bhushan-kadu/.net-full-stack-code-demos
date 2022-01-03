using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactsApp.Data.Services
{
    public class DatabaseUtils
    {
        private readonly MySqlConnection Connection;

        public DatabaseUtils(MySqlConnection connection)
        {
            this.Connection = connection;
        }

        public long GetStateIdFromName(string stateName)
        {
            try
            {
                var query = @"SELECT id
                        FROM state 
                        WHERE name = @StateName";

                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@StateName", stateName);
                var stateId = long.Parse(command.ExecuteScalar().ToString());

                return stateId;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public long GetCountryIdFromName(string countryName)
        {
            try
            {
                var query = @"SELECT id
                        FROM country 
                        WHERE name = @CountryName";

                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@CountryName", countryName);
                var countryId = long.Parse(command.ExecuteScalar().ToString());

                return countryId;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
