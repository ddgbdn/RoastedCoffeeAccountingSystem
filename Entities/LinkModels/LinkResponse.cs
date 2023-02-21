using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.LinkModels
{
    public class LinkResponse<T>
    {
        public bool HasLinks { get; set; }
        public List<T> Entities { get; set; }
        public LinkCollection<T> LinkedEntities { get; set; }
        public LinkResponse() 
        {
            Entities = new List<T>();
            LinkedEntities = new LinkCollection<T>();
        }
    }
}
