//生成颜色随机数（不能生成纯黑纯白）
function color_random() {
    var r = Math.round(Math.random() * 225 + 15);
    var g = Math.round(Math.random() * 225 + 15);
    var b = Math.round(Math.random() * 225 + 15);
    return 'rgba(' + r + ',' + g + ',' + b + ', 1)';
}
function color_random_area() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var color = new Array();
    color[0] = 'rgba(' + r + ',' + g + ',' + b + ', 1)'
    color[1] = 'rgba(' + r + ',' + g + ',' + b + ', 0.1)'
    return color;
}

/*** 图层添加显示 START ***/
var timer = null;
var delay = 200;
function singleClick(e, type) {
    //发生双击事件时禁止发生单击事件
    clearTimeout(timer);  // 清除上一次单击事件的定时器
    timer = setTimeout(function () {
        layers_show(e.target, type);  // 执行单击事件的处理函数
    }, delay);
}

function layers_show(checkbox, type) {
    //绘制新要素
    var color;
    if (checkbox.checked == true) {
        //保存要素相关信息
        OverLayers_name[OverLayers_num] = new Array();
        OverLayers_name[OverLayers_num][0] = checkbox.value;
        OverLayers_name[OverLayers_num][1] = type;
        OverLayers_name[OverLayers_num][2] = checkbox.nextElementSibling.textContent;

        if (type != 'tif') {
            color = add_overlayers(OverLayers_num, "");  //添加图层
            if (type == 'area') {
                checkbox.style.backgroundColor = color[0];
                OverLayers_name[OverLayers_num][3] = color[0];
            } else {
                checkbox.style.backgroundColor = color;
                OverLayers_name[OverLayers_num][3] = color;
            }
        } else {
            checkbox.style.backgroundColor = '#B0C4DE';
            OverLayers_name[OverLayers_num][3] = 'black,white';
            color = add_overlayers_tif(OverLayers_num, "black,white");  //添加图层
            rightsidebar_tif_show(checkbox.value);
        }
        OverLayers_num = OverLayers_num + 1;  //图层+1
    }
    else {  // 删除要素
        for (i = 0; i < OverLayers_num; i++) {
            if (OverLayers_name[i][0] == checkbox.value) {
                map.removeLayer(OverLayers[i]);  //移去图层
                OverLayers.splice(i, 1);  //移去该行元素，并使后面的元素向前填充
                OverLayers_name.splice(i, 1);  //移去该行元素，并使后面的元素向前填充
                OverLayers_num--;  //图层-1
                break;  //退出循环
            }
        }
        if (type == 'tif') {
            for (i = 0; i < OverLayers_tif_num; i++) {
                if (OverLayers_tif_data[i][0] == checkbox.value) {
                    OverLayers_tif_data.splice(i, 1);
                    OverLayers_tif_num--;
                    break;
                }
            }
        }
        
        checkbox.style.backgroundColor = '#fff';
    }
}
/*** 图层添加显示 END ***/

