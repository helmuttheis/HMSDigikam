using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Threading.Tasks;

namespace DKLib
{
    [ServiceContract(Name = "DKServices")]
    public interface IDKServices
    {
        [OperationContract]
        [WebGet(UriTemplate = Routing.Thumb,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Thumb();

        [OperationContract]
        [WebGet(UriTemplate = Routing.Photo,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Photo();

        [OperationContract]
        [WebGet(UriTemplate = Routing.Search,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Search();

       
        [OperationContract]
        [WebGet(UriTemplate = Routing.AlbumList,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream AlbumList();

        [OperationContract]
        [WebGet(UriTemplate = Routing.Album,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Album(string Id);

        [OperationContract]
        [WebGet(UriTemplate = Routing.TagHierarchy,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream TagHierarchy();

        [OperationContract]
        [WebGet(UriTemplate = Routing.Taglist,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Taglist(string Id);

        [OperationContract]
        [WebGet(UriTemplate = Routing.Tag,
            ResponseFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Tag(string Id);

        [OperationContract]
        [WebGet(UriTemplate = Routing.Dk,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Dk();

        [OperationContract]
        [WebGet(UriTemplate = Routing.Dist,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Dist();

        [OperationContract]
        [WebGet(UriTemplate = Routing.Lib,
            BodyStyle = WebMessageBodyStyle.Bare)]
        System.IO.Stream Lib();
    }
}
