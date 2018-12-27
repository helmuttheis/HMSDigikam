using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DKLib
{
    public static class Routing
    {
        public const string AlbumList = "/albumlist";
        public const string Album = "/album/{id}";
        public const string Person = "/person/{id}";
        public const string TagHierarchy = "/taghierarchy";
        public const string Taglist = "/taglist?tagid={id}";
        public const string Tag = "/tag?tagid={id}";
        

        public const string Photo = "/photo/*";
        public const string Thumb = "/thumb/*";
        public const string Search= "/search";

        
        public const string Dk = "/dk/*";
        public const string Dist = "/dist/*";
        public const string Lib = "/lib/*";
        

    }
}