/*** 弹窗显示 START ***/
//点击弹窗
function display1Popup_click(clicktype, feature) {
    if (document.getElementById("rightsidebar").style.display == "none") {
        $("#rightsidebar").show("slide", { direction: "right" }, 1000);
    }
    //document.getElementById("rightsidebar_content_1").innerHTML = "";
    var text = display1Popup_click_text(clicktype, feature);
    document.getElementById('rightsidebar_content_1').style.height = '100%';
    document.getElementById('rightsidebar_head').innerHTML = text[0];
    document.getElementById('rightsidebar_content_1').innerHTML = '<br />' + text[1];
}
//悬浮弹窗
function display1Popup_move(movetype, feature) {
    var text = display1Popup_move_text(movetype, feature);
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(text);
}
//点击弹窗文字
function display1Popup_click_text(clicktype, feature) {
    var text = new Array();

    if (clicktype == "display1_ANTHROPOGENIC_OBJECTS_180") {
        text[0] = '<b>人类活动地点</b>';
        text[1] = '<div><p><b>简称：</b>' + feature.get('SHORT_NAME') + '</p>'
            + '<p><b>相关任务：</b>' + feature.get('MISSION') + '</p>'
            + '<p><b>全名：</b>' + feature.get('OBJECT') + '</p>'
            + '<p><b>经度：</b>' + feature.get('LONGITUDE') + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('LATITUDE') + '°</p>'
            + '<p><b>特征半径：</b>' + feature.get('RADIUS') + '&nbspm</p>'
            + '<p><b>半径信息来源：</b>' + feature.get('RAD_SRC') + '</p>'
            + '<p><b>不确定度：</b>' + feature.get('UNCERTAIN') + '&nbspm</p>'
            + '</div>';
    }
    else if (clicktype == "display1_CONTROLLED_MOSAICS_180") {
        text[0] = '<b>控制性镶嵌图像产品</b>';
        text[1] = '<div><p><b>PDS&nbsp站点名称：</b>' + feature.get('NAME') + '</p>'
            + '<p><b>站点全称及注释：</b>' + feature.get('SITENAME') + '</p>'
            + '<p><b>图像版本：</b>' + feature.get('VERSION') + '</p>'
            + '<p><b>中心经度：</b>' + feature.get('CENTER_LON') + '°</p>'
            + '<p><b>中心纬度：</b>' + feature.get('CENTER_LAT') + '°</p>'
            + '<p><b>拍摄完成日期：</b>' + (feature.get('PROJ_DATE') === null ? '/' : feature.get('PROJ_DATE')) + '</p>'
            + '<p><b>平均入射角度：</b>' + feature.get('INCIDENCE') + '°</p>'
            + '<p><b>太阳方向：</b>' + feature.get('SUN_DIRECT') + 'est</p>'
            + '<p><b>分辨率：</b>' + feature.get('RESOLUTION') + '&nbspm/px</p>'
            + '<p><b>覆盖面积：</b>' + feature.get('COVERAGE') + '&nbspkm</p>'
            + '<p><b>&sigma0&nbsp值：</b>' + (feature.get('SIGMA0') == '' ? '/' : feature.get('SIGMA0')) + '</p>'
            + '<p><b>品质排名：</b>' + feature.get('RANKING') + '</p>'
            + '<p><b>半径源：</b>' + (feature.get('RAD_SOURCE') == '' ? '/' : feature.get('RAD_SOURCE')) + '</p>'
            + '<p><b>形状模型：</b>' + feature.get('SHAPEMODEL') + '</p>'
            + '<p><b>URL：</b><a href=\'' + feature.get('URL') + '\' target=\'_blank\'>' + feature.get('URL') + '</a></p>'
            + '</div>';
    }
    else if (clicktype == "display1_COPERNICAN_CRATERS_180") {
        text[0] = '<b>哥白尼纪撞击坑</b>';
        text[1] = '<div><p><b>名称：</b>' + feature.get('NAME') + '</p>'
            + '<p><b>半径：</b>' + feature.get('DIAM_KM').toFixed(2) + '&nbspkm</p>'
            + '<p><b>经度：</b>' + feature.get('X_COORD').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Y_COORD').toFixed(2) + '°</p>'
            + '<p><b>具体描述：</b>' + feature.get('COMMENTS') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_CX_TARGETS_180") {
        text[0] = '<b>星座计划候选着陆点</b>';
        text[1] = '<div><p><b>站点名称：</b>' + feature.get('Site') + '</p>'
            + '<p><b>经度：</b>' + feature.get('Center_Lon') + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Center_Lat') + '°</p>'
            + '<p><b>优先级：</b>' + feature.get('Tier') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_FEATURED_MOSAICS_180") {
        var ASCORDESC, FLIGHT_DIR;
        if (feature.get('ASCORDESC') == 'A') {
            ASCORDESC = '增加';
        } else {
            ASCORDESC = '减少';
        }
        if (feature.get('FLIGHT_DIR') == '+X') {
            FLIGHT_DIR = '增加';
        } else {
            FLIGHT_DIR = '减少';
        }
        text[0] = '<b>特色镶嵌图像产品</b>';
        text[1] = '<div><p><b>图像编号：</b>' + feature.get('IMAGE_NAME') + '</p>'
            + '<p><b>PDS&nbsp产品版本&nbspID：</b>' + feature.get('VERSION_ID') + '</p>'
            + '<p><b>轨道编号：</b>' + feature.get('ORBIT_NUM') + '</p>'
            + '<p><b>飞行器旋转角度：</b>' + feature.get('SLEW_ANGLE') + '°</p>'
            + '<p><b>任务阶段：</b>' + feature.get('MISSION') + '</p>'
            + '<p><b>质量&nbspID：</b>' + feature.get('QUALITY_ID') + '</p>'
            + '<p><b>开始拍摄时间：</b>' + feature.get('START_TIME') + '</p>'
            + '<p><b>每条曝光时间：</b>' + feature.get('EXP_TIME') + '</p>'
            + '<p><b>条数：</b>' + feature.get('LINES') + '</p>'
            + '<p><b>样本数量：</b>' + feature.get('SAMPLES') + '</p>'
            + '<p><b>宽：</b>1&nbsppx&nbsp=&nbsp' + feature.get('PX_WIDTH') + '&nbspm</p>'
            + '<p><b>长：</b>1&nbsppx&nbsp=&nbsp' + feature.get('PX_HEIGHT') + '&nbspm</p>'
            + '<p><b>平均分辨率：</b>' + feature.get('RESOLUTION') + '&nbspm/px</p>'
            + '<p><b>发射角度：</b>' + feature.get('EMISSN_ANG') + '°</p>'
            + '<p><b>入射角度：</b>' + feature.get('INCID_ANG') + '°</p>'
            + '<p><b>相位角：</b>' + feature.get('PHASE_ANG') + '°</p>'
            + '<p><b>太阳高度角：</b>' + feature.get('SUBSOL_AZI') + '°</p>'
            + '<p><b>太阳所处经度：</b>' + feature.get('SUBSOL_LON') + '°</p>'
            + '<p><b>太阳所处纬度：</b>' + feature.get('SUBSOL_LAT') + '°</p>'
            + '<p><b>轨道器所处经度：</b>' + feature.get('SUB_SC_LON') + '°</p>'
            + '<p><b>轨道器所处纬度：</b>' + feature.get('SUB_SC_LAT') + '°</p>'
            + '<p><b>图像中心经度：</b>' + feature.get('CENTER_LON') + '°</p>'
            + '<p><b>图像中心纬度：</b>' + feature.get('CENTER_LAT') + '°</p>'
            + '<p><b>轨道器海拔：</b>' + feature.get('ALTITUDE') + '°</p>'
            + '<p><b>轨道器地平高度角：</b>' + ASCORDESC + '</p>'
            + '<p><b>轨道器海拔：</b>' + FLIGHT_DIR + '</p>'
            + '<p><b>图像左上角坐标：</b>（' + feature.get('UL_LON') + '°，&nbsp' + feature.get('UL_LAT') + '°）</p>'
            + '<p><b>图像右上角坐标：</b>（' + feature.get('UR_LON') + '°，&nbsp' + feature.get('UR_LAT') + '°）</p>'
            + '<p><b>图像左下角坐标：</b>（' + feature.get('LL_LON') + '°，&nbsp' + feature.get('LL_LAT') + '°）</p>'
            + '<p><b>图像右下角坐标：</b>（' + feature.get('LR_LON') + '°，&nbsp' + feature.get('LR_LAT') + '°）</p>'
            + '<p><b>URL：</b><a href=\'' + feature.get('URL') + '\' target=\'_blank\'>' + feature.get('URL') + '</a></p>'
            + '</div>';
    }
    else if (clicktype == "display1_HIESINGER2011_MARE_AGE_UNITS_180") {
        text[0] = '<b>汇编月海单元</b>';
        text[1] = '<div><p><b>单元名称：</b>' + feature.get('Unit') + '</p>'
            + '<p><b>模式年龄：</b>' + feature.get('Model_Age') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_HIESINGER2011_MARE_CRATER_COUNT_AREAS_180") {
        text[0] = '<b>撞击坑统计单元</b>';
        text[1] = '<div><p><b>模式年龄：</b>' + (feature.get('Model_Age') == '' ? '/' : feature.get('Model_Age')) + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_LOBATE_SCARPS_180") {
        text[0] = '<b>叶状陡坎</b>';
        text[1] = '<div><p><b>起始坐标：</b>（' + feature.get('lon_start').toFixed(2) + '°，&nbsp' + feature.get('lat_start').toFixed(2) + '°）</p>'
            + '<p><b>结束坐标：</b>（' + feature.get('lon_end').toFixed(2) + '°，&nbsp' + feature.get('lat_end').toFixed(2) + '°）</p>'
            + '</div>';
    }
    else if (clicktype == "display1_LROC_5TO20KM_CRATERS_180") {
        text[0] = '<b>全月表撞击坑（直径5-20km）</b>';
        text[1] = '<div><p><b>直径：</b>' + feature.get('Diam_km') + '&nbspkm</p>'
            + '<p><b>经度：</b>' + feature.get('x_coord') + '&nbsp°</p>'
            + '<p><b>纬度：</b>' + feature.get('y_coord') + '&nbsp°</p>'
            + '</div>';
    }
    else if (clicktype == "display1_LROC_GLOBAL_MARE_180") {
        text[0] = '<b>全月月海</b>';
        text[1] = '<div><p><b>月海名称：</b>' + feature.get('MARE_NAME') + '</p>'
            + '<p><b>周长：</b>' + feature.get('Perimtr_km').toFixed(2) + '&nbspkm</p>'
            + '<p><b>面积：</b>' + feature.get('Area_km').toFixed(2) + '&nbspkm<sup>2</sup></p>'
            + '</div>';
    }
    else if (clicktype == "display1_LUNAR_IMP_LOCATIONS_180") {
        text[0] = '<b>不规则月海斑块</b>';
        text[1] = '<div><p><b>名称：</b>' + feature.get('NAME') + '</p>'
            + '<p><b>长度：</b>' + feature.get('LENGTH') + '&nbspm</p>'
            + '<p><b>经度：</b>' + feature.get('LON') + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('LAT') + '°</p>'
            + '<p><b>所属月海：</b>' + feature.get('HOST_MARE') + '</p>'
            + '<p><b>地质背景：</b>' + feature.get('GEO_CONTEX') + '</p>'
            + '<p><b>IMP&nbsp等级：</b>' + feature.get('GRADE') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_LUNAR_PIT_LOCATIONS_180") {
        text[0] = '<b>熔岩管洞穴</b>';
        text[1] = '<div><p><b>名称：</b>' + feature.get('Name') + '</p>'
            + '<p><b>所属地形：</b>' + feature.get('Terrain') + '</p>'
            + '<p><b>类型：</b>' + (feature.get('Type') == '' ? '/' : feature.get('Type')) + '</p>'
            + '<p><b>所属区域：</b>' + feature.get('HostFeatur') + '</p>'
            + '<p><b>经度：</b>' + feature.get('Longitude') + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Latitude') + '°</p>'
            + '<p><b>漏斗最大直径：</b>' + feature.get('FunnelMaxD') + '&nbspm</p>'
            + '<p><b>漏斗最小直径：</b>' + feature.get('FunnelMinD') + '&nbspm</p>'
            + '<p><b>内部最大直径：</b>' + feature.get('InMaxDiam') + '&nbspm</p>'
            + '<p><b>内部最小直径：</b>' + feature.get('InMinDiam') + '&nbspm</p>'
            + '<p><b>内坑长轴方位角：</b>' + feature.get('Azimuth') + '°</p>'
            + '<p><b>深度：</b>' + (feature.get('Depth') == '' ? '/' : feature.get('Depth')) + '&nbspm</p>'
            + '<p><b>最佳立体图像&nbspID：</b>' + (feature.get('StereoIDs') == ',' ? '/' : feature.get('StereoIDs')) + '</p>'
            + '<p><b>入口处是否有完整斜坡：</b>' + feature.get('EntryRamp') + '</p>'
            + '<p><b>任意一侧是否有确定深度的垂悬：</b>' + feature.get('Overhang') + '</p>'
            + '<p><b>附近是否有坑：</b>' + feature.get('NearPits') + '</p>'
            + '<p><b>附近是否有裂缝：</b>' + feature.get('NearFract') + '</p>'
            + '<p><b>附近是否有洼地：</b>' + feature.get('NearDepr') + '</p>'
            + '<p><b>是否位于某种上凸地形中：</b>' + feature.get('InDome') + '</p>'
            + '<p><b>旁边是否有上凸地形：</b>' + feature.get('BesideDome') + '</p>'
            + '<p><b>是否处于某种除漏斗之外的下凹地形中：</b>' + feature.get('InDepr') + '</p>'
            + '<p><b>是否与至少两个坑共线：</b>' + feature.get('ColinePit') + '</p>'
            + '<p><b>是否与附近洼地共线：</b>' + feature.get('ColineDepr') + '</p>'
            + '<p><b>是否与附近裂缝共线：</b>' + feature.get('ColinFract') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_LUNAR_SWIRLS_180") {
        text[0] = '<b>漩涡</b>';
        text[1] = '<div><p><b>经度：</b>' + feature.get('Longitude').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Latitude').toFixed(2) + '°</p>'
            + '</div>';
    }
    else if (clicktype == "display1_NAC_DTMS_180") {
        text[0] = '<b>数字高程模型覆盖区</b>';
        text[1] = '<div><p><b>PDS&nbsp站点名称：</b>' + feature.get('DTM_NAME') + '</p>'
            + '<p><b>站点全称及注释：</b>' + feature.get('sitename') + '</p>'
            + '<p><b>图像版本：</b>' + feature.get('dtm_vers') + '</p>'
            + '<p><b>图像编号：</b>' + feature.get('images') + '</p>'
            + '<p><b>分辨率：</b>' + feature.get('resolution') + '&nbspm/px</p>'
            + '<p><b>中心经度：</b>' + feature.get('center_lon') + '°</p>'
            + '<p><b>中心纬度：</b>' + feature.get('center_lat') + '°</p>'
            + '<p><b>相对线性误差：</b>' + feature.get('relat_le') + '&nbspm</p>'
            + '<p><b>三角测量均方根误差：</b>' + feature.get('triang_rms') + '</p>'
            + '<p><b>拍摄完成时间：</b>' + feature.get('completion') + '</p>'
            + '<p><b>用于注册&nbspDTM&nbsp的文件数：</b>' + feature.get('num_profil') + '</p>'
            + '<p><b>相较于&nbspLOLA&nbsp轨道的平均误差的绝对值：</b>' + feature.get('lola_avg') + '</p>'
            + '<p><b>相较于&nbspLOLA&nbsp轨道的均方根误差：</b>' + feature.get('lola_rms') + '</p>'
            + '<p><b>用于偏移计算的调整均方根误差：</b>' + feature.get('adjust_rms') + '</p>'
            + '<p><b>经度偏移量：</b>' + feature.get('lon_offset') + '</p>'
            + '<p><b>纬度偏移量：</b>' + feature.get('lat_offset') + '</p>'
            + '<p><b>海拔偏移量：</b>' + feature.get('elv_offset') + '</p>'
            + '<p><b>&nbspISIS&nbsp版本：</b>' + feature.get('isis_vers') + '</p>'
            + '<p><b>覆盖面积：</b>' + feature.get('cov_sqkm') + '&nbspkm<sup>2</sup></p>'
            + '<p><b>立体图像对间的收敛角：</b>' + feature.get('conv_angle') + '°</p>'
            + '<p><b>用于创建&nbspDTM&nbsp的立体图像对数：</b>' + feature.get('num_stereo') + '</p>'
            + '<p><b>图像特征：</b>' + feature.get('features') + '</p>'
            + '<p><b>URL：</b><a href=\'' + feature.get('url') + '\' target=\'_blank\'>' + feature.get('url') + '</a></p>'
            + '</div>';
    }
    else if (clicktype == "display1_NAC_PHO_SITES_180") {
        text[0] = '<b>光度序列图像位置</b>';
        text[1] = '<div><p><b>站点名称：</b>' + feature.get('sitename') + '</p>'
            + '<p><b>PDS&nbsp站点名称：</b>' + feature.get('PDS_Name') + '</p>'
            + '<p><b>图片数量：</b>' + feature.get('Image_num') + '</p>'
            + '<p><b>DTM&nbsp名称：</b>' + feature.get('DTM_NAME') + '</p>'
            + '<p><b>中心经度：</b>' + feature.get('Center_lon') + '°</p>'
            + '<p><b>中心纬度：</b>' + feature.get('Center_lat') + '°</p>'
            + '<p><b>入射角范围：</b>' + feature.get('Min_Inc') + '&nbsp-&nbsp' + feature.get('Max_Inc') + '°</p>'
            + '<p><b>发射角范围：</b>' + feature.get('Min_Emiss') + '&nbsp-&nbsp' + feature.get('Max_Emiss') + '°</p>'
            + '<p><b>相位角范围：</b>' + feature.get('Min_Phase') + '&nbsp-&nbsp' + feature.get('Max_Phase') + '°</p>'
            + '<p><b>开始时间：</b>' + feature.get('Start_Date') + '</p>'
            + '<p><b>结束时间：</b>' + feature.get('End_Date') + '</p>'
            + '<p><b>URL：</b><a href=\'' + feature.get('URL') + '\' target=\'_blank\'>' + feature.get('URL') + '</a></p>'
            + '</div>';
    }
    else if (clicktype == "display1_POLAR_SCARP_LOCATIONS_180") {
        text[0] = '<b>极区叶状陡坎</b>';
        text[1] = '<div><p><b>名称：</b>' + feature.get('NAME') + '</p>'
            + '<p><b>经度：</b>' + feature.get('LON') + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('LAT') + '°</p>'
            + '<p><b>含该陡坡的&nbspNAC&nbsp图像：</b>' + feature.get('LROC_IMGS') + '</p>'
            + '<p><b>NAC&nbsp立体观测：</b>' + (feature.get('STEREO_PRS') == '' ? '/' : feature.get('STEREO_PRS')) + '</p>'
            + '<p><b>陡坡数量：</b>' + (feature.get('INDORCLUST') == '' ? '/' : feature.get('INDORCLUST')) + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_STEREO_OBSERVATIONS_180") {
        var ASCORDESC, FLIGHT_DIR;
        if (feature.get('ASCORDESC') == 'A') {
            ASCORDESC = '增加';
        } else {
            ASCORDESC = '减少';
        }
        if (feature.get('FLIGHT_DIR') == '+X') {
            FLIGHT_DIR = '增加';
        } else {
            FLIGHT_DIR = '减少';
        }
        text[0] = '<b>立体观测区域</b>';
        text[1] = '<div><p><b>图像编号：</b>' + feature.get('IMAGE_NAME') + '</p>'
            + '<p><b>PDS&nbsp产品版本&nbspID：</b>' + feature.get('VERSION_ID') + '</p>'
            + '<p><b>轨道编号：</b>' + feature.get('ORBIT_NUM') + '</p>'
            + '<p><b>飞行器旋转角度：</b>' + feature.get('SLEW_ANGLE') + '°</p>'
            + '<p><b>任务阶段：</b>' + feature.get('MISSION') + '</p>'
            + '<p><b>质量&nbspID：</b>' + feature.get('QUALITY_ID') + '</p>'
            + '<p><b>开始拍摄时间：</b>' + feature.get('START_TIME') + '</p>'
            + '<p><b>每条曝光时间：</b>' + feature.get('EXP_TIME') + '</p>'
            + '<p><b>条数：</b>' + feature.get('LINES') + '</p>'
            + '<p><b>样本数量：</b>' + feature.get('SAMPLES') + '</p>'
            + '<p><b>宽：1&nbsppx&nbsp=&nbsp</b>' + feature.get('PX_WIDTH') + '&nbspm</p>'
            + '<p><b>长：1&nbsppx&nbsp=&nbsp</b>' + feature.get('PX_HEIGHT') + '&nbspm</p>'
            + '<p><b>平均分辨率：</b>' + feature.get('RESOLUTION') + '&nbspm/px</p>'
            + '<p><b>发射角度：</b>' + feature.get('EMISSN_ANG') + '°</p>'
            + '<p><b>入射角度：</b>' + feature.get('INCID_ANG') + '°</p>'
            + '<p><b>相位角：</b>' + feature.get('PHASE_ANG') + '°</p>'
            + '<p><b>太阳高度角：</b>' + feature.get('SUBSOL_AZI') + '°</p>'
            + '<p><b>太阳所处经度：</b>' + feature.get('SUBSOL_LON') + '°</p>'
            + '<p><b>太阳所处纬度：</b>' + feature.get('SUBSOL_LAT') + '°</p>'
            + '<p><b>轨道器所处经度：</b>' + feature.get('SUB_SC_LON') + '°</p>'
            + '<p><b>轨道器所处纬度：</b>' + feature.get('SUB_SC_LAT') + '°</p>'
            + '<p><b>图像中心经度：</b>' + feature.get('CENTER_LON') + '°</p>'
            + '<p><b>图像中心纬度：</b>' + feature.get('CENTER_LAT') + '°</p>'
            + '<p><b>轨道器海拔：</b>' + feature.get('ALTITUDE') + '°</p>'
            + '<p><b>轨道器地平高度角：</b>' + ASCORDESC + '</p>'
            + '<p><b>轨道器海拔：</b>' + FLIGHT_DIR + '</p>'
            + '<p><b>图像左上角坐标：</b>（' + feature.get('UL_LON') + '°，&nbsp' + feature.get('UL_LAT') + '°）</p>'
            + '<p><b>图像右上角坐标：</b>（' + feature.get('UR_LON') + '°，&nbsp' + feature.get('UR_LAT') + '°）</p>'
            + '<p><b>图像左下角坐标：</b>（' + feature.get('LL_LON') + '°，&nbsp' + feature.get('LL_LAT') + '°）</p>'
            + '<p><b>图像右下角坐标：</b>（' + feature.get('LR_LON') + '°，&nbsp' + feature.get('LR_LAT') + '°）</p>'
            + '<p><b>URL：</b><a href=\'' + feature.get('URL') + '\' target=\'_blank\'>' + feature.get('URL') + '</a></p>'
            + '</div>';
    }
    else if (clicktype == "display1_WRINKLE_RIDGES_180") {
        text[0] = '<b>皱脊</b>';
        text[1] = '<div><p><b>起始坐标：</b>（' + feature.get('start_lon').toFixed(2) + '°，&nbsp' + feature.get('start_lat').toFixed(2) + '°）</p>'
            + '<p><b>结束坐标：</b>（' + feature.get('end_lon').toFixed(2) + '°，&nbsp' + feature.get('end_lat').toFixed(2) + '°）</p>'
            + '</div>';
    }
    else if (clicktype == "display1_月海玄武岩") {
        text[0] = '<b>全月月海玄武岩单元划分</b>';
        text[1] = '<div><p><b>熔岩流单元：</b>' + feature.get('Unit') + '</p>'
            + '<p><b>岩石类型：</b>' + feature.get('Class') + '</p>'
            + '<p><b>地质体代号：</b>' + feature.get('Geobody') + '</p>'
            + '<p><b>面积：</b>' + feature.get('Area') + '&nbspkm<sup>2</sup></p>'
            + '<p><b>模式年龄&nbsp1：</b>' + (feature.get('ModelAge1') == '' ? '/' : feature.get('ModelAge1') + '&nbspGa') + '</p>'
            + '<p><b>模式年龄&nbsp2：</b>' + (feature.get('ModelAge2') == '' ? '/' : feature.get('ModelAge2') + '&nbspGa') + '</p>'
            + '<p><b>模式年龄&nbsp3：</b>' + (feature.get('ModelAge3') == '' ? '/' : feature.get('ModelAge3') + '&nbspGa') + '</p>'
            + '<p><b>创建时间：</b>' + feature.get('Created_T') + '</p>'
            + '<p><b>修改时间：</b>' + feature.get('Modified_T') + '</p>'
            + '<p><b>模式年龄&nbspL：</b>' + (feature.get('ModelAge_L') == '' ? '/' : feature.get('ModelAge_L') + '&nbspGa') + '</p>'
            + '<p><b>要素标识号：</b>' + feature.get('Feature_ID') + '</p>'
            + '<p><b>所属盆地：</b>' + (feature.get('Host_Basin') == '' ? '/' : feature.get('Host_Basin') + '&nbspGa') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_MOON_nomenclature_center_pts_180") {
        var code = feature.get('code');
        var type_name;
        if (code == 'AA') {
            type_name = 'Crater,&nbspcraters';
        } else if (code == 'AL') {
            type_name = 'Albedo&nbspFeature';
        } else if (code == 'CA') {
            type_name = 'Catena,&nbspcatenae';
        } else if (code == 'DO') {
            type_name = 'Dorsum,&nbspdorsa';
        } else if (code == 'LC') {
            type_name = 'Lacus,&nbsplacūs';
        } else if (code == 'LF') {
            type_name = 'Landing&nbspsite&nbspname';
        } else if (code == 'ME') {
            type_name = 'Mare,&nbspmaria';
        } else if (code == 'MO') {
            type_name = 'Mons,&nbspmontes';
        } else if (code == 'OC') {
            type_name = 'Oceanus,&nbspoceani';
        } else if (code == 'PA') {
            type_name = 'Palus,&nbsppaludes';
        } else if (code == 'PL') {
            type_name = 'Planitia,&nbspplanitiae';
        } else if (code == 'PR') {
            type_name = 'Promontorium,&nbsppromontoria';
        } else if (code == 'RI') {
            type_name = 'Rima,&nbsprimae';
        } else if (code == 'RU') {
            type_name = 'Rupes,&nbsprupēs';
        } else if (code == 'SF') {
            type_name = 'Satellite&nbspFeature';
        } else if (code == 'SI') {
            type_name = 'Sinus,&nbspsinūs';
        } else if (code == 'VA') {
            type_name = 'Vallis,&nbspvalles';
        }
        text[0] = '<b>已命名撞击坑</b>';
        text[1] = '<div><p><b>名称：</b>' + feature.get('name') + '</p>'
            + '<p><b>批准时间：</b>' + feature.get('approvaldt') + '</p>'
            + '<p><b>批准状态：</b>' + feature.get('approval') + '</p>'
            + '<p><b>名称类型：</b>' + type_name + '</p>'
            + '<p><b>来源国家：</b>' + (feature.get('ethnicity') == '' ? '/' : feature.get('ethnicity') + ',&nbsp' + feature.get('continent')) + '</p>'
            + '<p><b>名称起源：</b>' + feature.get('origin') + '</p>'
            + '<p><b>撞击坑直径：</b>' + feature.get('diameter') + '&nbspkm</p>'
            + '<p><b>中心经度：</b>' + feature.get('center_lon') + '°</p>'
            + '<p><b>中心纬度：</b>' + feature.get('center_lat') + '°</p>'
            + '<p><b>经度范围：</b>' + feature.get('min_lon') + '&nbsp-&nbsp' + feature.get('max_lon') + '°</p>'
            + '<p><b>纬度范围：</b>' + feature.get('min_lat') + '&nbsp-&nbsp' + feature.get('max_lat') + '°</p>'
            + '<p><b>所属区域名称：</b>' + feature.get('quad_name') + '</p>'
            + '<p><b>所属区域编号：</b>' + feature.get('quad_code') + '</p>'
            + '<p><b>链接：</b><a href=\'' + feature.get('link') + '\' target=\'_blank\'>' + feature.get('link') + '</a></p>'
            + '</div>';
    }
    else if (clicktype == "display1_Head_2010_LolaLargeLunarCraterCatalog_poly") {
        text[0] = '<b>>20km大撞击坑</b>';
        text[1] = '<div>'
            + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '<p><b>经度：</b>' + feature.get('x_coord').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('y_coord').toFixed(2) + '°</p>'
            + '<p><b>标签：</b>' + feature.get('tag') + '</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Povilaitis_2018_LROC_5TO20KM_CRATERS_180_PTS") {
        text[0] = '<b>5-20km撞击坑</b>';
        text[1] = '<div>'
            + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '<p><b>经度：</b>' + feature.get('x_coord').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('y_coord').toFixed(2) + '°</p>'
            + '</div>';
    }
    else if (clicktype == "display1_Robbins_2019_lon_180_lat_diam_a_b_ecc_ell_ang") {
        text[0] = '<b>>1km撞击坑（Robbins）</b>';
        if (feature.get('Field8') == 0) {
            text[1] = '<div>'
                + '<p><b>经度（圆拟合）：</b>' + feature.get('Field2').toFixed(2) + '°</p>'
                + '<p><b>纬度（圆拟合）：</b>' + feature.get('Field3').toFixed(2) + '°</p>'
                + '<p><b>直径（圆拟合）：</b>' + feature.get('Field6').toFixed(2) + '&nbspkm</p>'
                + '<p><b>经度（椭圆拟合）：</b>/</p>'
                + '<p><b>纬度（椭圆拟合）：</b>/</p>'
                + '<p><b>长轴（椭圆拟合）：</b>/</p>'
                + '<p><b>短轴（椭圆拟合）：</b>/</p>'
                + '<p><b>离心率（椭圆拟合）：</b>/</p>'
                + '<p><b>椭率（椭圆拟合）：</b>/</p>'
                + '<p><b>倾斜角（椭圆拟合）：</b>/</p>'
                + '</div>';
        } else {
            text[1] = '<div>'
                + '<p><b>经度（圆拟合）：</b>' + feature.get('Field2').toFixed(2) + '°</p>'
                + '<p><b>纬度（圆拟合）：</b>' + feature.get('Field3').toFixed(2) + '°</p>'
                + '<p><b>直径（圆拟合）：</b>' + feature.get('Field6').toFixed(2) + '&nbspkm</p>'
                + '<p><b>经度（椭圆拟合）：</b>' + feature.get('Field4').toFixed(2) + '°</p>'
                + '<p><b>纬度（椭圆拟合）：</b>' + feature.get('Field5').toFixed(2) + '°</p>'
                + '<p><b>长轴（椭圆拟合）：</b>' + parseFloat(feature.get('Field7')).toFixed(2) + '&nbspkm</p>'
                + '<p><b>短轴（椭圆拟合）：</b>' + feature.get('Field8').toFixed(2) + '&nbspkm</p>'
                + '<p><b>离心率（椭圆拟合）：</b>' + parseFloat(feature.get('Field9')).toFixed(2) + '</p>'
                + '<p><b>椭率（椭圆拟合）：</b>' + feature.get('Field10').toFixed(2) + '</p>'
                + '<p><b>倾斜角（椭圆拟合）：</b>' + feature.get('Field11').toFixed(2) + '°</p>'
                + '</div>';
        }
    }
    else if (clicktype == "display1_LU1319373_Wang_Wu_2021") {
        text[0] = '<b>>1km撞击坑（Wang）</b>';
        text[1] = '<div>'
            + '<p><b>经度：</b>' + feature.get('Lonitude_d') + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Latitude_d') + '°</p>'
            + '<p><b>直径：</b>' + feature.get('Diameter_m') + '&nbspm</p>'
            + '<p><b>深度：</b>' + (feature.get('Depth_m_') == 0 ? '/' : feature.get('Depth_m_') + '&nbspm') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_Salamuniccar_2014_LU78287GT_Moon2000") {
        text[0] = '<b>撞击坑（Salamunićcar）</b>';
        text[1] = '<div><p><b>名称：</b>' + feature.get('Name') + '</p>'
            + '<p><b>经度：</b>' + feature.get('Lon_E').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Lat').toFixed(2) + '°</p>'
            + '<p><b>半径：</b>' + feature.get('Radius_deg').toFixed(4) + '°&nbsp/&nbsp' + feature.get('Radius_km').toFixed(4) + '&nbspkm</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Ohman_2015_crater") {
        text[0] = '<b>撞击坑（Ohman）</b>';
        text[1] = '<div><p><b>名称：</b>' + feature.get('1Name') + '</p>'
            + '<p><b>经度：</b>' + feature.get('4LON') + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('3LAT') + '°</p>'
            + '<p><b>直径：</b>' + feature.get('2Diameter_') + '&nbspkm</p>'
            + '<p><b>表观直径：</b>' + feature.get('8Appar_D') + '&nbspkm</p>'
            + '<p><b>瞬态空腔直径：</b>' + feature.get('9Trans_D_s') + '&nbspkm</p>'
            + '<p><b>坑底直径：</b>' + (feature.get('11Floor_D') == 0 ? '/' : feature.get('11Floor_D') + '&nbspkm') + '</p>'
            + '<p><b>坑缘相对坑底深度：</b>' + (feature.get('13rim_dept') == 0 ? '/' : feature.get('13rim_dept') + '&nbspkm') + '</p>'
            + '<p><b>表观深度：</b>' + feature.get('14Appar_de') + '&nbspkm</p>'
            + '<p><b>瞬态空腔深度：</b>' + feature.get('15Trans_de') + '&nbspkm</p>'
            + '<p><b>中央峰高度：</b>' + (feature.get('20height_c') == 0 ? '/' : feature.get('20height_c') + '&nbspkm') + '</p>'
            + '<p><b>中央峰直径：</b>' + (feature.get('21D_cp') == 0 ? '/' : feature.get('21D_cp') + '&nbspkm') + '</p>'
            + '<p><b>中央峰面积：</b>' + (feature.get('22Basal_ar') == 0 ? '/' : feature.get('22Basal_ar') + '&nbspkm<sup>2</sup>') + '</p>'
            + '<p><b>一倍半径内溅射物厚度：</b>' + feature.get('25Thick_ej') + '&nbspm</p>'
            + '<p><b>两倍半径内溅射物厚度：</b>' + feature.get('26Thick_ej') + '&nbspm</p>'
            + '<p><b>三倍半径内溅射物厚度：</b>' + feature.get('27Thick_ej') + '&nbspm</p>'
            + '<p><b>四倍半径内溅射物厚度：</b>' + feature.get('28Thick_ej') + '&nbspm</p>'
            + '<p><b>五倍半径内溅射物厚度：</b>' + feature.get('29Thick_ej') + '&nbspm</p>'
            + '<p><b>辐射亮纹半径：</b>' + feature.get('40r_radar_') + '&nbspkm</p>'
            + '<p><b>辐射暗纹半径：</b>' + feature.get('42r_radar_') + '&nbspkm</p>'
            + '<p><b>年代：</b>' + (feature.get('51Age') == '' ? '/' : feature.get('51Age')) + '</p>'
            + '<p><b>附注：</b>' + (feature.get('53Remarks') == '' ? '/' : feature.get('53Remarks')) + '</p>'
            + '<p><b>年龄来源：</b>' + (feature.get('54Age_sour') == '' ? '/' : feature.get('54Age_sour')) + '</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Yang_crater") {
        text[0] = '<b>撞击坑（Yang）</b>';
        text[1] = '<div>'
            + '<p><b>经度：</b>' + feature.get('Lon').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Lat').toFixed(2) + '°</p>'
            + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Singer_2020_Copernicus") {
        text[0] = '<b>哥白尼二次坑</b>';
        text[1] = '<div>'
            + '<p><b>经度：</b>' + feature.get('Lon_deg').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Lat_deg').toFixed(2) + '°</p>'
            + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Singer_2020_Kepler") {
        text[0] = '<b>开普勒二次坑</b>';
        text[1] = '<div>'
            + '<p><b>经度：</b>' + feature.get('Lon_deg').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Lat_deg').toFixed(2) + '°</p>'
            + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Singer_2020_Orientale") {
        text[0] = '<b>东海二次坑（Singer）</b>';
        text[1] = '<div>'
            + '<p><b>经度：</b>' + feature.get('Lon_deg').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Lat_deg').toFixed(2) + '°</p>'
            + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Guo_2018_full_secondaries") {
        text[0] = '<b>东海二次坑（Guo）</b>';
        text[1] = '<div>'
            + '<p><b>经度：</b>' + feature.get('LONGITUDE').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('LATITUDE').toFixed(2) + '°</p>'
            + '<p><b>直径：</b>' + feature.get('DIAMETER').toFixed(2) + '&nbspkm</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Wu_2019_3k_up") {
        text[0] = '<b>东海二次坑（Wu）</b>';
        text[1] = '<div>'
            + '<p><b>经度：</b>' + feature.get('Field2').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('Field3').toFixed(2) + '°</p>'
            + '</div>';

    }
    else if (clicktype == "display1_Qian_CE5_Craters_4145N4969W") {
        text[0] = '<b>CE5着陆区撞击坑（qian）</b>';
        text[1] = '<div>'
            + '<p><b>直径：</b>' + feature.get('Diam_km') + '&nbspkm</p>'
            + '<p><b>经度：</b>' + feature.get('x_coord').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('y_coord').toFixed(2) + '°</p>'
            + '<p><b>标签：</b>' + feature.get('tag') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_Yue_2022_CRATER_ce5_crater_combine") {
        text[0] = '<b>CE5着陆区撞击坑（Yue）</b>';
        text[1] = '<div>'
            + '<p><b>直径：</b>' + feature.get('Diam_km') + '&nbspkm</p>'
            + '<p><b>经度：</b>' + feature.get('x_coord').toFixed(2) + '°</p>'
            + '<p><b>纬度：</b>' + feature.get('y_coord').toFixed(2) + '°</p>'
            + '<p><b>标签：</b>' + feature.get('tag') + '</p>'
            + '</div>';
    }
    else if (clicktype == "display1_Simple_mare_merge_Polyline") {
        text[0] = '<b>简单撞击坑-月海</b>';
        text[1] = '<div>'
            + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (clicktype == "display1_Simple_highland_merge_Polyline") {
        text[0] = '<b>简单撞击坑-高地</b>';
        text[1] = '<div>'
            + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (clicktype == "display1_Intermediate_mare_craterrim_merge_line") {
        text[0] = '<b>过渡型撞击坑-月海</b>';
        text[1] = '<div>'
            + '<p>什么也没有</p>'
            + '</div>';
    }
    else if (clicktype == "display1_Intermediate_highland_craterrim_merge_line") {
        text[0] = '<b>过渡型撞击坑-高地</b>';
        text[1] = '<div>'
            + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (clicktype == "display1_Complex_mare_rim_erasefloor") {
        text[0] = '<b>复杂撞击坑坑壁-月海</b>';
        text[1] = '<div>'
            + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (clicktype == "display1_Complex_mare_floor_erasePeak") {
        text[0] = '<b>复杂撞击坑坑底-月海</b>';
        text[1] = '<div>'
            + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (clicktype == "display1_Complex_highland_rim_erasefloor") {
        text[0] = '<b>复杂撞击坑坑壁-高地</b>';
        text[1] = '<div>'
            + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (clicktype == "display1_Complex_highland_floor_erasePeak") {
        text[0] = '<b>复杂撞击坑坑底-高地</b>';
        text[1] = '<div>'
            + '<p>什么也没有</p>'
            + '</div>';
    }

    return text;
}
//悬浮弹窗文字
function display1Popup_move_text(movetype, feature) {
    var text = '<div style="padding:6px;font-size:12px;color:rgba(255,255,255,0.8);background-color:rgba(0,0,0,0.5);border-radius:5px;">';

    if (movetype == "display1_ANTHROPOGENIC_OBJECTS_180") {
        text = text + '<p><b>简称：</b>' + feature.get('SHORT_NAME') + '</p>'
            + '<p><b>半径：</b>' + feature.get('RADIUS') + '&nbspm</p>'
            + '</div>';
    }
    else if (movetype == "display1_CONTROLLED_MOSAICS_180") {
        text = text + '<p><b>PDS&nbsp站点名称：</b>' + feature.get('NAME') + '</p>'
            + '<p><b>拍摄完成日期：</b>' + (feature.get('PROJ_DATE') === null ? '/' : feature.get('PROJ_DATE')) + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_COPERNICAN_CRATERS_180") {
        text = text + '<p><b>名称：</b>' + feature.get('NAME') + '</p>'
            + '<p><b>直径：</b>' + feature.get('DIAM_KM').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_CX_TARGETS_180") {
        text = text + '<p><b>站点名称：</b>' + feature.get('Site') + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_FEATURED_MOSAICS_180") {
        text = text + '<p><b>图像编号：</b>' + feature.get('IMAGE_NAME') + '</p>'
            + '<p><b>开始拍摄时间：</b>' + feature.get('START_TIME') + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_HIESINGER2011_MARE_AGE_UNITS_180") {
        text = text + '<p><b>单元名称：</b>' + feature.get('Unit') + '</p>'
            + '<p><b>模式年龄：</b>' + feature.get('Model_Age') + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_HIESINGER2011_MARE_CRATER_COUNT_AREAS_180") {
        text = text + '<p><b>模式年龄：</b>' + (feature.get('Model_Age') == '' ? '/' : feature.get('Model_Age')) + '</p>'
            + '</div>';
    }
    /*else if (movetype == "display1_LOBATE_SCARPS_180") {
        text = text + '<p><b>起始坐标：</b>（' + feature.get('lon_start') + '&nbsp°，&nbsp' + feature.get('lat_start') + '&nbsp°）</p>'
            + '<p><b>结束坐标：</b>（' + feature.get('lon_end') + '&nbsp°，&nbsp' + feature.get('lat_end') + '&nbsp°）</p>'
            + '</div>';
    }*/
    else if (movetype == "display1_LROC_5TO20KM_CRATERS_180") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km') + '&nbspkm</p>' + '<p><b>岩石类型：</b>' + feature.get('Class') + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_LROC_GLOBAL_MARE_180") {
        text = text + '<p><b>月海名称：</b>' + feature.get('MARE_NAME') + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_LUNAR_IMP_LOCATIONS_180") {
        text = text + '<p><b>名称：</b>' + feature.get('NAME') + '</p>'
            + '<p><b>长度：</b>' + feature.get('LENGTH') + '&nbspm</p>'
            + '</div>';
    }
    else if (movetype == "display1_LUNAR_PIT_LOCATIONS_180") {
        text = text + '<p><b>名称：</b>' + feature.get('Name') + '</p>'
            + '<p><b>所属地形：</b>' + feature.get('Terrain') + '</p>'
            + '<p><b>所属区域：</b>' + feature.get('HostFeatur') + '</p>'
            + '</div>';
    }
    /*else if (movetype == "display1_LUNAR_SWIRLS_180") {
        text = '<div style="padding:6px;width:140px;font-size:12px;color:rgba(255,255,255,0.8);background-color:rgba(0,0,0,0.5);border-radius:5px;">'
            + '</div>';
    }*/
    else if (movetype == "display1_NAC_DTMS_180") {
        text = text + '<p><b>PDS&nbsp站点名称：</b>' + feature.get('DTM_NAME') + '</p>'
            + '<p><b>覆盖面积：</b>' + feature.get('cov_sqkm') + '&nbspkm<sup>2</sup></p>'
            + '</div>';
    }
    else if (movetype == "display1_NAC_PHO_SITES_180") {
        text = text + '<p><b>站点名称：</b>' + feature.get('sitename') + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_POLAR_SCARP_LOCATIONS_180") {
        text = text + '<p><b>名称：</b>' + feature.get('NAME') + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_STEREO_OBSERVATIONS_180") {
        text = '<div style="padding:6px;width:140px;font-size:12px;color:rgba(255,255,255,0.8);background-color:rgba(0,0,0,0.5);border-radius:5px;">'
            + '<p><b>图像编号：</b>' + feature.get('IMAGE_NAME') + '</p>'
            + '<p><b>开始拍摄时间：</b>' + feature.get('START_TIME') + '</p>'
            + '</div>';
    }
    /*else if (movetype == "display1_WRINKLE_RIDGES_180") {
        text = text + '<p><b>起始坐标：</b>（' + feature.get('start_lon') + '&nbsp°，&nbsp' + feature.get('start_lat') + '&nbsp°）</p>'
            + '<p><b>结束坐标：</b>（' + feature.get('end_lon') + '&nbsp°，&nbsp' + feature.get('end_lat') + '&nbsp°）</p>'
            + '</div>';
    }*/
    else if (movetype == "display1_月海玄武岩") {
        text = text + '<p><b>单元面积：</b>' + feature.get('Area') + '&nbspkm<sup>2</sup></p>'
            + '<p><b>岩石类型：</b>' + feature.get('Class') + '</p>'
            + '<p><b>模式年龄：</b>' + (feature.get('ModelAge_L') == '' ? '/' : feature.get('ModelAge_L') + '&nbspGa') + '</p></div>';
    }
    else if (movetype == "display1_MOON_nomenclature_center_pts_180") {
        text = text + '<p><b>名称：</b>' + feature.get('name') + '</p>'
            + '<p><b>直径：</b>' + feature.get('diameter').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Head_2010_LolaLargeLunarCraterCatalog_poly") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Povilaitis_2018_LROC_5TO20KM_CRATERS_180_PTS") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Robbins_2019_lon_180_lat_diam_a_b_ecc_ell_ang") {
        text = text + '<p><b>直径：</b>' + feature.get('Field6').toFixed(2) + '&nbspkm</p>'
            + '<p><b>离心率：</b>' + (parseFloat(feature.get('Field9')) == 0 ? '/' : parseFloat(feature.get('Field9')).toFixed(2)) + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_LU1319373_Wang_Wu_2021") {
        text = text + '<p><b>直径：</b>' + feature.get('Diameter_m').toFixed(2) + '&nbspm</p>'
            + '<p><b>深度：</b>' + (feature.get('Depth_m_') == 0 ? '/' : feature.get('Depth_m_') + '&nbspm') + '</p>'
            + '</div>';
    }
    else if (movetype == "display1_Salamuniccar_2014_LU78287GT_Moon2000") {
        text = text + '<p><b>半径：</b>' + feature.get('Radius_km').toFixed(4) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Ohman_2015_crater") {
        text = text + '<p><b>名称：</b>' + feature.get('1Name') + '</p>'
            + '<p><b>直径：</b>' + feature.get('2Diameter_').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Yang_crater") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Singer_2020_Copernicus") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Singer_2020_Kepler") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Singer_2020_Orientale") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Guo_2018_full_secondaries") {
        text = text + '<p><b>直径：</b>' + feature.get('DIAMETER').toFixed(2) + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Qian_CE5_Craters_4145N4969W") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km') + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Yue_2022_CRATER_ce5_crater_combine") {
        text = text + '<p><b>直径：</b>' + feature.get('Diam_km') + '&nbspkm</p>'
            + '</div>';
    }
    else if (movetype == "display1_Simple_mare_merge_Polyline") {
        text = text + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (movetype == "display1_Simple_highland_merge_Polyline") {
        text = text + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (movetype == "display1_Intermediate_highland_craterrim_merge_line") {
        text = text + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (movetype == "display1_Complex_mare_rim_erasefloor") {
        text = text + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (movetype == "display1_Complex_mare_floor_erasePeak") {
        text = text + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }
    else if (movetype == "display1_Complex_highland_rim_erasefloor") {
        text = text + '<p><b>面积：</b>' + feature.get('Area') + '&nbspm<sup>2</sup></p>'
            + '</div>';
    }


    return text;
}

function rightsidebar_close() {
    $("#rightsidebar").hide("slide", { direction: "right" }, 1000);
}
/*** 弹窗显示 END ***/

/*** 目录or图层 START ***/
function content_or_layer() {
    if (display1_show == 'content') {  //若想以图层显示
        document.getElementById('display_first_content').style.display = 'none';
        document.getElementById('display_first_layer').style.display = '';
        display1_layer_show();  //显示ul中子元素
        display1_show = 'layer';  //显示为图层
        document.getElementById('content_or_layer').innerHTML = '按目录';
    }
    else {  //若想以目录显示
        document.getElementById('display_first_content').style.display = '';
        document.getElementById('display_first_layer').style.display = 'none';
        display1_show = 'content';  //显示为目录
        document.getElementById('content_or_layer').innerHTML = '按图层';
    }
}
function display1_layer_show() {
    var ul = document.getElementById('display_first_layer_ul');  //获取layer的ul元素

    // 循环删除 ul 的所有子元素
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    //添加新li
    for (i = OverLayers_num - 1; i >= 0; i--) {
        //添加li
        var li = document.createElement('li');
        li.draggable = true;
        if (OverLayers_name[i][1] != 'tif') {
            li.innerHTML = '<input name="display1_layers_2" type="checkbox" value="' + OverLayers_name[i][0] + '" style="background-color: ' + OverLayers_name[i][3] + ';"  ondblclick="color_change(this, \'' + OverLayers_name[i][1] + '\')"/><label>' + OverLayers_name[i][2] + '</label>';
        } else {
            li.innerHTML = '<input name="display1_layers_2" type="checkbox" value="' + OverLayers_name[i][0] + '" style="background-color: #B0C4DE;"  ondblclick="color_change(this, \'' + OverLayers_name[i][1] + '\')"/><label>' + OverLayers_name[i][2] + '</label>';
        }
        ul.appendChild(li);
    }

    //是否存在于该图层
    if (po_now == 'ESRI:104903') {
        a = 1;
    } else if (po_now = 'ESRI:104903') {
        a = 2;
    } else if (po_now = 'ESRI:104903') {
        a = 3;
    } else if (po_now = 'ESRI:104903') {
        a = 4;
    } else if (po_now = 'ESRI:104903') {
        a = 5;
    }
    ele_display_if_layer(a);

    //图层拖动交换顺序
    var dragged;
    ul.addEventListener('dragstart', function (e) {
        // 只有当拖动的是 li 元素时才进行操作
        if (e.target && e.target.nodeName === 'LI') {
            dragged = e.target;
        }
    });
    ul.addEventListener('dragover', function (e) {
        // 阻止默认行为，以启用 drop
        e.preventDefault();
    });
    ul.addEventListener('drop', function (e) {
        // 阻止默认行为
        e.preventDefault();

        var target = e.target;
        // 只有当目标是 li 元素时才进行元素交换
        while (target.nodeName !== 'LI' && target.nodeName !== 'BODY') {
            target = target.parentNode;
        }
        if (target && target.nodeName === 'LI') {
            ul.insertBefore(dragged, target.nextSibling);
        }

        //交换图层顺序
        change_layers_order();
    });
}

//图层交换顺序
function change_layers_order() {
    var display1_layers = document.getElementsByName('display1_layers_2');

    var OverLayers_new = new Array();
    var OverLayers_name_new = new Array();
    for (var i = OverLayers_num - 1; i >= 0; i--) {
        for (var j = 0; j < OverLayers_num; j++) {
            if (display1_layers[i].value == OverLayers_name[j][0]) {
                OverLayers_new[i] = OverLayers[j];
                OverLayers_name_new[i] = OverLayers_name[j];
                map.removeLayer(OverLayers[j]);
                map.addLayer(OverLayers[j]);
            }
        }
    }
    OverLayers = OverLayers_new;
    OverLayers_name = OverLayers_name_new;
}
/*** 目录or图层 END ***/

/*** 图层清空 START ***/
function layers_clear() {
    //移除图层
    for (var i = 0; i < OverLayers_num; i++) {
        map.removeLayer(OverLayers[i]);
    }

    //清除checkbox的颜色
    var display1_layers = document.getElementsByName('display1_layers');
    for (var i = 0; i < display1_layers.length; i++) {
        display1_layers[i].style.backgroundColor = 'white';
    }

    //初始化变量
    OverLayers = new Array();
    OverLayers_name = new Array();
    OverLayers_num = 0;
}
/*** 图层清空 END ***/


/*** 图层颜色更改 START ***/
function doubleClick(e, type) {
    //发生双击事件时禁止发生单击事件
    clearTimeout(timer);  // 清除单击事件的定时器
    if (e.target.checked == true) {
        color_change(e.target, type);  // 执行双击事件的处理函数
    }
}
/** PART1 color_change **/
function color_change(checkbox, type) {
    document.getElementById('color_change').style.display = '';

    var value = checkbox.value;
    var value_i;
    for (i = 0; i < OverLayers_num; i++) {
        if (OverLayers_name[i][0] == value) {
            value_i = i;
            break;
        }
    }

    var layer = OverLayers[value_i];
    if (type == 'point') {
        var color = rgbaToHex(layer.getStyle().getImage().getFill().getColor());
        var radius = layer.getStyle().getImage().getRadius();
        document.getElementById('color_change_content').innerHTML = '<p><label for="color_input">颜色设置：</label><input id="color_input" type="color" value="' + color[0] + '" /></p>'
            + '<p><label for="transpareant_input">透明度设置：</label><input id="transpareant_input" type="number" step="10" min="0" max="100" style="width:50px;" value="' + color[1] * 100 + '" />&nbsp%</p>'
            + '<p><label for="size_input">大小设置：</label><input id="size_input" type="number" step="1" min="0" style="width:50px;" value="' + radius + '">&nbsppx</p>';
    }
    else if (type == 'line') {
        var color = rgbaToHex(layer.getStyle().getStroke().getColor());
        var width = layer.getStyle().getStroke().getWidth();
        document.getElementById('color_change_content').innerHTML = '<p><label for="color_input">颜色设置：</label><input id="color_input" type="color" value="' + color[0] + '" /></p>'
            + '<p><label for="transpareant_input">透明度设置：</label><input id="transpareant_input" type="number" step="10" min="0" max="100" style="width:50px;" value="' + color[1] * 100 + '" />&nbsp%</p>'
            + '<p><label for="size_input">粗细设置：</label><input id="size_input" type="number" step="1" min="0" style="width:50px;" value="' + width + '" />&nbsppx</p>';
    }
    else if (type == 'area') {
        var color1 = rgbaToHex(layer.getStyle().getStroke().getColor());
        var color2 = rgbaToHex(layer.getStyle().getFill().getColor());
        var width = layer.getStyle().getStroke().getWidth();
        document.getElementById('color_change_content').innerHTML = '<p><label for="color_input1">边框颜色：</label><input id="color_input1" type="color" value="' + color1[0] + '" />&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
            + '<label for="color_input2">填充颜色：</label><input id="color_input2" type="color" value="' + color2[0] + '" /></p>'
            + '<p><label for="transpareant_input1">边框透明度：</label><input id="transpareant_input1" type="number" step="10" min="0" max="100" style="width:50px;" value="' + color1[1] * 100 + '" />&nbsp%&nbsp&nbsp&nbsp&nbsp'
            + '<label for="transpareant_input2">填充透明度：</label><input id="transpareant_input2" type="number" step="10" min="0" max="100" style="width:50px;" value="' + color2[1] * 100 + '" />&nbsp%</p>'
            + '<p><label for="size_input">边框粗细：</label><input id="size_input" type="number" step="1" min="0" style="width:50px;" value="' + width + '" />&nbsppx</p>';
    }
    else if (type == 'tif') {
        var opacity = layer.getOpacity();
        var color = OverLayers_name[value_i][3];
        // Magenta 255 0 255（粉）；Red 255 0 0（红）；Yellow 255 255 0（黄）；Lime 0 255 0（绿）；Cyan 0 255 255（青）；Blue 0 0 255（蓝）
        document.getElementById('color_change_content').innerHTML = '<p><div class="color_bar_select"><label>颜色：</label><span for="color_input"><div id="color_input_select" style="width:200px;margin:2px;background:linear-gradient(to right, ' + color + ');">&nbsp</div></span><ul id="color_input">'
            + '<li data-value="black,white" style="background: linear-gradient(to right, black, white);">&nbsp</li>'  // 黑白
            + '<li data-value="Red,white" style="background: linear-gradient(to right, Red, white);">&nbsp</li>'  // 红白
            + '<li data-value="Yellow,white" style="background: linear-gradient(to right, Yellow, white);">&nbsp</li>'  // 黄白
            + '<li data-value="Lime,white" style="background: linear-gradient(to right, Lime, white);">&nbsp</li>'  // 绿白
            + '<li data-value="Cyan,white" style="background: linear-gradient(to right, Cyan, white);">&nbsp</li>'  // 青白
            + '<li data-value="Blue,white" style="background: linear-gradient(to right, Blue, white);">&nbsp</li>'  // 蓝白
            + '<li data-value="Magenta,white" style="background: linear-gradient(to right, Magenta, white);">&nbsp</li>'  // 粉白
            + '<li data-value="red,yellow" style="background: linear-gradient(to right, red, yellow);">&nbsp</li>'  // 红黄
            + '<li data-value="blue,Lime" style="background: linear-gradient(to right, blue, Lime);">&nbsp</li>'  // 蓝绿
            + '<li data-value="red,yellow,Lime" style="background: linear-gradient(to right, red, yellow, Lime);">&nbsp</li>'  // 红黄绿
            + '<li data-value="red,yellow,blue" style="background: linear-gradient(to right, red, yellow, blue);">&nbsp</li>'  // 红黄蓝
            + '<li data-value="Red,Orange,Yellow,Cyan,DeepSkyBlue,Blue" style="background: linear-gradient(to right, Red, Orange, Yellow, Cyan, DeepSkyBlue, Blue);">&nbsp</li>'  // 彩虹
            + '</ul></div></p>'
            + '<p><label for="color_inversion">是否反转：</label><input id="color_inversion" type="checkbox" /></p>'
            + '<p><label for="transpareant_input">透明度：</label><input id="transpareant_input" type="number" step="10" min="0" max="100" style="width:50px;" value="' + opacity * 100 + '">&nbsp%</p>';

        var ul = document.getElementById('color_input');
        // 为 ul 添加点击事件监听器  
        ul.addEventListener('click', function (event) {
            // 检查事件的目标元素是否是 li 元素  
            if (event.target && event.target.nodeName === 'LI') { 
                var value = event.target.getAttribute('data-value');
                document.getElementById('color_input_select').style.background = 'linear-gradient(to right, ' + value + ')';
                OverLayers_name[value_i][3] = value;
            }
        });
    }

    document.getElementById('color_change_type').innerHTML = type;
    document.getElementById('color_change_value').innerHTML = value_i;

    color_change_move();
}
function color_change_close() {
    document.getElementById('color_change').style.display = 'none';
}
function color_change_confirm() {
    var type = document.getElementById('color_change_type').innerHTML;
    var value_i = document.getElementById('color_change_value').innerHTML;

    if (type == 'point') {
        var color = hexToRgba(document.getElementById('color_input').value, document.getElementById('transpareant_input').value / 100.0);
        var radius = document.getElementById('size_input').value;
        document.getElementById('color_change_color').innerHTML = document.getElementById('color_input').value;
        OverLayers_name[value_i][3] = color;
        OverLayers[value_i].getStyle().getImage().getFill().setColor(color);
        OverLayers[value_i].getStyle().getImage().setRadius(radius);
    }
    else if (type == 'line') {
        var color = hexToRgba(document.getElementById('color_input').value, document.getElementById('transpareant_input').value / 100.0);
        var radius = document.getElementById('size_input').value;
        document.getElementById('color_change_color').innerHTML = document.getElementById('color_input').value;
        OverLayers_name[value_i][3] = color;
        OverLayers[value_i].getStyle().getStroke().setColor(color);
        OverLayers[value_i].getStyle().getStroke().setWidth(radius);
    }
    else if (type == 'area') {
        var color1 = hexToRgba(document.getElementById('color_input1').value, document.getElementById('transpareant_input1').value / 100.0);
        var color2 = hexToRgba(document.getElementById('color_input2').value, document.getElementById('transpareant_input2').value / 100.0);
        var radius = document.getElementById('size_input').value;
        document.getElementById('color_change_color').innerHTML = document.getElementById('color_input1').value;
        OverLayers_name[value_i][3] = color1;
        OverLayers[value_i].getStyle().getStroke().setColor(color1);
        OverLayers[value_i].getStyle().getFill().setColor(color2);
        OverLayers[value_i].getStyle().getStroke().setWidth(radius);
    }
    else if (type == 'tif') {
        var opacity = document.getElementById('transpareant_input').value / 100.0;
        var invert = document.getElementById('color_inversion').checked;
        var color = OverLayers_name[value_i][3];
        document.getElementById('color_change_color').innerHTML = '#B0C4DE';
        if (invert) {
            var color_array = color.split(',');
            color_array.reverse();  // 顺序反转
            color = color_array.join(',');
            OverLayers_name[value_i][3] = color;
        }
        OverLayers_reset();  // 这确实不是一个很好的办法
        OverLayers[value_i].setOpacity(opacity);
    }

    var display1_layers = document.getElementsByName('display1_layers');
    for (var i = 0; i < display1_layers.length; i++) {
        if (OverLayers_name[value_i][0] == display1_layers[i].value) {
            display1_layers[i].style.backgroundColor = document.getElementById('color_change_color').innerHTML;
        }
    }
    var display1_layers_2 = document.getElementsByName('display1_layers_2');
    for (var i = 0; i < display1_layers_2.length; i++) {
        if (OverLayers_name[value_i][0]== display1_layers_2[i].value) {
            display1_layers_2[i].style.backgroundColor = document.getElementById('color_change_color').innerHTML;
        }
    }

    document.getElementById('color_change').style.display = 'none';

    OverLayers[value_i].getSource().refresh();  //刷新图层
}
// 颜色变换弹窗移动
function color_change_move() {
    var colorChange = document.getElementById('color_change');
    var colorChangeHead = document.getElementById('color_change_head');
    var isMoving = false;
    var offsetX, offsetY;

    colorChangeHead.onmousedown = function (e) {
        isMoving = true;
        offsetX = e.clientX - colorChange.offsetLeft;
        offsetY = e.clientY - colorChange.offsetTop;
    };
    document.onmousemove = function (e) {
        if (isMoving) {
            colorChange.style.left = e.clientX - offsetX + 'px';
            colorChange.style.top = e.clientY - offsetY + 'px';
        }
    };
    document.onmouseup = function () {
        isMoving = false;
    };
}
/*** 图层颜色更改 END ***/


/*** 栅格详细信息 START ***/
function rightsidebar_tif(liElement) {
    var checkbox = liElement.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
        rightsidebar_tif_show(checkbox.value);
    }
}
function rightsidebar_tif_show(tif_value) {
    // 获取数据
    var tif_data_num;
    for (i = 0; i < OverLayers_tif_num; i++) {
        if (OverLayers_tif_data[i][0] == tif_value) {
            tif_data_num = i;
            break;
        }
    }

    if (tif_data_num === undefined) {
        return false;
    }

    var layer_num;
    for (i = 0; i < OverLayers_num + 1; i++) {
        if (OverLayers_name[i][0] == tif_value) {
            layer_num = i;
            break;
        }
    }


    if (document.getElementById("rightsidebar").style.display == "none") {
        $("#rightsidebar").show("slide", { direction: "right" }, 1000);
    }
    rightsidebar_tif_text(tif_data_num, layer_num);
    
}
function rightsidebar_tif_text(tif_data_num, layer_num) {
    var text = new Array();
    text[0] = '<b>' + OverLayers_name[layer_num][2] + '</b>';
    text[1] = '<div><ul id="rightsiderbar_chart_head"><li id="chart_li1" style="background-color:#393942;border-bottom:0px #CCC solid;font-weight:bold;" onclick="rightsiderbar_chart_show(1)">计数统计</li><li id="chart_li2" onclick="rightsiderbar_chart_show(2)">经纬度统计</li></ul></div>'
        + '<br /><div id="rightsiderbar_chart1_all"><div id="rightsiderbar_chart1" style="width: 240px;height:250px;"></div>'  // 第一个图表
        + '<div id="rightsiderbar_colorbar" style="background:linear-gradient(to right, ' + OverLayers_name[layer_num][3] + ');">&nbsp</div>'
        + '<div id="rightsiderbar_min"></div><div id="rightsiderbar_max"></div></div>'
        + '<div id="rightsiderbar_chart2_all" style="display:none;"><div id="rightsiderbar_chart2" style="width: 230px;height:260px;"></div>'  // 第二个图表
        + '<button id="chart2_lon_lat" onclick="chart2_lon_lat_change(' + tif_data_num + ')">经度</button>'
        + '<button id="chart2_statistic" onclick="chart2_statistic_change(' + tif_data_num + ')">均值</button></div>'
        + '<div style="display:inline;font-size:17px;line-height:50px;margin-top:10px;"><b>高亮数值范围：</b></div>'  // 高亮显示
        + '<button id="rightsiderbar_highlight_ok" onclick="rightsiderbar_highlight_ok(' + tif_data_num + ')">显示</button>'
        + '<button id="rightsiderbar_highlight_no" onclick="rightsiderbar_highlight_no()">取消</button>'
        + '<div>&nbsp&nbsp&nbsp&nbsp<input id="rightsiderbar_highlight_min" type="number" step="1" style="width:85px;color:#000;" />&nbsp&nbsp-&nbsp&nbsp'
        + '<input id="rightsiderbar_highlight_max" type="number" step="1" style="width:85px;color:#000;" /></div>'
        + '<div style="display:inline;font-size:17px;line-height:45px;margin-top:10px;"><b>播放动画：</b></div>'  // 播放动画
        + '<button id="rightsiderbar_animate_ok" onclick="rightsiderbar_animate_ok(' + tif_data_num + ')">播放</button>'
        + '<button id="rightsiderbar_animate_no" onclick="rightsiderbar_animate_no()">取消</button>'
        + '<br />步长：<input id="rightsiderbar_animate_step" type="number" step="0.1" style="width:50px;color:#000;"/>'  // step和value待设置
        + '&nbsp&nbsp&nbsp&nbsp时间：<input id="rightsiderbar_animate_time" type="number" step="0.1" style="width:50px;color:#000;" value="0.1"/>&nbsps'
        + '<input type="range" id="rightsiderbar_animate_progress" min="0" max="100" value="0" step="1" style="display:none;">'
        + '<div id="rightsiderbar_animate_text" style="margin-top:10px;display:none;"></div>';

    document.getElementById('rightsidebar_content_1').style.height = '100%';
    document.getElementById('rightsidebar_head').innerHTML = text[0];
    document.getElementById('rightsidebar_content_1').innerHTML = text[1];

    rightsiderbar_chart1(tif_data_num);
    rightsiderbar_chart2(tif_data_num);
}

// 图表切换
function rightsiderbar_chart_show(i) {
    if (i == 1) {
        document.getElementById('rightsiderbar_chart1_all').style.display = '';
        document.getElementById('rightsiderbar_chart2_all').style.display = 'none';
        document.getElementById('chart_li1').style.backgroundColor = '#393942';
        document.getElementById('chart_li1').style.borderBottomWidth = '0px';
        document.getElementById('chart_li1').style.fontWeight = 'bold';
        document.getElementById('chart_li2').style.backgroundColor = '#808085';
        document.getElementById('chart_li2').style.borderBottomWidth = '1px';
        document.getElementById('chart_li2').style.fontWeight = 'normal';
    } else {
        document.getElementById('rightsiderbar_chart1_all').style.display = 'none';
        document.getElementById('rightsiderbar_chart2_all').style.display = '';
        document.getElementById('chart_li1').style.backgroundColor = '#808085';
        document.getElementById('chart_li1').style.borderBottomWidth = '1px';
        document.getElementById('chart_li1').style.fontWeight = 'normal';
        document.getElementById('chart_li2').style.backgroundColor = '#393942';
        document.getElementById('chart_li2').style.borderBottomWidth = '0px';
        document.getElementById('chart_li2').style.fontWeight = 'bold';
    }
}

// 生成图表
function rightsiderbar_chart1(tif_data_num) {
    var tif_data = OverLayers_tif_data[tif_data_num][1];

    // #region 计数统计图表
    // 1. 初始化最大值、最小值和计数数组  
    var minVal = Infinity;
    var maxVal = -Infinity;
    var binCounts = []; // 这里稍后根据区间数量初始化  

    // 遍历二维数组以确定最大值和最小值  
    tif_data.forEach(subArray => {
        subArray.forEach(value => {
            if (value < minVal && value != 0) minVal = value;
            if (value > maxVal) maxVal = value;
        });
    });

    var times = Math.pow(10, Math.floor(Math.log10(maxVal - minVal)) + 2);
    var minLabel = Math.floor(minVal * times) / times;
    var maxLabel = Math.ceil(maxVal * times) / times;

    // 2. 确定区间划分（这里简单划分为10个区间）  
    var numBins = 100;
    var binSize = (maxLabel - minLabel) / numBins;
    binCounts = Array(numBins); // 初始化计数数组  

    // 3. 生成x轴标签（区间名称）  
    //var binLabels = [];
    for (let i = 0; i < numBins; i++) {
        let start = minLabel + i * binSize;
        let end = minLabel + (i + 1) * binSize;
        //binLabels.push(`${start.toFixed(2)}-${end.toFixed(2)}`); // 保留一位小数以避免标签过长
        binCounts[i] = new Array(2).fill(0);
        binCounts[i][0] = (start + end) / 2.0;
    }

    // 4. 统计每个区间的数据个数  
    tif_data.forEach(subArray => {
        subArray.forEach(value => {
            var binIndex = Math.floor((value - minLabel) / binSize);
            if (binIndex >= 0 && binIndex < numBins) { // 确保索引在有效范围内  
                binCounts[binIndex][1]++;
            }
        });
    });

    // 5. 配置ECharts并生成直方图
    var myChart = echarts.init(document.getElementById('rightsiderbar_chart1'));
    var option = {
        title: {
            text: '',
            top: 15,
            textStyle: { fontSize: 17, color: '#FFF' }
        },
        grid: {
            left: 15
        },
        toolbox: {
            show: true,
            top: 18,
            left: 10,
            orient: 'horizontal',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                saveAsImage: { show: true }
            }
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'value',
            min: minLabel,
            max: maxLabel,
            name: "",
            axisLine: {
                lineStyle: {
                    type: 'solid', // 线条的类型  
                    color: '#FFF', // 线条颜色  
                }
            },
            axisLabel: {
                color: "#FFF"
            },
            splitLine: {
                show: true, // 显示网格线  
                lineStyle: {
                    color: '#808080', // 网格线颜色
                    type: 'dashed', // 线条类型，'solid'为实线，其他如'dashed'为虚线
                    width: 1 // 线条宽度  
                    // 更多lineStyle的配置项...  
                }
            }
        },
        yAxis: {
            name: "",
            axisLine: {
                lineStyle: {
                    type: 'solid', // 线条的类型  
                    color: '#FFF', // 线条颜色  
                }
            },
            axisTick: {
                show: false // 不显示刻度线  
            },
            axisLabel: {
                show: false // 不显示刻度标签  
            },
            splitLine: {
                show: true, // 显示网格线  
                lineStyle: {
                    color: '#808080', // 网格线颜色  
                    type: 'dashed', // 线条类型，'solid'为实线，其他如'dashed'为虚线
                    width: 1 // 线条宽度  
                    // 更多lineStyle的配置项...  
                }
            }
        },
        series: [{
            name: '计数',
            type: 'bar', // 图表类型为直方图
            showSymbol: false,
            data: binCounts, // Y轴数据
            color: '#4076B4',
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    //{ type: 'min', name: '最小值' }
                ]
            },
            /*markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }*/
        }]
    };

    // 使用刚指定的配置项和数据显示图表。  
    myChart.setOption(option);
    // #endregion

    // 显示最大最小值
    document.getElementById('rightsiderbar_min').innerHTML = minVal;
    document.getElementById('rightsiderbar_max').innerHTML = maxVal;

    // 设置动画步长
    document.getElementById('rightsiderbar_animate_step').step = times / 1000;
    document.getElementById('rightsiderbar_animate_step').value = times / 1000;

    // 设置高亮步长
    document.getElementById('rightsiderbar_highlight_min').step = times / 1000;
    document.getElementById('rightsiderbar_highlight_max').step = times / 1000;
    document.getElementById('rightsiderbar_highlight_min').value = (minLabel * 0.75 + maxLabel * 0.25).toFixed(2);
    document.getElementById('rightsiderbar_highlight_max').value = (minLabel * 0.25 + maxLabel * 0.75).toFixed(2);
}
function rightsiderbar_chart2(tif_data_num) {
    var tif_value = OverLayers_tif_data[tif_data_num][0];
    var tif_data = OverLayers_tif_data[tif_data_num][1];
    var lon_lat = document.getElementById('chart2_lon_lat').innerHTML;
    var statistic = document.getElementById('chart2_statistic').innerHTML;

    var extent_image = [-180.0, -90.0, 180.0, 90.0];
    if (tif_value == 'IIM_global_mosaic_20140326_new_geo_10X10_geo_cont_IBD_2b') {
        extent_image = [-180.1696, -78.2609, 181.0804, 79.2391];
    } else if (tif_value == 'WAC_TIO2_GCS_MB_NAN_HD') {
        extent_image = [-180, -70.2434, 180, 64.7566];
    }
    var times_image = [tif_data[0].length / (extent_image[2] - extent_image[0]), tif_data.length / (extent_image[3] - extent_image[1])];

    // 1. 统计各个经/纬度下的均/中值
    var binSize;
    var binArray = new Array();
    // 统计均值or中值（经度则转置）
    if (lon_lat == '经度') {
        tif_data = tif_data[0].map((_, colIndex) => tif_data.map(row => row[colIndex]));  // 取转置
        binSize = tif_data.length;
        if (statistic == '均值') {
            var sum = function (x, y) { return x + y; };  // 求和函数
            for (i = 0; i < binSize; i++) {
                binArray[i] = new Array(2);
                binArray[i][0] = i / times_image[0] + extent_image[0];
                var array = tif_data[i].filter(number => number !== 0);
                if (array.length == 0) {
                    binArray[i][1] = null;
                    continue;
                }
                binArray[i][1] = (array.reduce(sum) / array.length).toFixed(2);
            }
        }
        else {
            for (i = 0; i < binSize; i++) {
                binArray[i] = new Array(2);
                binArray[i][0] = i / times_image[0] + extent_image[0];
                var array = tif_data[i].slice().sort((a, b) => a - b);  // 升序排序，'.slice()'很重要！将变量重新拷贝一份，不然会修改原数组
                array = array.filter(number => number !== 0);
                if (array.length == 0) {
                    binArray[i][1] = null;
                    continue;
                }
                if (array.length % 2 == 0) {
                    binArray[i][1] = ((array[array.length / 2] + array[array.length / 2 - 1]) / 2).toFixed(2);
                }
                else if (array.length % 2 != 0) {
                    binArray[i][1] = (array[(array.length - 1) / 2]).toFixed(2);
                }
            }
        }
    }
    else {
        binSize = tif_data.length;
        if (statistic == '均值') {
            var sum = function (x, y) { return x + y; };  // 求和函数
            for (i = 0; i < binSize; i++) {
                binArray[i] = new Array(2);
                binArray[i][0] = -i / times_image[1] + extent_image[3];
                var array = tif_data[i].filter(number => number !== 0);
                if (array.length == 0) {
                    binArray[i][1] = null;
                    continue;
                }
                binArray[i][1] = (array.reduce(sum) / array.length).toFixed(2);
            }
        }
        else {
            for (i = 0; i < binSize; i++) {
                binArray[i] = new Array(2);
                binArray[i][0] = -i / times_image[1] + extent_image[3];
                var array = tif_data[i].slice().sort((a, b) => a - b);  // 升序排序，'.slice()'很重要！将变量重新拷贝一份，不然会修改原数组
                array = array.filter(number => number !== 0);
                if (array.length == 0) {
                    binArray[i][1] = null;
                    continue;
                }
                if (array.length % 2 == 0) {
                    binArray[i][1] = ((array[array.length / 2] + array[array.length / 2 - 1]) / 2).toFixed(2);
                }
                else if (array.length % 2 != 0) {
                    binArray[i][1] = (array[(array.length - 1) / 2]).toFixed(2);
                }
            }
        }
    }

    binArray = binArray.filter(row => !row.includes(null));

    // 2. 配置ECharts并生成直方图
    var myChart = echarts.init(document.getElementById('rightsiderbar_chart2'));
    var option = {
        title: {
            text: '',
            top: 15,
            textStyle: { fontSize: 17, color: '#FFF' }
        },
        grid: {
            left: 38,
            right: 15,
        },
        toolbox: {
            show: true,
            top: 18,
            left: 10,
            orient: 'horizontal',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                saveAsImage: { show: true }
            }
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'value',
            min: 'dataMin',
            max: 'dataMax',
            name: "",
            axisLine: {
                lineStyle: {
                    type: 'solid', // 线条的类型  
                    color: '#FFF', // 线条颜色  
                }
            },
            axisLabel: {
                color: "#FFF"
            },
            splitLine: {
                show: true, // 显示网格线  
                lineStyle: {
                    color: '#808080', // 网格线颜色
                    type: 'dashed', // 线条类型，'solid'为实线，其他如'dashed'为虚线
                    width: 1 // 线条宽度  
                    // 更多lineStyle的配置项...  
                }
            }
        },
        yAxis: {
            name: "",
            min: 'dataMin',
            max: 'dataMax',
            axisLine: {
                lineStyle: {
                    type: 'solid', // 线条的类型  
                    color: '#FFF', // 线条颜色  
                }
            },
            splitLine: {
                show: true, // 显示网格线  
                lineStyle: {
                    color: '#808080', // 网格线颜色  
                    type: 'dashed', // 线条类型，'solid'为实线，其他如'dashed'为虚线
                    width: 1 // 线条宽度  
                    // 更多lineStyle的配置项...  
                }
            }
        },
        series: [{
            name: '计数',
            type: 'line', // 图表类型为直方图  
            showSymbol: false,
            data: binArray, // Y轴数据
            color: '#4076B4',
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    {
                        type: 'average',
                        name: '平均值',
                        label: {
                            position: 'middle', // 或 'start', 'end', 或 '50%' 等  
                            color: '#F0F8FF',
                            formatter: '平均值: {c}'
                        }
                    }
                ]
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。  
    myChart.setOption(option);
}
function chart2_lon_lat_change(tif_data_num) {
    if (document.getElementById('chart2_lon_lat').innerHTML == '经度') {
        document.getElementById('chart2_lon_lat').innerHTML = '纬度';
    } else {
        document.getElementById('chart2_lon_lat').innerHTML = '经度';
    }

    rightsiderbar_chart2(tif_data_num);  // 更新图表
}
function chart2_statistic_change(tif_data_num) {
    if (document.getElementById('chart2_statistic').innerHTML == '均值') {
        document.getElementById('chart2_statistic').innerHTML = '中值';
    } else {
        document.getElementById('chart2_statistic').innerHTML = '均值';
    }

    rightsiderbar_chart2(tif_data_num);  // 更新图表
}

// 显示高亮
function rightsiderbar_highlight_ok(tif_data_num) {
    var min = document.getElementById('rightsiderbar_highlight_min').value;
    var max = document.getElementById('rightsiderbar_highlight_max').value;
    if (min == '' || max == '') {
        alert('请输入范围！');
        return false;
    }
    else if (min > max) {
        alert('输入最小值应小于等于输入最大值！');
        return false;
    }
    else if (min > parseFloat(document.getElementById('rightsiderbar_max').innerHTML) || max < parseFloat(document.getElementById('rightsiderbar_min').innerHTML)) {
        alert('输入范围应在数值范围以内！');
        return false;
    }
    map.removeLayer(highlight_tif_layer);
    highlight_tif_show(min, max, tif_data_num);
}
function rightsiderbar_highlight_no() {
    map.removeLayer(highlight_tif_layer);
}
var highlight_tif_layer;
function highlight_tif_show(min, max, tif_data_num) {
    var tif_value = OverLayers_tif_data[tif_data_num][0];
    var extent_image = [-180.0, -90.0, 180.0, 90.0];
    if (tif_value == 'IIM_global_mosaic_20140326_new_geo_10X10_geo_cont_IBD_2b') {
        extent_image = [-180.1696, -78.2609, 181.0804, 79.2391];
    } else if (tif_value == 'WAC_TIO2_GCS_MB_NAN_HD') {
        extent_image = [-180, -70.2434, 180, 64.7566];
    }


    var imageUrl = tif_min_max(min, max, tif_data_num, extent_image);

    var extent;
    if (po_now == 'ESRI:104903') {
        //extent = [-180, -90, 180, 90];
        extent = extent_image;
    } else if (po_now == 'ESRI:103877') {
        extent = [-931070, -931070, 931070, 931070];
    } else if (po_now == 'ESRI:103878') {
        extent = [-931070, -931070, 931070, 931070];
    } else if (po_now == 'ESRI:103880') {
        extent = [-1737400, -1737400, 1737400, 1737400];
    } else if (po_now == 'ESRI:103879') {
        extent = [-1737400, -1737400, 1737400, 1737400];
    }

    highlight_tif_layer = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: imageUrl,
            projection: po_now,
            imageExtent: extent
        }),
        opacity: 0.75
    });

    map.addLayer(highlight_tif_layer);
}
function tif_min_max(min, max, tif_data_num, extent_image) {
    var imageUrl;
    var array = OverLayers_tif_data[tif_data_num][1];
    var times_image = [array[0].length / (extent_image[2] - extent_image[0]), array.length / (extent_image[3] - extent_image[1])];

    if (po_now == 'ESRI:104903') {
        var width = array[0].length;
        var height = array.length;

        // 创建一个 Canvas 元素  
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                //var pixel_color = color_scale(array[pixelY][pixelX] / 255.0).rgb();  // 颜色对应
                if (array[pixelY][pixelX] >= min && array[pixelY][pixelX] <= max) {
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 255;
                    outputData[outputIndex + 2] = 255;
                    outputData[outputIndex + 3] = 255;
                } else {
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');

    }
    else if (po_now == 'ESRI:103877') {
        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        var times = 30;
        var width = 60 * times;
        var height = 60 * times;
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                // 图中像素坐标
                var x_origin = pixelX / times * 1.0 - 30;
                var y_origin = -pixelY / times * 1.0 + 30;

                // 真实经纬度坐标
                var x;
                var y = 90 - Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2));
                // 计算真实经纬度
                if (x_origin == 0) {
                    if (y_origin >= 0) {
                        x = -180;
                    } else {
                        x = 0;
                    }
                } else if (x_origin > 0) {
                    x = Math.atan(y_origin / x_origin) / Math.PI * 180 + 90;
                } else {
                    x = Math.atan(y_origin / x_origin) / Math.PI * 180 - 90;
                }

                // 对应数据坐标
                var x_image = Math.round((x - extent_image[0]) * times_image[0]);
                var y_image = Math.round((extent_image[3] - y) * times_image[1]);
                if (x >= 179 && x_image == array[0].length) {
                    x_image = Math.round((x - extent_image[0] - 360) * times_image[0]);
                }

                if (y < 60 || x_image < 0 || x_image >= array[0].length || y_image >= array.length || y_image < 0) {
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                } else {
                    if (array[y_image][x_image] >= min && array[y_image][x_image] <= max) {
                        outputData[outputIndex] = 0;
                        outputData[outputIndex + 1] = 255;
                        outputData[outputIndex + 2] = 255;
                        outputData[outputIndex + 3] = 255;
                    } else {
                        outputData[outputIndex] = 0;
                        outputData[outputIndex + 1] = 0;
                        outputData[outputIndex + 2] = 0;
                        outputData[outputIndex + 3] = 0;
                    }
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');

    }
    else if (po_now == 'ESRI:103878') {
        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        var times = 30;
        var width = 60 * times;
        var height = 60 * times;
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                // 图中像素坐标
                var x_origin = pixelX / times * 1.0 - 30;
                var y_origin = -pixelY / times * 1.0 + 30;

                // 真实经纬度坐标
                var x;
                var y = 90 - Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2));
                // 计算真实经纬度
                if (x_origin == 0) {
                    if (y_origin >= 0) {
                        x = 0;
                    } else {
                        x = -180;
                    }
                } else if (x_origin > 0) {
                    x = -Math.atan(y_origin / x_origin) / Math.PI * 180 + 90;
                } else {
                    x = -Math.atan(y_origin / x_origin) / Math.PI * 180 - 90;
                }

                // 对应数据坐标
                var x_image = Math.round((x - extent_image[0]) * times_image[0]);
                var y_image = Math.round((extent_image[3] - y) * times_image[1]);
                if (x >= 179 && x_image == array[0].length) {
                    x_image = Math.round((x - extent_image[0] - 360) * times_image[0]);
                }

                if (y < 60 || x_image < 0 || x_image >= array[0].length || y_image >= array.length || y_image < 0) {
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                } else {
                    if (array[y_image][x_image] >= min && array[y_image][x_image] <= max) {
                        outputData[outputIndex] = 0;
                        outputData[outputIndex + 1] = 255;
                        outputData[outputIndex + 2] = 255;
                        outputData[outputIndex + 3] = 255;
                    } else {
                        outputData[outputIndex] = 0;
                        outputData[outputIndex + 1] = 0;
                        outputData[outputIndex + 2] = 0;
                        outputData[outputIndex + 3] = 0;
                    }
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');
    }
    else if (po_now == 'ESRI:103880') {
        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        var times = 10;
        var width = 180 * times;
        var height = 180 * times;
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                // 图中像素坐标
                var x_origin = (pixelX / times * 1.0 - 90) / 90;
                var y_origin = (-pixelY / times * 1.0 + 90) / 90;

                // 真实经纬度坐标
                var x;
                var y = Math.asin(y_origin) / Math.PI * 180;
                // 计算真实经纬度
                if (x_origin == 0) {
                    x = 0;
                } else {
                    x = Math.asin(x_origin / Math.cos(y * Math.PI / 180)) / Math.PI * 180;
                }

                // 对应数据坐标
                var x_image = Math.round((x - extent_image[0]) * times_image[0]);
                var y_image = Math.round((extent_image[3] - y) * times_image[1]);
                if (x >= 179 && x_image == array[0].length) {
                    x_image = Math.round((x - extent_image[0] - 360) * times_image[0]);
                }

                if (Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2)) > 1 || x_image < 0 || x_image >= array[0].length || y_image >= array.length || y_image < 0) {  //因为涉及到四舍五入的问题所以不能像上面一行这么写
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                } else {
                    if (array[y_image][x_image] >= min && array[y_image][x_image] <= max) {
                        outputData[outputIndex] = 0;
                        outputData[outputIndex + 1] = 255;
                        outputData[outputIndex + 2] = 255;
                        outputData[outputIndex + 3] = 255;
                    } else {
                        outputData[outputIndex] = 0;
                        outputData[outputIndex + 1] = 0;
                        outputData[outputIndex + 2] = 0;
                        outputData[outputIndex + 3] = 0;
                    }
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');
    }
    else if (po_now == 'ESRI:103879') {
        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        var times = 10;
        var width = 180 * times;
        var height = 180 * times;
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                // 图中像素坐标
                var x_origin = (pixelX / times * 1.0 - 90) / 90;
                var y_origin = (-pixelY / times * 1.0 + 90) / 90;

                // 真实经纬度坐标
                var x;
                var y = Math.asin(y_origin) / Math.PI * 180;
                // 计算真实经纬度
                if (x_origin == 0) {
                    x = -180;
                } else if (x_origin > 0) {
                    x = 180 - Math.asin(x_origin / Math.cos(y * Math.PI / 180)) / Math.PI * 180;
                } else {
                    x = -180 - Math.asin(x_origin / Math.cos(y * Math.PI / 180)) / Math.PI * 180;
                }

                // 对应数据坐标
                var x_image = Math.round((x - extent_image[0]) * times_image[0]);
                var y_image = Math.round((extent_image[3] - y) * times_image[1]);
                if (x >= 179 && x_image == array[0].length) {
                    x_image = Math.round((x - extent_image[0] - 360) * times_image[0]);
                }

                if (Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2)) > 1 || x_image < 0 || x_image >= array[0].length || y_image >= array.length || y_image < 0) {
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                } else {
                    if (array[y_image][x_image] >= min && array[y_image][x_image] <= max) {
                        outputData[outputIndex] = 0;
                        outputData[outputIndex + 1] = 255;
                        outputData[outputIndex + 2] = 255;
                        outputData[outputIndex + 3] = 255;
                    } else {
                        outputData[outputIndex] = 0;
                        outputData[outputIndex + 1] = 0;
                        outputData[outputIndex + 2] = 0;
                        outputData[outputIndex + 3] = 0;
                    }
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');
    }

    return imageUrl;
}

