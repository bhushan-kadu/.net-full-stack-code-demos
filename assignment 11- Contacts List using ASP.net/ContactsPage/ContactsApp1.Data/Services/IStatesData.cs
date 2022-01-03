using ContactsApp.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ContactsApp.Data.Services
{
    public interface IStatesData
    {
        IEnumerable<State> GetStatesForGivenCountry(long countryId);

        IEnumerable<State> GetStatesForGivenCountry(string countryName);
        IEnumerable<StateForGrid> GetAllStates();
        void AddState(StateForGrid state);
        void UpdateState(StateForGrid state);
        void DeleteStates(IEnumerable<long> stateIds);
        long GetStateIdFromName(string stateName);


    }
}
