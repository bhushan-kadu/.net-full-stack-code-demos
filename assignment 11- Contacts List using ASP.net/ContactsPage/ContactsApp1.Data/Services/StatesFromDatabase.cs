using ContactsApp.Data.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;

namespace ContactsApp.Data.Services
{
    public class StatesFromDatabase : DatabaseConnect, IStatesData
    {
        DatabaseUtils databaseUtils;
        public StatesFromDatabase(
           string server,
           string database,
           string uid,
           string password) :
           base(server, database, uid, password)
        {
            databaseUtils = new DatabaseUtils(Connection);
        }
        public IEnumerable<StateForGrid> GetAllStates()
        {
            try
            {
                OpenConnection();
                var query = @"SELECT 
                            s.id, 
                            s.name AS stateName, 
                            s.capitalCity, 
                            s.countryId,
                            c.name AS countryName
                            FROM 
                            state s INNER JOIN country c ON s.countryId = c.id";

                var states = new List<StateForGrid>();
                var command = new MySqlCommand(query, Connection);
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    states.Add(new StateForGrid
                    {
                        StateId = long.Parse(reader["id"].ToString()),
                        StateName = reader["stateName"].ToString(),
                        CountryName = reader["countryName"].ToString(),
                        CountryId = long.Parse(reader["countryId"].ToString()),
                        StateCapital = reader["capitalCity"].ToString()
                    });
                }
                return states;
            }
            catch (MySqlException exception)
            {
                throw exception;
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

        public IEnumerable<State> GetStatesForGivenCountry(long countryId)
        {
            try
            {
                OpenConnection();

                var query = @"SELECT 
                            s.id, 
                            s.name AS stateName, 
                            s.capitalCity, 
                            s.countryId,
                            c.name AS countryName
                            FROM 
                            state s INNER JOIN country c ON s.countryId = c.id
                            where countryId = @CountryId";

                var states = new List<State>();

                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@CountryId", countryId);
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    states.Add(new State
                    {
                        StateId = long.Parse(reader["id"].ToString()),
                        StateName = reader["stateName"].ToString()
                    });
                }
                return states;
            }
            catch (MySqlException exception)
            {
                throw exception;
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
        public IEnumerable<State> GetStatesForGivenCountry(string countryName)
        {
            try
            {
                OpenConnection();

                var countryId = databaseUtils.GetCountryIdFromName(countryName);

                var query = @"SELECT 
                            s.id, 
                            s.name AS stateName, 
                            s.capitalCity, 
                            s.countryId,
                            c.name AS countryName
                            FROM 
                            state s INNER JOIN country c ON s.countryId = c.id
                            where countryId = @CountryId";

                var states = new List<State>();

                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@CountryId", countryId);
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    states.Add(new State
                    {
                        StateId = long.Parse(reader["id"].ToString()),
                        StateName = reader["stateName"].ToString()
                    });
                }
                return states;
            }
            catch (MySqlException exception)
            {
                throw exception;
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
        public void AddState(StateForGrid state)
        {
            try
            {
                OpenConnection();
                var query = @"INSERT INTO 
                        state
                        (
                        name,
                        capitalCity,
                        countryId
                        )
                        VALUES
                        (
                        @StateName,
                        @CapitalCity,
                        @CountryId
                        )";

                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@StateName", state.StateName);
                command.Parameters.AddWithValue("@CapitalCity", state.StateCapital);
                command.Parameters.AddWithValue("@CountryId", state.CountryId);

                command.ExecuteNonQuery();
            }
            catch (MySqlException exception)
            {
                throw exception;
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

        public void DeleteStates(IEnumerable<long> stateIds)
        {
            try
            {
                OpenConnection();
                string parameters = string.Join(",@Param", stateIds);
                var query = $@"DELETE 
                            FROM 
                            state 
                            WHERE 
                            id in (@Param{parameters})";

                var command = new MySqlCommand(query, Connection);
                foreach (var stateId in stateIds)
                {
                    command.Parameters.AddWithValue($"@param{stateId}", stateId);
                }

                command.ExecuteNonQuery();
            }
            catch (MySqlException exception)
            {
                throw exception;
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



        public void UpdateState(StateForGrid state)
        {
            try
            {
                OpenConnection();
                var query = $@"UPDATE state SET
                            name = @StateName,
                            capitalCity = @CapitalCity, 
                            countryId = @CountryId
                            WHERE id = @StateId";

                var command = new MySqlCommand(query, Connection);
                command.Parameters.AddWithValue("@CountryId", state.CountryId);
                command.Parameters.AddWithValue("@StateName", state.StateName);
                command.Parameters.AddWithValue("@capitalCity", state.StateCapital);
                command.Parameters.AddWithValue("@StateId", state.StateId);
                command.ExecuteNonQuery();
            }
            catch (MySqlException exception)
            {
                throw exception;
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

        public long GetStateIdFromName(string stateName)
        {
            try
            {
                OpenConnection();
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
            finally
            {
                CloseConection();
            }
        }

    }
}