// 播放动画
var animate_layer;
var currentIndex = 0;
var slideInterval;
function rightsiderbar_animate_ok(tif_data_num) {
    if (document.getElementById('rightsiderbar_animate_ok').innerHTML == '播放') {
        document.getElementById('rightsiderbar_animate_ok').innerHTML = '暂停';
        document.getElementById('rightsiderbar_animate_progress').style.display = '';
        document.getElementById('rightsiderbar_animate_text').style.display = '';

        var step = document.getElementById('rightsiderbar_animate_step').value;
        var time = document.getElementById('rightsiderbar_animate_time').value;

        var minVal = document.getElementById('rightsiderbar_min').innerHTML;
        var maxVal = document.getElementById('rightsiderbar_max').innerHTML;

        if (step >= (maxVal - minVal)) {
            alert('输入步长过长！');
            return false;
        } else if (step <= 0){
            alert('步长必须大于0！');
            return false;
        } else if (time < 0.02) {
            alert('时间必须不少于0.02s！');
            return false;
        }

        var times = Math.pow(10, Math.floor(Math.log10(maxVal - minVal)) + 2);
        var minLabel = Math.floor(minVal * times) / times;
        var maxLabel = Math.ceil(maxVal * times) / times;
        var tif_value = OverLayers_tif_data[tif_data_num][0];
        var extent_image = [-180.0, -90.0, 180.0, 90.0];
        if (tif_value == 'IIM_global_mosaic_20140326_new_geo_10X10_geo_cont_IBD_2b') {
            extent_image = [-180.1696, -78.2609, 181.0804, 79.2391];
        } else if (tif_value == 'WAC_TIO2_GCS_MB_NAN_HD') {
            extent_image = [-180, -70.2434, 180, 64.7566];
        }

        // 生成图片集
        var image_num = Math.ceil((maxLabel - minLabel) / step * 1.0);
        var image_urls = new Array(image_num);
        for (i = 0; i < image_num; i++) {
            image_urls[i] = tif_min_max(minLabel + i * step, minLabel + (i + 1) * step, tif_data_num, extent_image);
        }


        //播放动画
        var extent;
        if (po_now == 'ESRI:104903') {
            extent = extent_image;
        } else if (po_now == 'ESRI:103877') {
            extent = [-931070, -931070, 931070, 931070];
        } else if (po_now == 'ESRI:103878') {
            extent = [-931070, -931070, 931070, 931070];
        } else if (po_now == 'ESRI:103880') {
            extent = [-1737400, -1737400, 1737400, 1737400];
        } else if (po_now == 'ESRI:103879') {
            extent = [-1737400, -1737400, 1737400, 1737400];
        }

        //currentIndex = 0;
        slideInterval = null;
        map.removeLayer(animate_layer);
        // 创建一个初始的图层和源  
        animate_layer = new ol.layer.Image({
            source: new ol.source.ImageStatic({
                url: image_urls[currentIndex],
                projection: po_now,
                imageExtent: extent
            }),
            opacity: 0.75
        });
        map.addLayer(animate_layer);
        document.getElementById('rightsiderbar_animate_progress').value = (currentIndex / image_urls.length) * 100;
        document.getElementById('rightsiderbar_animate_text').innerHTML = '播放至：' + (minLabel + currentIndex * step).toFixed(2) + '-' + (minLabel + (currentIndex + 1) * step).toFixed(2);
        // 定义一个函数来更改图层显示的图片和extent  
        function changeImageLayer() {
            if (currentIndex >= image_urls.length) {
                currentIndex = 0; // 循环播放  
            }
            // 更新图片
            var newSource = new ol.source.ImageStatic({
                url: image_urls[currentIndex],
                projection: po_now,
                imageExtent: extent
            });
            animate_layer.setSource(newSource);
            document.getElementById('rightsiderbar_animate_progress').value = (currentIndex / image_urls.length) * 100;
            document.getElementById('rightsiderbar_animate_text').innerHTML = '播放至：' + (minLabel + currentIndex * step).toFixed(2) + '-' + (minLabel + (currentIndex + 1) * step).toFixed(2);
            currentIndex++; // 移动到下一张图片
            /*if (currentIndex == image_num) {
                map.removeLayer(animate_layer);
                clearInterval(slideInterval); // 清除定时器，停止播放
            }*/
        }
        // 开始播放图片
        slideInterval = setInterval(() => {
            changeImageLayer();
        }, time * 1000);

        document.getElementById('rightsiderbar_animate_progress').addEventListener('input', function (e) {
            const newIndex = Math.floor((e.target.value / 100) * image_urls.length);
            currentIndex = newIndex;
            var newSource = new ol.source.ImageStatic({
                url: image_urls[currentIndex],
                projection: po_now,
                imageExtent: extent
            });
            animate_layer.setSource(newSource);
            document.getElementById('rightsiderbar_animate_text').innerHTML = '播放至：' + (minLabel + currentIndex * step).toFixed(2) + '-' + (minLabel + (currentIndex + 1) * step).toFixed(2);
            if (slideInterval) {
                clearInterval(slideInterval); // 暂停当前播放
                // 这里可以根据需要决定是否重新播放  
            }
        });
    }
    else {
        document.getElementById('rightsiderbar_animate_ok').innerHTML = '播放';
        clearInterval(slideInterval);
    }
}
function rightsiderbar_animate_no() {
    currentIndex = 0;
    map.removeLayer(animate_layer);
    document.getElementById('rightsiderbar_animate_progress').style.display = 'none';
    document.getElementById('rightsiderbar_animate_text').style.display = 'none';
}
/*** 栅格详细信息 END ***/