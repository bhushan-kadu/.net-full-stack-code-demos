using ContactsApp.Data.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ContactsApp.Data.Services
{
    public class CountriesFromDatabase : DatabaseConnect, ICountryData
    {
        public CountriesFromDatabase(
            string server,
            string database,
            string uid,
            string password) :
            base(server, database, uid, password)
        { }
        public IEnumerable<CountryForGrid> GetCountryListForGrid()
        {
            try
            {
                OpenConnection();
                var query = @"SELECT 
                            id, 
                            name, 
                            code, 
                            stdcode 
                            FROM country";
                var countries = new List<CountryForGrid>();
                var command = new MySqlCommand(query, Connection);
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    countries.Add(new CountryForGrid
                    {
                        CountryId = long.Parse(reader["id"].ToString()),
                        CountryName = reader["name"].ToString(),
                        CountryCode = reader["code"].ToString(),
                        STDCode = reader["stdcode"].ToString()
                    });
                }
                return countries;
            }
            catch (Exception exception)
            {
                throw exception;
            }
            finally
            {
                CloseConection();
            }
        }

        public IEnumerable<Country> GetAvailableCountryList()
        {
            try
            {
                OpenConnection();
                var query = @"SELECT 
                            id, 
                            name, 
                            code, 
                            stdcode 
                            FROM country";
                var countries = new List<Country>();
                var command = new MySqlCommand(query, Connection);
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    countries.Add(new Country
                    {
                        CountryId = long.Parse(reader["id"].ToString()),
                        CountryName = reader["name"].ToString()
                    });
                }
                return countries;
            }
            catch (Exception exception)
            {
                throw exception;
            }
            finally
            {
                CloseConection();
            }
        }

        public void AddCountry(CountryForGrid country)
        {
            try
            {
                OpenConnection();
                var query = $@"INSERT INTO country
                            (
                            name,
                            code, 
                            stdcode
                            )
                            values
                            (
                            @CountryName,
                            @CountryCode,
                            @STDCode
                            )";

                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@CountryName", country.CountryName);
                command.Parameters.AddWithValue("@CountryCode", country.CountryCode);
                command.Parameters.AddWithValue("@STDCode", country.STDCode);
                command.ExecuteNonQuery();
            }
            catch (Exception exception)
            {
                throw exception;
            }
            finally
            {
                CloseConection();
            }
        }

        public void DeleteCountry(IEnumerable<long> countryIds)
        {
            try
            {
                OpenConnection();
                string parameters = string.Join(",@Param", countryIds);
                var query = $@"DELETE 
                            FROM 
                            country 
                            WHERE 
                            id in (@Param{parameters})";

                var command = new MySqlCommand(query, Connection);
                foreach (var countryId in countryIds)
                {
                    command.Parameters.AddWithValue($"@param{countryId}", countryId);
                }

                command.ExecuteNonQuery();
            }
            catch (Exception exception)
            {
                throw exception;
            }
            finally
            {
                CloseConection();
            }
        }

        public void UpdateCountry(CountryForGrid country)
        {
            try
            {
                OpenConnection();
                var query = $@"UPDATE country SET
                            name = @CountryName,
                            code = @CountryCode, 
                            stdcode = @STDCode
                            WHERE id = @CountryId";


                var command = new MySqlCommand(query, Connection);

                command.Parameters.AddWithValue("@CountryId", country.CountryId);
                command.Parameters.AddWithValue("@CountryName", country.CountryName);
                command.Parameters.AddWithValue("@CountryCode", country.CountryCode);
                command.Parameters.AddWithValue("@STDCode", country.STDCode);


                command.ExecuteNonQuery();
            }
            catch(Exception exception)
            {
                throw exception;
            }
            finally
            {
                CloseConection();
            }
        }

        public long GetCountryIdFromName(string countryName)
        {
            try
            {
                OpenConnection();
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
            finally
            {
                CloseConection();
            }
        }


    }
}
