using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactsApp.Data.Services
{
    public class DatabaseConnect
    {
        public MySqlConnection Connection;
        

        public DatabaseConnect(string server, string database, string uid, string password)
        {
            var connectionString = $"SERVER={server}; DATABASE=" +
               $"{database}; UID={uid}; PASSWORD={password};";
            Initialize(connectionString);
        }

        private void Initialize(string connectionString)
        {
            Connection = new MySqlConnection(connectionString);
        }

        //open database connection
        public void OpenConnection()
        {
            try
            {
                Connection.Open();
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        public void CloseConection()
        {
            try
            {
                Connection.Close();
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }
    }
}
