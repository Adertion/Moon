using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

/// <summary>
///DBConnection 的摘要说明
///@author fmm 2015-06-10
/// </summary>
public class DBConnection
{
    public DBConnection()
    {
        //
        //TODO: 在此处添加构造函数逻辑
        //
    }

    protected static void ConnectSQL(SqlConnection conn)
    {
        if (conn.State == ConnectionState.Closed)
        {
            conn.Open();
        }
        else if (conn.State == ConnectionState.Broken)
        {
            conn.Close();
            conn.Open();
        }
    }
}