using DKLib;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel.Web;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace DKApp
{
    class Program
    {
        static string logFile = Path.Combine(Path.GetTempPath(), "dk.log");
        static Boolean bStartAsService = true;
        static Boolean bNoConsole = true;
        static void Main(string[] args)
        {
            if (File.Exists(logFile))
            {
                File.Delete(logFile);
            }
            ToLog("logFile=" + logFile);
            DKServices dkServices = new DKServices();
            dkServices.ToLogHandler = ToLog;

            dkServices.baseurl = "http://localhost:8000";
            dkServices.staticpath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            dkServices.staticpath = Path.Combine(dkServices.staticpath, "lightgallery");

            if(args.Length < 2)
            {
                dkServices.staticpath = "/volume1/util/dkapp/lightgallery";
                string szNasBasePath = "/volume1/dkapp/";
                dkServices.dbpath = Path.Combine(szNasBasePath, "digikam");
                dkServices.imgpath = Path.Combine(szNasBasePath, "bilder");
                dkServices.thumbpath = Path.Combine(szNasBasePath, "thumbs");
            }

            for (int a =0;a < args.Length;a++)
            {
                if (args[a].Equals("-path") && a < args.Length - 1)
                {
                    dkServices.dbpath = Path.Combine(args[a + 1], "digikam");
                    dkServices.imgpath = Path.Combine(args[a + 1], "bilder");
                    dkServices.thumbpath = Path.Combine(args[a + 1], "thumbs");
                }
                else if ( args[a].Equals("-dbpath") && a < args.Length-1)
                {
                    dkServices.dbpath = args[a+1];
                }
                else if (args[a].Equals("-imgpath") && a < args.Length - 1)
                {
                    dkServices.imgpath = args[a+1];
                }
                else if (args[a].Equals("-thumbpath") && a < args.Length - 1)
                {
                    dkServices.thumbpath = args[a+1];
                }
                else if (args[a].Equals("-noservice"))
                {
                    bStartAsService = false;
                }
                else if (args[a].Equals("-console"))
                {
                    bNoConsole = false;
                }
            }
            if (bStartAsService)
            {
                ServiceBase[] ServicesToRun;
                ServicesToRun = new ServiceBase[] { new DKMonoService(dkServices) };
                ServiceBase.Run(ServicesToRun);
            }
            else
            {
                StartHost(dkServices);
            }
        }
        private static void StartHost(DKServices dkServices)
        {
            WebServiceHost _serviceHost = new WebServiceHost(dkServices,
                                                             new Uri(dkServices.baseurl));
            _serviceHost.Open();
            ToLog("dbpath=" + dkServices.dbpath);
            ToLog("imgpath=" + dkServices.imgpath);
            ToLog("thumbpath=" + dkServices.thumbpath);
            ToLog("staticpath=" + dkServices.staticpath);
            string szIndexHtml = Path.Combine(dkServices.staticpath, "dk", "index.html").Replace(@"\bin\Debug", "");
            if (!File.Exists(szIndexHtml))
            {
                ToLog("index.html: " + szIndexHtml + " not found");
            }
            else
            {
                ToLog("index.html: " + szIndexHtml + " found");
            }

            ToLog("Listening on  " + dkServices.baseurl + "  ... ");

            Console.ReadKey();
            _serviceHost.Close();
        }
        private static void ToError(string msg)
        {
            Logging("ERR", msg);
        }
        private static void ToLog(string msg)
        {
            Logging("LOG", msg);
        }
        private static void Logging(string szPrefix,string msg)
        {
            if (!bNoConsole)
            {
                Console.WriteLine(msg);
                System.Diagnostics.Debug.WriteLine(msg);
            }
            try
            {
                File.AppendAllText(logFile, DateTime.Now.ToString("yyMMdd HH:mm:ss") + " " + szPrefix + " " + msg + Environment.NewLine);
            }
            catch (Exception ex)
            {
                if (!bNoConsole)
                {
                    Console.WriteLine(msg);

                    System.Diagnostics.Debug.WriteLine(msg);

                    Console.WriteLine(ex.ToString());
                    System.Diagnostics.Debug.WriteLine(ex.ToString());
                }
            }
        }
    }
}
