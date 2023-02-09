﻿using Contracts;

namespace RoastedCoffeeAccountingSystem.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureLoggerService(this IServiceCollection services) 
            => services.AddSingleton<ILoggerManager, LoggerManager>
    }
}
