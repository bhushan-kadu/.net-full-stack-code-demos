using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace OdeToFood.Web.Database
{
    public class DbConnect
    {
        MySqlConnection connection;
        string server;
        string database;
        string uid;
        string password;
        
        public DbConnect()
        {
            Initialize();
        }

        private void Initialize()
        {
            server = "localhost";
            database = "connectcsharptomysql";
            uid = "root";
            password = "admin";
            var connectionString = $"SERVER={server}; DATABASE=" +
                $"{database}; UID={uid}; PASSWORD={password};";

            connection = new MySqlConnection(connectionString);
        }

        //open database connection
        bool openConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch(MySqlException ex)
            {
                return false;

            }
        }

        bool closeConection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch(MySqlException e)
            {
                return false;
            }
        }

        //Insert statement
        public void Insert()
        {
            string query = "INSERT INTO tableinfo (name, age) VALUES('John Smith', '33')";

            //open connection
            if (this.openConnection() == true)
            {
                //create command and assign the query and connection from the constructor
                MySqlCommand cmd = new MySqlCommand(query, connection);

                //Execute command
                cmd.ExecuteNonQuery();

                //close connection
                this.closeConection();
            }
        }

        public void Update()
        {
            string query = "UPDATE tableinfo SET name='Joe', age='22' WHERE name='John Smith'";

            //Open connection
            if (this.openConnection() == true)
            {
                //create mysql command
                MySqlCommand cmd = new MySqlCommand();
                //Assign the query using CommandText
                cmd.CommandText = query;
                //Assign the connection using Connection
                cmd.Connection = connection;

                //Execute query
                cmd.ExecuteNonQuery();

                //close connection
                this.closeConection();
            }
        }


        //Delete statement
        public void Delete()
        {
            string query = "DELETE FROM tableinfo WHERE name='John Smith'";

            if (this.openConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, connection);
                cmd.ExecuteNonQuery();
                this.closeConection();
            }
        }

        public List<String>[] Select()
        {
            string query = "SELECT * FROM tableinfo";

            List<String>[] colums = new List<string>[3];

            colums[0] = new List<string>();
            colums[1] = new List<string>();
            colums[2] = new List<string>();
            
            if(this.openConnection() == true)
            {
                MySqlCommand command = new MySqlCommand(query, connection);
                var reader = command.ExecuteReader();

                while (reader.Read())
                {
                    colums[0].Add(reader["id"].ToString());
                    colums[1].Add(reader["name"].ToString());
                    colums[2].Add(reader["age"].ToString());
                }

                reader.Close();

                this.closeConection();

                return colums;

            }
            else
            {
                return colums;
            }
        }

        public int Count()
        {
            string query = "SELECT COUNT(*) FROM tableinfo";
            int Count = -1;

            if (this.openConnection())
            {
                var command = new MySqlCommand(query, connection);
                Count = int.Parse(command.ExecuteScalar().ToString());

                this.closeConection();
                return Count;
            }
            else
            {
                return Count;
            }
        }
    }
}