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
    class DKMonoService : ServiceBase
    {
        WebServiceHost _serviceHost;
        DKServices dkServices;
        public DKMonoService(DKServices dkServices)
        {
            this.dkServices = dkServices;
        }
        
        protected override void OnStart(string[] args)
        {
            _serviceHost = new WebServiceHost(dkServices, new Uri(dkServices.baseurl));
            _serviceHost.Open();

        }

        protected override void OnStop()
        {
            _serviceHost.Close();
        }
    }
}
