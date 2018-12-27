using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace DKLib
{
    public delegate void ToLog(string msg);

    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single,
    ConcurrencyMode = ConcurrencyMode.Single, IncludeExceptionDetailInFaults = true)]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class DKServices : IDKServices
    {
        public ToLog ToLogHandler;

        public string baseurl = "";
        public string dbpath = "";
        public string imgpath = "";
        public string thumbpath = "";
        public string staticpath = "";

        public System.IO.Stream AlbumList()
        {
            ToLog("AlbumList ");

            SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());
            HMSMB.Digikam hd = new HMSMB.Digikam(Path.Combine(this.dbpath, "digikam4.db"));
            hd.ToLogHandler = this.ToLog;
            hd.Init();
            string json = hd.GetJSONAlbumList().ToJSON();

            return GetJsonStream(json);
        }
        public System.IO.Stream Album(string Id)
        {
            ToLog("Album " + Id);
            SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());
            HMSMB.Digikam hd = new HMSMB.Digikam(Path.Combine(this.dbpath, "digikam4.db"));
            hd.ToLogHandler = this.ToLog;
            hd.Init();  
            string json = hd.GetJSONFromAlbum(Id).ToJSON();

            return GetJsonStream(json);
        }
        public System.IO.Stream Taglist(string Id)
        {
            ToLog("Taglist " + Id);
            SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());
            HMSMB.Digikam hd = new HMSMB.Digikam(Path.Combine(this.dbpath, "digikam4.db"));
            hd.ToLogHandler = this.ToLog;
            hd.Init();
            string json = hd.GetJSONTagList(Id).ToJSON();

            return GetJsonStream(json);
        }
        public System.IO.Stream TagHierarchy()
        {
            ToLog("TagHierarchy ");
            SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());
            HMSMB.Digikam hd = new HMSMB.Digikam(Path.Combine(this.dbpath, "digikam4.db"));
            hd.ToLogHandler = this.ToLog;
            hd.Init();
            string json = hd.GetJSONTagHierarchy().ToJSON();

            return GetJsonStream(json);
        }
        public System.IO.Stream Tag(string Id)
        {
            ToLog("Tag " + Id);
            SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());
            HMSMB.Digikam hd = new HMSMB.Digikam(Path.Combine(this.dbpath, "digikam4.db"));
            hd.ToLogHandler = this.ToLog;
            hd.Init();
            string json = hd.GetJSONFromTagId(Id).ToJSON();

            return GetJsonStream(json);
        }
        public System.IO.Stream Search()
        {
            ToLog("Search ");
            string Id = "";
            string qry = "";
            foreach( var kv in WebOperationContext.Current.IncomingRequest.UriTemplateMatch.QueryParameters )
            {
                qry = kv.ToString();
                Id = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.QueryParameters[kv.ToString()];
            }
            SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());
            HMSMB.Digikam hd = new HMSMB.Digikam(Path.Combine(this.dbpath, "digikam4.db"));
            hd.ToLogHandler = this.ToLog;
            hd.Init();
            if (qry == "album")
            {
                string json = hd.GetJSONFromAlbum(Id).ToJSON();

                return GetJsonStream(json);
            }
            else
            {
                string json = hd.GetJSONFromTagName(Id).ToJSON();

                return GetJsonStream(json);
            }
        }
        

        public System.IO.Stream Photo()
        {
            string fn = this.imgpath;
            if (WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments.Count == 0)
            {
                string sz_prefix = "photo/";
                fn += WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.LocalPath.Substring(sz_prefix.Length);
            }
            else
            {

                for (int p = 1; p < WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments.Count; p++)
                {
                    fn = Path.Combine(fn, WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments[p]);
                }
            }
            ToLog("Photo " + fn);
            return GetStaticStream(fn);
        }
        public System.IO.Stream Thumb()
        {
            string fn = this.thumbpath;
            ToLog("RelativePathSegments=" + WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments.Count.ToString());
            ToLog("LocalPath=" + WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.LocalPath);

            if (WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments.Count == 0)
            {
                string sz_prefix = "thumb/";
                fn += WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.LocalPath.Substring(sz_prefix.Length);
            }
            else
            {

                for (int p = 1; p < WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments.Count; p++)
                {
                    fn = Path.Combine(fn, WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments[p]);
                }
            }
            ToLog("Thumb " + fn);
            return GetStaticStream(fn);
        }
        
        
        public System.IO.Stream Dk()
        {
            return GetStaticStream();
        }
        public System.IO.Stream Dist()
        {
            return GetStaticStream();
        }
        public System.IO.Stream Lib()
        {
            return GetStaticStream();
        }
        public System.IO.Stream GetJsonStream(string json)
        {
            return GetStream("json", "{\"json\":" + json + "}");
        }
        public System.IO.Stream GetErrorStream(string json)
        {
            return GetStream("json", "{\"error\":\"" + json + "\"}");
        }
        public System.IO.Stream GetStream(string ext, string body)
        {
            WebOperationContext.Current.OutgoingResponse.ContentType = "application/json";
            byte[] resultBytes = Encoding.UTF8.GetBytes(body);
            return new MemoryStream(resultBytes);
        }
        public System.IO.Stream GetStaticStream()
        {
            string fn = this.staticpath.Replace(@"\bin\Debug", "");

            if (WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments.Count == 0)
            {
                fn += WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RequestUri.LocalPath;
            }
            else
            {
                for (int p = 0; p < WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments.Count; p++)
                {
                    string segment = WebOperationContext.Current.IncomingRequest.UriTemplateMatch.RelativePathSegments[p];

                    if (segment != segment.ToLower())
                    {
                        ToLog("UPPERCASE: " + segment);
                    }
                    fn = Path.Combine(fn, segment);
                }
            }
            return GetStaticStream(fn);
        }
        public System.IO.Stream GetStaticStream(string fn)
        {
            if( fn.EndsWith("lightgallery"))
            {
                fn = Path.Combine(fn, "dk", "index.html");
            }
            string result = "<a href='someLink' >Some link " + fn + "</a>";
            WebOperationContext.Current.OutgoingResponse.ContentType = "text/html";
            byte[] resultBytes = Encoding.UTF8.GetBytes(result);
            if ( File.Exists(fn))
            {
                ToLog("static " + fn);
                string ext = Path.GetExtension(fn).ToLower();
                if( ext.Equals(".css"))
                {
                    WebOperationContext.Current.OutgoingResponse.ContentType = "text/css";
                }
                else if (ext.Equals(".js"))
                {
                    WebOperationContext.Current.OutgoingResponse.ContentType = "text/javascript";
                }
                else if (ext.Equals(".png"))
                {
                    WebOperationContext.Current.OutgoingResponse.ContentType = "image/png";
                }
                else if (ext.Equals(".jpeg"))
                {
                    WebOperationContext.Current.OutgoingResponse.ContentType = "image/jpeg";
                }
                try
                {
                    resultBytes = File.ReadAllBytes(fn);
                }
                catch (Exception)
                {
                    // throw;
                }
                
            }
            else
            {
                ToLog("NOT FOUND: static " + fn);
            }
            
            return new MemoryStream(resultBytes);
        }

        private void ToLog(string msg)
        {
            if( ToLogHandler != null)
            {
                ToLogHandler(msg);
            }
        }
    }
}
