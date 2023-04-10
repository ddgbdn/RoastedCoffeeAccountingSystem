﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace RoastedCoffeeAccountingSystem.Exceptions
{
    public class BadRequestException : Exception
    {
        protected BadRequestException(string message) : base(message) 
        {
        }
    }
}
