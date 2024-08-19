<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

using System.IO;
using Newtonsoft.Json;

public class Handler : IHttpHandler
{
    //前台传递过来的json字符对象
    public struct ParaStrObj
    {
        public string paraStr { get; set; }
    }

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string method = System.Web.HttpContext.Current.Request["method"].ToString();
        string res = slOnlineAnalyse(method, context);
        context.Response.Write(res);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    public string slOnlineAnalyse(string method, HttpContext context)
    {
        string res = null;
        
        return res;
    }
}