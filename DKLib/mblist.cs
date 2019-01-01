using System;
using System.Collections.Generic;
using System.Text;

namespace HMSMB
{
    public class MBLlist
    {

        public List<Photo> Photos { get; set; }
        public int TotalRecordCount { get; set; }

        public MBLlist()
        {
            Photos = new List<Photo>();
        }
        public string ToJSON()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("{");
            sb.Append("\"Photos\": [");
            string del = "";
            foreach(var i in Photos)
            {
                sb.Append(del + i.ToJSON());
                del = ",";
            }
            sb.Append("],");

            sb.Append("\"TotalRecordCount\":" + TotalRecordCount);
            sb.Append("}");
            return sb.ToString();
        }
    }

    public class MBLTagList
    {
        public List<Tag> Tags { get; set; }
        public int TotalRecordCount { get; set; }

        public MBLTagList()
        {
            Tags = new List<Tag>();
        }
        public string ToJSON()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("{");
            sb.Append("\"Tags\": [");
            string del = "";
            foreach (var i in Tags)
            {
                sb.Append(del + i.ToJSON());
                del = ",";
            }
            sb.Append("],");

            sb.Append("\"TotalRecordCount\":" + TotalRecordCount);
            sb.Append("}");
            return sb.ToString();
        }
    }
    public class Tag
    {
        public string id { get; set; }
        public string pid { get; set; }

        public string name { get; set; }
        public string childcnt { get; set; }
        
        public string ToJSON()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("{");

            sb.Append("\"id\":\"" + id + "\",");
            sb.Append("\"pid\":\"" + pid + "\", ");
            sb.Append("\"name\":\"" + name + "\", ");
            sb.Append("\"childcnt\":" + childcnt + " ");
            sb.Append("}");
            return sb.ToString();
        }
    }
    public class MBLAlbumList
    {
        public List<Album> Albums { get; set; }
        public int TotalRecordCount { get; set; }

        public MBLAlbumList()
        {
            Albums = new List<Album>();
        }
        public string ToJSON()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("{");
            sb.Append("\"Albums\": [");
            string del = "";
            foreach (var i in Albums)
            {
                sb.Append(del + i.ToJSON());
                del = ",";
            }
            sb.Append("],");

            sb.Append("\"TotalRecordCount\":" + TotalRecordCount);
            sb.Append("}");
            return sb.ToString();
        }
    }
    public class Album
    {
        public string RelativePath { get; set; }
        public string Albumroots { get; set; }


        public string ToJSON()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("{");

            sb.Append("\"RelativePath\":\"" + RelativePath + "\",");
            sb.Append("\"Albumroots\":\"" + Albumroots + "\" ");

            sb.Append("}");
            return sb.ToString();
        }
    }

    public class Photo
    {
        public string Name { get; set; }
        public string ServerId { get; set; }
        public string Id { get; set; }
        public string SortName { get; set; }
        public DateTime PremiereDate { get; set; }
        public int ProductionYear { get; set; }
        public string Type { get; set; }
        public Userdata UserData { get; set; }
        public float PrimaryImageAspectRatio { get; set; }
        public string Album { get; set; }
        public string Image { get; set; }
        public string AlbumId { get; set; }
        public Imagetags ImageTags { get; set; }
        public object[] BackdropImageTags { get; set; }
        public string LocationType { get; set; }
        public string MediaType { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string CameraMake { get; set; }
        public string CameraModel { get; set; }
        public string Software { get; set; }
        public float ExposureTime { get; set; }
        public float FocalLength { get; set; }
        public string ImageOrientation { get; set; }
        public float Aperture { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int IsoSpeedRating { get; set; }
        public float Altitude { get; set; }


        public string ToJSON()
        {
            StringBuilder sb = new StringBuilder();
            // if (!string.IsNullOrWhiteSpace(this.Name))
            {
                sb.Append("{");

                sb.Append("\"Name\":\"" + Name + "\",");
                sb.Append("\"ServerId\":\"" + ServerId + "\",");
                sb.Append("\"Id\":\"" + Id + "\",");
                sb.Append("\"PremiereDate\":\"" + PremiereDate + "\",");
                sb.Append("\"ProductionYear\":\"" + ProductionYear + "\",");
                sb.Append("\"Type\":\"" + Type + "\",");
                sb.Append("\"Album\":\"" + Album + "\",");
                sb.Append("\"Image\":\"" + Image + "\",");
                sb.Append("\"AlbumId\":\"" + AlbumId + "\",");
                sb.Append("\"Width\":" + Width + ",");
                sb.Append("\"Height\":" + Height + ",");
                sb.Append("\"PrimaryImageAspectRatio\":\"" + Width / Height + "\",");
                sb.Append("\"ProductionYear\":\"" + ProductionYear + "\"");


                sb.Append("}");
            }
            return sb.ToString();
        }
    }

    public class Userdata
    {
        public int PlaybackPositionTicks { get; set; }
        public int PlayCount { get; set; }
        public bool IsFavorite { get; set; }
        public bool Played { get; set; }
        public string Key { get; set; }
    }

    public class Imagetags
    {
        public string Primary { get; set; }
    }
}