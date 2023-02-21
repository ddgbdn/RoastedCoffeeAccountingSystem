using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.LinkModels
{
    public class LinkCollection<T> : LinkResourceBase
    {
        public List<T> Values { get; set; } = new List<T>();

        public LinkCollection() { } //for XML

        public LinkCollection(List<T> values) => Values = values;        
    }
}
