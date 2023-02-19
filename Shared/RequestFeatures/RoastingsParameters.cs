﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.RequestFeatures
{
    public class RoastingsParameters : RequestParameters
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } = DateTime.Now;

        public bool ValidDataRange => EndDate > StartDate;
    }
}
