﻿namespace ServiceContracts
{
    public interface IServiceManager
    {
        IGreenCoffeeService GreenCoffeeService { get; }
        IRoastingsService RoastingsService { get; }
    }
}
