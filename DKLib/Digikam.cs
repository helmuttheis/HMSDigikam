using SQLitePCL.pretty;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMSMB
{
    public delegate void ToLog(string msg);
    public class Digikam
    {
        
        public ToLog ToLogHandler;

        readonly string DBName;
        SQLiteDatabaseConnection db;

        public Digikam(string DBName)
        {
            this.DBName = DBName;
        }
        public void Init()
        {
            
            // db = SQLiteDatabaseConnectionBuilder.Create(DBName,)
            db = SQLite3.Open(DBName, ConnectionFlags.ReadOnly,null);
            
        }
        public List<int> xxxGetJSONFromTagId(string tag)
        {
            ToLog("GetImageIdListFromTag " + tag);

            List<int> ret = new List<int>();
            string SQL = "select ImageTags.imageid, Tags.id from Tags " +
                         "left join ImageTags on ImageTags.tagid = Tags.id " +
                          "where name = '" + tag + "'";

            foreach (var row in db.Query(SQL))
            {
                ret.Add(row[0].ToInt());
            }

            return ret ;
        }
        public List<string> GetImagesFromIdList(List<int> idList)
        {
            ToLog("GetImagesFromIdList");

            string pathDel = "/";
            List<string> ret = new List<string>();

            foreach (var id in idList)
            {
                string SQL = "SELECT Albums.relativePath, Images.name FROM Images " +
                "left join Albums on Albums.id = Images.album " +
                "where images.id = " + id.ToString();

                foreach (var row in db.Query(SQL))
                {
                    ret.Add(row[0].ToString() + pathDel + row[1].ToString());
                }
            }
            return ret ;
        }
        public MBLlist GetJSONFromTagName(string tag)
        {
            ToLog("GetJSONFromTag "  +tag);

            MBLlist ret = new MBLlist();

            string pathDel = "/";
            string op = "=";
            tag = tag.Trim();
            if (tag.EndsWith("*"))
            {
                tag = tag.Replace("*", "%");
                op = "like";
            }
            else
            {
                tag = tag + "%";
                op = "like";
            }
            
            string SQL = "select "+ 
                "ImageTags.imageid, " + // 0
                "Tags.id," + // 1
                "ImageInformation.width," +  // 2
                "ImageInformation.height, " + // 3
                        "images.album," + // 4
                        "images.name," + // 5 
                        "albumroots.specificPath, " +  // 6
                        "albums.relativePath, " + // 7
                        "albums.id " + // 8
                        " from Tags  " + 
                         "left join ImageTags on ImageTags.tagid = Tags.id " +
                         "left join images on images.id = ImageTags.imageid " +
                         "left join ImageInformation on ImageInformation.imageid = ImageTags.imageid " +
                         "left join Albums on Albums.id = images.album " +
                         "left join AlbumRoots on albumroots.id = albums.albumRoot " +
                         "where Tags.name " + op + " '" + tag + "'";
            ToLog("SQL=" + SQL);

            foreach (var row in db.Query(SQL))
            {
                if (row[3].ToInt() > 0)
                {
                    ret.Photos.Add(new Photo()
                    {
                        Id = row[0].ToString(),
                        Album = row[7].ToString(),
                        Image = row[7].ToString() + pathDel + row[5],
                        AlbumId = row[8].ToString(),
                        Width = row[2].ToInt(),
                        Height = row[3].ToInt(),
                        PremiereDate = new DateTime(2017, 1, 1),
                        ProductionYear = 2017,
                        Type = "Photo",
                        ImageOrientation = "TopLeft",
                    });
                }
            }

            ToLog("TotalRecordCount=" + ret.Photos.Count);
            ret.TotalRecordCount = ret.Photos.Count;

            return ret;
        }
        public MBLlist GetJSONFromTagId(string tag)
        {
            ToLog("GetJSONFromTag " + tag);

            MBLlist ret = new MBLlist();

            string pathDel = "/";
            string op = "=";
            tag = tag.Trim();
            if (tag.EndsWith("*"))
            {
                tag = tag.Replace("*", "%");
                op = "like";
            }


            string SQL = "select " +
                "ImageTags.imageid, " + // 0
                "Tags.id," + // 1
                "ImageInformation.width," +  // 2
                "ImageInformation.height, " + // 3
                        "images.album," + // 4
                        "images.name," + // 5 
                        "albumroots.specificPath, " +  // 6
                        "albums.relativePath, " + // 7
                        "albums.id " + // 8
                        " from Tags  " +
                         "left join ImageTags on ImageTags.tagid = Tags.id " +
                         "left join images on images.id = ImageTags.imageid " +
                         "left join ImageInformation on ImageInformation.imageid = ImageTags.imageid " +
                         "left join Albums on Albums.id = images.album " +
                         "left join AlbumRoots on albumroots.id = albums.albumRoot " +
                         "where Tags.id " + op + " '" + tag + "'";
            ToLog("SQL=" + SQL);

            foreach (var row in db.Query(SQL))
            {
                if (row[3].ToInt() > 0)
                {
                    ret.Photos.Add(new Photo()
                    {
                        Id = row[0].ToString(),
                        Album = row[7].ToString(),
                        Image = row[7].ToString() + pathDel + row[5],
                        AlbumId = row[8].ToString(),
                        Width = row[2].ToInt(),
                        Height = row[3].ToInt(),
                        PremiereDate = new DateTime(2017, 1, 1),
                        ProductionYear = 2017,
                        Type = "Photo",
                        ImageOrientation = "TopLeft",
                    });
                }
            }

            ToLog("TotalRecordCount=" + ret.Photos.Count);
            ret.TotalRecordCount = ret.Photos.Count;

            return ret;
        }

        public MBLlist GetJSONFromAlbum(string album)
        {
            ToLog("GetJSONFromAlbum " + album);

            MBLlist ret = new MBLlist();

            string pathDel = "/";

            string SQL = "select " +
                "Images.id, " + // 0
                "ImageInformation.width," +  // 1
                "ImageInformation.height, " + // 2
                        "images.album," + // 3
                        "images.name," + // 4
                        "albumroots.specificPath, " +  // 5
                        "albums.relativePath, " + // 6
                        "albums.id " + // 7
                        " from Images  " +
                         "left join ImageInformation on ImageInformation.imageid = Images.id " +
                         "left join Albums on Albums.id = images.album " +
                         "left join AlbumRoots on albumroots.id = albums.albumRoot " +
                         "where albums.relativePath = '" + album + "'";
            ToLog("SQL=" + SQL);

            foreach (var row in db.Query(SQL))
            {
                if (row[3].ToInt() > 0)
                {
                    ret.Photos.Add(new Photo()
                    {
                        Id = row[0].ToString(),
                        Album = row[6].ToString(),
                        Image = row[6].ToString() + pathDel + row[4],
                        AlbumId = row[7].ToString(),
                        Width = row[1].ToInt(),
                        Height = row[2].ToInt(),
                        PremiereDate = new DateTime(2017, 1, 1),
                        ProductionYear = 2017,
                        Type = "Photo",
                        ImageOrientation = "TopLeft",
                    });
                }
            }
            ToLog("TotalRecordCount=" + ret.Photos.Count);
            ret.TotalRecordCount = ret.Photos.Count;

            return ret;
        }
        public MBLAlbumList GetJSONAlbumList()
        {
            ToLog("GetJSONAlbumList");
            MBLAlbumList ret = new MBLAlbumList();
            
            string SQL = "select " +
                        " albumroots.specificPath, " +  // 0
                        " albums.relativePath, " + // 1
                        " albums.id " + // 2
                        " from Albums " +
                        " left join AlbumRoots on albumroots.id = albums.albumRoot ";
            ToLog("SQL=" + SQL);
            foreach (var row in db.Query(SQL))
            {
                ret.Albums.Add(new Album()
                {
                    Albumroots = row[0].ToString(),
                    RelativePath = row[1].ToString()
                    
                });
            }
            ToLog("TotalRecordCount=" + ret.Albums.Count);
            ret.TotalRecordCount = ret.Albums.Count;

            return ret;
        }
        public MBLTagList GetJSONTagList(string tagid)
        {
            ToLog("GetJSONFromTagid");
            MBLTagList ret = new MBLTagList();
            string SQL = "";
            string useTagid = tagid;
            // while (!string.IsNullOrWhiteSpace(useTagid))
            {
                SQL = "select " +
                            " t2.id,  " +  // 0
                            " t2.pid, " + // 1
                            " t2.name, " + // 2
                            " Count(t3.id) " + // 3
                            " from Tags as t1 " +
                            " left join Tags as t2 on t2.id = t1.pid " +
                            " left join Tags as t3 on t3.pid = t1.id " +
                            " where t1.id = " + useTagid +
                            " group by t2.id,t2.pid,t2.name";

                ToLog("SQL=" + SQL);
                useTagid = "";
                foreach (var row in db.Query(SQL))
                {
                    if (!row[2].ToString().Equals(""))
                    {
                        ret.Tags.Add(new Tag()
                        {
                            id = row[0].ToString(),
                            pid = row[1].ToString(),
                            name = row[2].ToString()
                        });
                        useTagid = row[1].ToString();
                    }
                }
            }
            SQL = "select " +
                        " t1.id,  " +  // 0
                        " t1.pid, " + // 1
                        " t1.name, " + // 2
                        " Count(t3.id) " + // 3
                        " from Tags as t1 " +
                        " left join Tags as t3 on t3.pid = t1.id " +
                            " where t1.pid = " + tagid +
                            " group by t1.name,t1.id,t1.pid";
            ToLog("SQL=" + SQL);
            foreach (var row in db.Query(SQL))
            {
                if (!row[2].ToString().Equals("_Digikam_Internal_Tags_"))
                {
                    ret.Tags.Add(new Tag()
                    {
                        id = row[0].ToString(),
                        pid = row[1].ToString(),
                        name = row[2].ToString(),
                        childcnt = row[3].ToString()
                    });
                }
            }
            ToLog("TotalRecordCount=" + ret.Tags.Count);
            ret.Tags.Sort((t1,t2) => t1.name.CompareTo(t2.name));
            ret.TotalRecordCount = ret.Tags.Count;

            return ret;
        }
        public MBLTagList GetJSONTagHierarchy()
        {
            ToLog("GetJSONFromTagid");
            MBLTagList ret = new MBLTagList();
            string SQL = "";
            string useTagid = "0";
            while (!string.IsNullOrWhiteSpace(useTagid))
            {
                SQL = "select " +
                            " id,  " +  // 0
                            " pid, " + // 1
                            " name " + // 2
                            " from Tags " +
                            " where id = " + useTagid;
                ToLog("SQL=" + SQL);
                useTagid = "";
                foreach (var row in db.Query(SQL))
                {
                    ret.Tags.Add(new Tag()
                    {
                        id = row[0].ToString(),
                        pid = row[1].ToString(),
                        name = row[2].ToString()
                    });
                    useTagid = row[1].ToString();
                }
            }
            
            ToLog("TotalRecordCount=" + ret.Tags.Count);
            ret.TotalRecordCount = ret.Tags.Count;

            return ret;
        }
        private void ToLog(string msg)
        {
            if (ToLogHandler != null)
            {
                ToLogHandler(msg);
            }
        }
    }
}
