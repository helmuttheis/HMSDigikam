using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;

namespace Thumbnail
{
    class Program
    {
        static Boolean bForce = false;
        static void Main(string[] args)
        {
            string inputPath = "";
            string outputPath = "";
            string inputFile = "";
            string outputFile = "";
            for (int i = 0 ;i< args.Length;i++)
            {
                if( args[i] == "-id" && i < args.Length-1)
                {
                    inputPath = args[i + 1];
                }
                else if (args[i] == "-od" && i < args.Length - 1)
                {
                    outputPath = args[i + 1];
                }
                if (args[i] == "-if" && i < args.Length - 1)
                {
                    inputFile = args[i + 1];
                }
                else if (args[i] == "-of" && i < args.Length - 1)
                {
                    outputFile = args[i + 1];
                }
                else if (args[i] == "-force" )
                {
                    bForce = true;
                }
                // 
            }
            doOneFile(inputFile, outputFile);
            doOnePath(inputPath, outputPath);
        }
        static void doOnePath(string inputPath, string outputPath)
        {
            if (string.IsNullOrWhiteSpace(inputPath))
                return;
            if (string.IsNullOrWhiteSpace(outputPath))
                return;

            string[] files = Directory.GetFiles(inputPath, "*.*");
            foreach(var file in files)
            {
                string fn = file.Substring(inputPath.Length);
                if(fn.StartsWith(Path.DirectorySeparatorChar.ToString()))
                {
                    fn = fn.Substring(1);
                }
                doOneFile(file, Path.Combine(outputPath, fn));
            }
            string[] dirs = Directory.GetDirectories(inputPath, "*.*");
            foreach (var d in dirs)
            {
                string fn = d.Substring(inputPath.Length);
                if (fn.StartsWith(Path.DirectorySeparatorChar.ToString()))
                {
                    fn = fn.Substring(1);
                }
                doOnePath(d, Path.Combine(outputPath, fn));
            }

        }
        static void doOneFile(string inputFile, string outputFile)
        {
            if (string.IsNullOrWhiteSpace(inputFile))
                return;
            if (string.IsNullOrWhiteSpace(outputFile))
                return;
            Boolean bSkip = false;

            string ext = Path.GetExtension(inputFile);
            List<string> photoExts = new List<string>(){
                ".png",
                ".jpg",
                ".bmp",
                ".tif",
                ".tiff",
                ".gif"
            };
            List<string> ignoreExts = new List<string>(){
                ".db",
                ".bat",
                ".ini",
                ".xlsx"
            };

            if (!photoExts.Contains(ext.ToLower()))
            {

                if (!ignoreExts.Contains(ext.ToLower()))
                {
                    Console.WriteLine("  ignoreExt " + ext + " " + inputFile);
                    return;
                }
                return;
            }
            FileInfo fiIn = new FileInfo(inputFile);
            if (File.Exists(outputFile) && !bForce)
            {
                FileInfo fiOut = new FileInfo(outputFile);

                bSkip = fiIn.CreationTime < fiOut.CreationTime;
            }
            if( fiIn.Length < 10)
            {
                bSkip = true;
            }
            if (!bSkip)
            {
                using (Bitmap b = (Bitmap)Bitmap.FromFile(inputFile))
                {
                    string outPath = Path.GetDirectoryName(outputFile);
                    if (!Directory.Exists(outPath))
                    {
                        Directory.CreateDirectory(outPath);
                    }
                    int thumbWidth = (int)((160 * b.Width) / b.Height);
                    int thumbHeight = 160;
                    b.GetThumbnailImage(thumbWidth, thumbHeight, null, IntPtr.Zero).Save(outputFile,System.Drawing.Imaging.ImageFormat.Jpeg);
                }
                Console.WriteLine(outputFile);
            }
        }
    }
}
