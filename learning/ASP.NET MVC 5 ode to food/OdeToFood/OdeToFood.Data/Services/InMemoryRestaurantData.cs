using OdeToFood.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OdeToFood.Data.Services
{
    public class InMemoryRestaurantData : IRestaurantData
    {
        List<Restaurant> restaurants;

        public InMemoryRestaurantData()
        {
            restaurants = new List<Restaurant>()
            {
                new Restaurant{Id = 1, Name = "Chaman Rest", Cuisine = CuisineType.Chinese},
                new Restaurant{Id = 2, Name = "French maza", Cuisine = CuisineType.French},
                new Restaurant{Id = 3, Name = "italian classic", Cuisine = CuisineType.Italian},
                new Restaurant{Id = 4, Name = "China tadka", Cuisine = CuisineType.Chinese}
              };
        }
        public IEnumerable<Restaurant> GetAll()
        {
            return restaurants.OrderBy(r => r.Name);
        }
    }
} 
